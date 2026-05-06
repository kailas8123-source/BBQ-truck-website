import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ShoppingCart, Users, Mail, ArrowRight } from 'lucide-react';
import Mascot from '../components/Mascot';

gsap.registerPlugin(ScrollTrigger);

export default function Section9Final() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    const mascot = mascotRef.current;
    const micro = microRef.current;
    if (!section || !overlay || !panel || !grid || !cta || !mascot || !micro) return;

    const words = panel.querySelectorAll('.word');
    const gridItems = grid.querySelectorAll('.grid-item');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(overlay, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
        .fromTo(panel, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(words, { y: 36, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08)
        .fromTo(gridItems, { y: '18vh', scale: 0.86, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.03, ease: 'none' }, 0.12)
        .fromTo(cta, { y: '10vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.18)
        .fromTo(mascot, { x: '12vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.2);

      // SETTLE (30-70%): static

      // EXIT (70-100%): gentle, keep visible
      scrollTl
        .fromTo(panel, { opacity: 1 }, { opacity: 0.85, ease: 'none' }, 0.7)
        .fromTo(grid, { opacity: 1 }, { opacity: 0.85, ease: 'none' }, 0.7)
        .fromTo(cta, { y: 0, opacity: 1 }, { y: '2vh', opacity: 0.9, ease: 'none' }, 0.7)
        .fromTo(mascot, { opacity: 1 }, { opacity: 0.85, ease: 'none' }, 0.7)
        .fromTo(micro, { opacity: 1 }, { opacity: 0.8, ease: 'none' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const gridItems = [
    { icon: <MapPin size={20} />, label: 'Store Locator' },
    { icon: <ShoppingCart size={20} />, label: 'Online Order' },
    { icon: <Users size={20} />, label: 'Catering' },
    { icon: <Mail size={20} />, label: 'Contact Us' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ zIndex: 90 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/final_cone_bg.jpg" alt="Enjoying ice cream cone" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime/40 via-lime/20 to-transparent" />
      </div>

      {/* Mint overlay for background transition */}
      <div ref={overlayRef} className="absolute inset-0 bg-mint/60 pointer-events-none" />

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel p-8"
        style={{ left: '6vw', top: '22vh', width: '42vw', height: '56vh', maxWidth: '560px' }}
      >
        <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight">Ready To</span>
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight mt-1">Scoop?</span>
        </h2>
        <p className="word mt-8 font-body text-[clamp(13px,1.1vw,16px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
          Find a store near you or order online—your next favorite flavor is waiting.
        </p>
      </div>

      {/* Right 2x2 Grid */}
      <div
        ref={gridRef}
        className="absolute grid grid-cols-2 gap-4"
        style={{ left: '62vw', top: '22vh', width: '28vw', maxWidth: '360px' }}
      >
        {gridItems.map((item, i) => (
          <div key={i} className="grid-item glass-panel aspect-square flex flex-col items-center justify-center gap-3 p-4 cursor-pointer hover:bg-white/85 transition-colors">
            <span className="text-lime-dark">{item.icon}</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B] text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div ref={ctaRef} className="absolute left-1/2 bottom-[14vh] -translate-x-1/2">
        <button className="glass-pill px-8 py-4 flex items-center gap-3 bg-sky-accent/90 hover:bg-sky-accent transition-all hover:-translate-y-0.5 hover:shadow-xl">
          <span className="font-label text-sm uppercase tracking-wider">Order now</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Mascot */}
      <div ref={mascotRef} className="absolute" style={{ right: '6vw', bottom: '8vh', height: '18vh' }}>
        <Mascot className="h-full w-auto" bubbleText="Thanks for stopping by!" bubblePosition="left" />
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="absolute left-1/2 bottom-[5vh] -translate-x-1/2 flex gap-3">
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Fast Delivery</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Fresh Pack</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Happiness Guaranteed</span></div>
      </div>
    </section>
  );
}
