import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
// @ts-expect-error Next.js handles global CSS imports at build time.
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Calculatea Your CGPA — GPA / CGPA Calculator",
  description:
    "Calculate your SGPA and CGPA on a 4.00 grade point scale. Choose your year and semester, enter your grades and get instant results.",
  keywords: [
    "CGPA calculator",
    "GPA calculator",
    "SGPA calculator",
    "grade point calculator",
    "Calculatea Your CGPA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col bg-white">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
