"use client";

import Image from "next/image";
import Link from "next/link";
import { SafariPackage } from "@/data/packages";

interface PackageCardProps {
  safari: SafariPackage;
}

export default function PackageCard({ safari }: PackageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 border border-white/10">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={safari.image}
          alt={safari.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          quality={90}
          priority={safari.id === "mara-majesty"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium tracking-widest text-accent uppercase backdrop-blur-md">
            {safari.duration}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white tracking-tight">{safari.name}</h3>
          <span className="text-lg font-bold text-accent">${safari.price}</span>
        </div>
        
        <p className="mb-6 line-clamp-2 text-sm font-light leading-relaxed text-zinc-400">
          {safari.description}
        </p>

        <Link 
          href={`/package/${safari.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:text-accent"
        >
          View Itinerary
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
