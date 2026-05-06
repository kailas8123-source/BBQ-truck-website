import { useEffect, useRef, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 80;
      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(182,255,112,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md">
          <span className="font-display font-bold text-lg text-lime-dark">C</span>
        </div>
        <span className="font-display font-bold text-xl text-[#111]">Creamella</span>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <div className="glass-pill px-5 py-2.5 flex items-center gap-6">
          {['Process', 'Products', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-label text-xs uppercase tracking-widest text-[#2B2B2B] hover:text-[#111] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="glass-pill px-5 py-2.5 flex items-center gap-2 bg-sky-accent/80 hover:bg-sky-accent transition-all hover:-translate-y-0.5">
          <ShoppingBag size={16} />
          <span className="font-label text-xs uppercase tracking-widest">Shop</span>
        </button>
      </div>
    </nav>
  );
}
