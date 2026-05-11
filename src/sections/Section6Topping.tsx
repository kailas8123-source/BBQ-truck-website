import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cherry, Cookie, Nut } from 'lucide-react';
import GlassPill from '../components/GlassPill';

gsap.registerPlugin(ScrollTrigger);

export default function Section6Topping() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const pills = pillsRef.current;
    const micro = microRef.current;
    if (!section || !panel || !pills || !micro) return;

    const words = panel.querySelectorAll('.word');
    const pillItems = pills.querySelectorAll('.tpill');

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
        .fromTo(pillItems, { x: '35vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.1)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.14);

      // EXIT (70-100%)
      scrollTl
        .fromTo(panel, { x: 0, opacity: 1 }, { x: '-16vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(pillItems, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="aura-section relative w-full h-screen overflow-hidden" style={{ zIndex: 60 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/topping_cups_bg.jpg" alt="Ice cream toppings" className="aura-bg-image" />
        <div className="aura-image-overlay" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="aura-copy-panel glass-panel"
      >
        <h2 className="aura-display aura-display-md text-shadow-display">
          <span className="word aura-heading-line">Topping</span>
          <span className="word aura-heading-line mt-1">Bar</span>
        </h2>
        <p className="word aura-copy mt-8">
          From berry bursts to cookie crumble - top it your way for a little extra joy in every spoonful.
        </p>
      </div>

      {/* Right Pills */}
      <div ref={pillsRef} className="aura-pill-stack flex flex-col gap-5">
        <div className="tpill">
          <GlassPill icon={<Cherry size={16} className="text-pink-500" />}>Berry Burst</GlassPill>
        </div>
        <div className="tpill">
          <GlassPill icon={<Cookie size={16} className="text-amber-600" />}>Cookie Crumble</GlassPill>
        </div>
        <div className="tpill">
          <GlassPill icon={<Nut size={16} className="text-amber-700" />}>Nutty Crunch</GlassPill>
        </div>
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="aura-micro-row">
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Crunchy</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Chewy</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Fruity</span></div>
      </div>
    </section>
  );
}
