import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Citrus, Grape, Bean } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section4Flavor() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const grid = gridRef.current;
    const micro = microRef.current;
    if (!section || !panel || !grid || !micro) return;

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
        .fromTo(panel, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(words, { y: 36, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.08)
        .fromTo(gridItems, { y: '18vh', scale: 0.86, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.03, ease: 'none' }, 0.12)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.14);

      // EXIT (70-100%)
      scrollTl
        .fromTo(panel, { x: 0, opacity: 1 }, { x: '-16vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(gridItems, { opacity: 1 }, { opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  const items = [
    { icon: <Sparkles size={20} />, label: 'Vanilla Extract' },
    { icon: <Citrus size={20} />, label: 'Citrus Zest' },
    { icon: <Grape size={20} />, label: 'Berry Swirl' },
    { icon: <Bean size={20} />, label: 'Cocoa Nibs' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ zIndex: 40 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/pink_stir_bg.jpg" alt="Stirring flavor base" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime/50 via-lime/20 to-transparent" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel p-8"
        style={{ left: '6vw', top: '22vh', width: '42vw', height: '56vh', maxWidth: '560px' }}
      >
        <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight">Flavor</span>
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight mt-1">Crafting</span>
        </h2>
        <p className="word mt-8 font-body text-[clamp(13px,1.1vw,16px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
          A dash of vanilla, a pinch of salt, a careful swirl—turning great ingredients into a flavor you remember.
        </p>
      </div>

      {/* Right 2x2 Grid */}
      <div
        ref={gridRef}
        className="absolute grid grid-cols-2 gap-4"
        style={{ left: '62vw', top: '22vh', width: '28vw', maxWidth: '360px' }}
      >
        {items.map((item, i) => (
          <div key={i} className="grid-item glass-panel aspect-square flex flex-col items-center justify-center gap-3 p-4">
            <span className="text-lime-dark">{item.icon}</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B] text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex gap-3">
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Smooth</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Rich</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Balanced</span></div>
      </div>
    </section>
  );
}
