import Button from "@/components/Button";
import PackageCard from "@/components/PackageCard";
import HeroActions from "@/components/HeroActions";
import { safariPackages } from "@/data/packages";

export default function Home() {
  const safaris = safariPackages.filter(p => p.category === 'safari');
  const beaches = safariPackages.filter(p => p.category === 'beach');
  const internationals = safariPackages.filter(p => p.category === 'international');

  const faqs = [
    { q: "How do I book a package with Euser Safaris?", a: "Booking is easy. You can message us on WhatsApp (+254 720 123 456), email hello@euserasafaris.com, or use our website. Our AI travel consultant Claire responds instantly on WhatsApp!" },
    { q: "What payment methods do you accept?", a: "We accept M-Pesa (Paybill: 247247), Bank Transfers (Equity Bank), Credit/Debit Cards, and Cash at our Nairobi offices. We also offer flexible installment plans." },
    { q: "Are national park entry fees included?", a: "For most domestic safari packages, park entry fees are NOT included and depend on your nationality (e.g., USD 100/day for Maasai Mara non-residents). Always carry your ID or Passport." },
    { q: "Are your packages suitable for families with children?", a: "Yes! Many of our packages are perfect for families. Infants under 2 are typically free, and children aged 3-11 usually receive 50% off the adult rate when sharing." },
    { q: "Do I need a visa for Dubai or Thailand?", a: "Yes, Kenyan citizens require tourist visas for both Dubai and Thailand. Euser Safaris assists with the full application process." },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-12 text-center md:px-12">
        <div className="absolute inset-0 z-0 bg-[url('/images/hero-safari.png')] bg-cover bg-center opacity-40 grayscale transition-opacity duration-1000 hover:opacity-60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-block text-sm font-light tracking-[0.3em] text-accent uppercase animate-fade-in text-shadow-sm">
            Beyond the Horizon
          </span>
          <h1 className="mb-6 text-6xl font-semibold leading-tight tracking-tight text-white md:text-8xl lg:text-9xl">
            Euser <span className="italic text-accent">Safaris</span>
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-lg font-light leading-relaxed text-zinc-300 md:text-xl">
            Crafting exceptional, personalised safari and travel experiences that connect you with the natural beauty and adventure of Africa.
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
                Founded in 2015 by a passionate team of safari experts, Euser Safaris was born from 
                a deep-rooted passion for Kenya's untouched wilderness. We have proudly served over 3,500 happy clients.
              </p>
              <p className="mb-8 text-lg font-light leading-relaxed text-zinc-400">
                We maintain a 4.8/5 average rating and were awarded Best Emerging Safari Company in 2023. 
                From heart-pounding wildlife encounters in the Masai Mara to sun-soaked beach holidays, we guarantee the trip of a lifetime.
              </p>
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                <div>
                  <span className="block text-3xl font-bold text-white">3,500+</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Happy Clients</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-white">4.8/5</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Average Rating</span>
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

      {/* Safari Experiences */}
      <section id="packages" className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">The Wild Call</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">Curated <span className="italic">Safaris</span></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {safaris.map((safari) => (
              <PackageCard key={safari.id} safari={safari} />
            ))}
          </div>
        </div>
      </section>

      {/* Beach Experiences */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 text-right">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">Coastal Serenity</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">Beach <span className="italic">Escapes</span></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {beaches.map((safari) => (
              <PackageCard key={safari.id} safari={safari} />
            ))}
          </div>
        </div>
      </section>

      {/* International Experiences */}
      <section className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">Global Reach</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">International <span className="italic">Destinations</span></h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {internationals.map((safari) => (
              <PackageCard key={safari.id} safari={safari} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">Frequently Asked <span className="italic">Questions</span></h2>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10 pb-8">
                <h3 className="mb-4 text-xl font-medium text-white">{faq.q}</h3>
                <p className="font-light leading-relaxed text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
