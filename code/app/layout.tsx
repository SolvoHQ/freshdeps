import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshdeps.vercel.app"),
  title: "freshdeps — live npm & PyPI dependency health",
  description:
    "AI coding agents recommend stale, abandoned, or vulnerable packages because their training is months old. freshdeps gives the live answer: alive or abandoned, latest version, CVEs, what to use instead.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gc = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;
  return (
    <html lang="en" className={mono.variable}>
      <body>
        {children}
        {gc ? (
          <Script
            data-goatcounter={`https://${gc}.goatcounter.com/count`}
            src="//gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
