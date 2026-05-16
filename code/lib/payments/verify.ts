/**
 * Generic, read-only on-chain payment verification.
 *
 * This module is wedge-agnostic: it knows nothing about any specific product.
 * It answers one question: "has at least `minAmount` of `token` (or native
 * coin) landed at `payTo` on `chain`?" by reading public RPC state.
 *
 * SECURITY: this module is strictly read-only. It never imports, reads, or
 * uses a private key. The collection wallet's private key
 * (SOLVO_PAYOUT_WALLET_PRIVKEY) must NEVER reach this code path or any
 * client-reachable surface.
 *
 * KNOWN LIMITATION (intentional): verification is balance-based. It proves
 * funds are AT the address; it cannot attribute a payment to a specific
 * payer or invoice. Suitable for one-off / tip / single-tenant collection.
 * Multi-invoice attribution requires HD-derived per-invoice addresses or a
 * hosted-invoice provider (see README "Payments" section).
 */

import { JsonRpcProvider, Contract, formatUnits, getAddress } from "ethers";

/** Minimal ERC-20 read surface. */
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export interface ChainConfig {
  /** Official public JSON-RPC endpoint. */
  rpcUrl: string;
  /** Native coin decimals (always 18 for EVM chains here). */
  nativeDecimals: number;
  /** Known token shortcuts, keyed by lowercase symbol. */
  tokens: Record<string, { address: string; decimals: number }>;
}

/**
 * Documented sane defaults. RPC endpoints are the chains' official public
 * gateways; token addresses are the canonical USDC contracts.
 */
export const CHAINS: Record<string, ChainConfig> = {
  base: {
    rpcUrl: "https://mainnet.base.org",
    nativeDecimals: 18,
    tokens: {
      // Canonical Circle USDC on Base mainnet.
      usdc: { address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", decimals: 6 },
    },
  },
  ethereum: {
    rpcUrl: "https://eth.llamarpc.com",
    nativeDecimals: 18,
    tokens: {
      // Canonical Circle USDC on Ethereum mainnet.
      usdc: { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
    },
  },
  "base-sepolia": {
    rpcUrl: "https://sepolia.base.org",
    nativeDecimals: 18,
    tokens: {
      // Circle USDC on Base Sepolia testnet.
      usdc: { address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", decimals: 6 },
    },
  },
  sepolia: {
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    nativeDecimals: 18,
    tokens: {},
  },
};

export interface VerifyPaymentArgs {
  /** Chain key (see CHAINS) or any key whose rpcUrl you pass explicitly. */
  chain: string;
  /** Address that should have received funds. */
  payTo: string;
  /**
   * ERC-20 contract address, OR a known token shortcut (e.g. "usdc"), OR
   * omitted to check the chain's NATIVE coin balance instead.
   */
  tokenAddress?: string;
  /**
   * Minimum amount (human units, e.g. "1.5") that must be present for
   * `paid` to be true. Defaults to "0" (any non-zero balance => paid).
   */
  minAmount?: string | number;
  /** Override the chain's default RPC endpoint. */
  rpcUrl?: string;
}

export interface VerifyPaymentResult {
  paid: boolean;
  /** Human-readable balance (decimal string). */
  balance: string;
  /** Checksummed address that was queried. */
  address: string;
  /** Chain key used. */
  chain: string;
  /** "native" or the resolved token contract address. */
  token: string;
}

function parseDecimal(value: string, decimals: number): bigint {
  const s = String(value).trim();
  if (!/^\d+(\.\d+)?$/.test(s)) {
    throw new Error(`invalid amount: ${value}`);
  }
  const [whole, frac = ""] = s.split(".");
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(whole + fracPadded);
}

/**
 * Read-only check of whether `payTo` holds >= `minAmount` of the asset.
 * Never mutates chain state, never touches a private key.
 */
export async function verifyPayment(
  args: VerifyPaymentArgs,
): Promise<VerifyPaymentResult> {
  const { chain, payTo, minAmount = "0" } = args;

  const cfg = CHAINS[chain];
  const rpcUrl = args.rpcUrl ?? cfg?.rpcUrl;
  if (!rpcUrl) {
    throw new Error(
      `unknown chain "${chain}" and no rpcUrl override provided`,
    );
  }

  const address = getAddress(payTo);
  const provider = new JsonRpcProvider(rpcUrl);

  // Resolve the token argument: known shortcut -> raw address -> native.
  let tokenArg = args.tokenAddress;
  let decimals: number;
  let tokenLabel: string;

  if (tokenArg && cfg?.tokens?.[tokenArg.toLowerCase()]) {
    const known = cfg.tokens[tokenArg.toLowerCase()];
    tokenArg = known.address;
    decimals = known.decimals;
    tokenLabel = known.address;
  } else if (tokenArg && tokenArg.startsWith("0x") && tokenArg.length === 42) {
    // Raw ERC-20 address: read decimals on-chain.
    const erc20 = new Contract(getAddress(tokenArg), ERC20_ABI, provider);
    decimals = Number(await erc20.decimals());
    tokenLabel = getAddress(tokenArg);
  } else if (tokenArg) {
    throw new Error(
      `token "${tokenArg}" is neither a known shortcut on chain "${chain}" nor a 0x address`,
    );
  } else {
    // Native coin.
    decimals = cfg?.nativeDecimals ?? 18;
    tokenLabel = "native";
  }

  let rawBalance: bigint;
  if (tokenLabel === "native") {
    rawBalance = await provider.getBalance(address);
  } else {
    const erc20 = new Contract(tokenLabel, ERC20_ABI, provider);
    rawBalance = await erc20.balanceOf(address);
  }

  const minRaw = parseDecimal(String(minAmount), decimals);

  return {
    paid: rawBalance >= minRaw && rawBalance > 0n,
    balance: formatUnits(rawBalance, decimals),
    address,
    chain,
    token: tokenLabel,
  };
}
