import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <h3 className="mb-6 text-xl font-bold tracking-tighter">EUSER SAFARIS</h3>
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
              Preserving the wonders of African wildlife through sustainable, luxury 
              expeditions. Join us in our mission to explore and protect the wild.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-widest text-accent uppercase">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-zinc-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="#packages" className="hover:text-white">Safari Packages</Link></li>
              <li><Link href="#about" className="hover:text-white">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-widest text-accent uppercase">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-zinc-400">
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-8 text-xs font-light text-zinc-500 md:flex-row">
          <p>© 2024 Euser Safaris. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <span className="hover:text-accent cursor-pointer">Instagram</span>
            <span className="hover:text-accent cursor-pointer">Facebook</span>
            <span className="hover:text-accent cursor-pointer">X (Twitter)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
