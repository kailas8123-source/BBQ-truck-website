import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Palette, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section3Fruit() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const stack = stackRef.current;
    const micro = microRef.current;
    if (!section || !panel || !stack || !micro) return;

    const words = panel.querySelectorAll('.word');
    const stackItems = stack.querySelectorAll('.stack-item');

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
        .fromTo(stackItems, { x: '40vw', opacity: 0, rotate: 2 }, { x: 0, opacity: 1, rotate: 0, stagger: 0.03, ease: 'none' }, 0.1)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.14);

      // EXIT (70-100%)
      scrollTl
        .fromTo(panel, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(stackItems, { x: 0, opacity: 1 }, { x: '16vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ zIndex: 30 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/berry_pour_bg.jpg" alt="Pouring berries" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime/50 via-lime/20 to-transparent" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel p-8"
        style={{ left: '6vw', top: '22vh', width: '42vw', height: '56vh', maxWidth: '560px' }}
      >
        <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight">Fruit</span>
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight mt-1">Mixing</span>
        </h2>
        <p className="word mt-8 font-body text-[clamp(13px,1.1vw,16px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
          Whole fruits. Real color. No shortcuts—just balanced sweetness and honest flavor.
        </p>
      </div>

      {/* Right Stack */}
      <div ref={stackRef} className="absolute flex flex-col gap-4" style={{ left: '72vw', top: '24vh', width: '18vw' }}>
        {[
          { icon: <Apple size={18} />, label: 'Whole Fruit' },
          { icon: <Palette size={18} />, label: 'Real Color' },
          { icon: <Scale size={18} />, label: 'Balanced Sweetness' },
        ].map((item, i) => (
          <div key={i} className="stack-item glass-panel px-5 py-4 flex items-center gap-3">
            <span className="text-lime-dark">{item.icon}</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex gap-3">
        <div className="glass-pill px-4 py-2">
          <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Strawberry</span>
        </div>
        <div className="glass-pill px-4 py-2">
          <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Blueberry</span>
        </div>
        <div className="glass-pill px-4 py-2">
          <span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Raspberry</span>
        </div>
      </div>
    </section>
  );
}
