import type { Metadata } from "next";
import { Bai_Jamjuree, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import SiteEffects from "./components/SiteEffects";

/* Display / editorial — Bai Jamjuree. Not a variable face on Google Fonts,
   so the weights the design actually uses are requested explicitly, both
   styles (the italic accent is Bai Jamjuree Italic). */
const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bai-jamjuree",
  display: "swap",
});

/* Body / UI — Manrope (variable). */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/* Mono — JetBrains Mono (variable), used for ticker pills + rule labels. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partnermax.ca"),
  title: {
    default:
      "PartnerMax — The licensed channel for Rogers business products in Canada",
    template: "%s — PartnerMax",
  },
  description:
    "PartnerMax is the licensed channel partner for Rogers business products in Canada. Wireless, fibre, plans and bundles — provisioned and billed under one roof.",
  openGraph: {
    type: "website",
    siteName: "PartnerMax",
    locale: "en_CA",
    title:
      "PartnerMax — The licensed channel for Rogers business products in Canada",
    description:
      "Wireless, fibre, plans and bundles for Canadian business — provisioned and billed under one roof.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baiJamjuree.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="site">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteNav />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <SiteEffects />
      </body>
    </html>
  );
}
