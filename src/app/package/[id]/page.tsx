import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { safariPackages } from "@/data/packages";
import Button from "@/components/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return safariPackages.map((pkg) => ({
    id: pkg.id,
  }));
}

export default async function PackagePage({ params }: PageProps) {
  const { id } = await params;
  const safari = safariPackages.find((p) => p.id === id);

  if (!safari) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      {/* Detail Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={safari.image}
          alt={safari.name}
          fill
          className="object-cover transition-transform duration-1000 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-12 left-0 w-full px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase hover:text-white transition-colors">
              <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Back to Collection
            </Link>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {safari.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-light text-zinc-300">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {safari.duration}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {safari.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-16 border-b border-white/10 pb-16">
              <h2 className="mb-6 text-2xl font-semibold text-white">The Experience</h2>
              <p className="text-lg leading-relaxed text-zinc-400">
                {safari.longDescription}
              </p>
            </section>

            <section className="mb-16 border-b border-white/10 pb-16">
              <h2 className="mb-8 text-2xl font-semibold text-white">Daily Itinerary</h2>
              <div className="space-y-12">
                {safari.itinerary.map((item) => (
                  <div key={item.day} className="relative pl-12">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent text-xs font-bold text-accent">
                      {item.day}
                    </div>
                    <div className="absolute left-4 top-8 h-full w-[1px] bg-gradient-to-b from-accent/50 to-transparent" />
                    <h3 className="mb-3 text-xl font-medium text-white">{item.title}</h3>
                    <p className="font-light leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-semibold text-white">Highlights</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {safari.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-light text-zinc-300">
                    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-md">
              <div className="mb-8 border-b border-white/10 pb-8">
                <span className="block text-xs font-semibold tracking-widest text-accent uppercase mb-2">Exclusive Offer</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">${safari.price}</span>
                  <span className="text-sm font-light text-zinc-400">per person sharing</span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-light text-zinc-400 text-sm">Duration</span>
                  <span className="font-medium text-white">{safari.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-light text-zinc-400 text-sm">Availability</span>
                  <span className="font-medium text-green-500">Instant Booking</span>
                </div>
              </div>

              <Button className="w-full mb-4">Request Booking</Button>
              <p className="text-center text-[10px] font-light text-zinc-500 italic">
                No deposit required to start planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
