import "./globals.css";
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Kebek Ventures | Advisory for scale, clarity, and repeatable growth",
  description:
    "Kebek Ventures is an advisory platform led by Steve Carlin, helping leadership teams bring structure, clarity, and execution discipline to moments of scale and inflection.",
  metadataBase: new URL("https://kebekventures.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-fog text-ink">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
