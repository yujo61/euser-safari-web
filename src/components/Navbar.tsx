"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/80 py-4 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            EUSER <span className="text-accent transition-colors group-hover:text-white">SAFARIS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-white/70 transition-colors hover:text-accent">Home</Link>
          <Link href="#packages" className="text-sm font-medium text-white/70 transition-colors hover:text-accent">Packages</Link>
          <Link href="#about" className="text-sm font-medium text-white/70 transition-colors hover:text-accent">Our Story</Link>
          <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-accent hover:text-white">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Icon (Placeholder for functionality) */}
        <button className="md:hidden">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
