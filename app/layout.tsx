import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mercedes-Benz Novi Pazar — Inženjerska perfekcija",
  description:
    "Salon Mercedes-Benz Novi Pazar. Sedamdeset godina preciznosti — vozila koja redefinišu odnos između čoveka i mašine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}
