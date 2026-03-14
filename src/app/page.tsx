import Button from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import HeroActions from "@/components/HeroActions";
import { safariPackages } from "@/data/packages";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-12 text-center md:px-12">
        <div className="absolute inset-0 z-0 bg-[url('/images/hero-safari.png')] bg-cover bg-center opacity-40 grayscale transition-opacity duration-1000 hover:opacity-60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-accent uppercase animate-fade-in text-shadow-sm">
            Established 2024
          </span>
          <h1 className="mb-6 text-6xl font-semibold leading-tight tracking-tight text-white md:text-8xl lg:text-9xl">
            Euser <span className="italic text-accent">Safaris</span>
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-lg font-light leading-relaxed text-zinc-300 md:text-xl">
            Handcrafted wildlife experiences across Kenya's most iconic landscapes. 
            Join us for a journey beyond the ordinary.
          </p>
          <HeroActions />
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">The Euser Legacy</span>
              <h2 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Redefining the <span className="italic">African Expedition</span>
              </h2>
              <p className="mb-6 text-lg font-light leading-relaxed text-zinc-400">
                Founded on the silver plains of the Maasai Mara, Euser Safaris was born from 
                a deep-rooted passion for Kenya's untouched wilderness and its majestic inhabitants.
              </p>
              <p className="mb-8 text-lg font-light leading-relaxed text-zinc-400">
                We don't just offer tours; we curate life-changing encounters. Our guides carry 
                generations of knowledge, ensuring every rustle in the grass tells a story and 
                every sunset becomes a permanent memory.
              </p>
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                <div>
                  <span className="block text-3xl font-bold text-white">100%</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Local Experts</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-white">10+</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Curated Routes</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl grayscale transition-all hover:grayscale-0">
              <img 
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80" 
                alt="Safari Guide" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Grid */}
      <section id="packages" className="py-24 md:py-32 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase underline decoration-accent/30 underline-offset-8">Curated Experiences</span>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Choose Your <span className="italic">Frontier</span></h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {safariPackages.map((safari) => (
              <PackageCard key={safari.id} safari={safari} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
