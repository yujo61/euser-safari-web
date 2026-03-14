import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypebotWidget from "@/components/TypebotWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Euser Safaris | Premium Kenyan Wildlife Experiences",
  description: "Discover the magic of East Africa with Euser Safaris. 10 curated packages from Amboseli to the Maasai Mara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <Footer />
        <TypebotWidget />
      </body>
    </html>
  );
}
