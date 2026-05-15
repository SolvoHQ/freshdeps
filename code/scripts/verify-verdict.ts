import { getVerdict } from "../lib/verdict";

async function main() {
  const cases: [Parameters<typeof getVerdict>[0], string][] = [
    ["npm", "react"],
    ["npm", "request"],
    ["npm", "this-pkg-does-not-exist-zzz999"],
    ["pypi", "numpy"],
  ];
  for (const [eco, pkg] of cases) {
    const v = await getVerdict(eco, pkg);
    console.log(`\n=== ${eco}:${pkg} ===`);
    console.log(JSON.stringify(v, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
