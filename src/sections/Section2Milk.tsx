import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Heart, Shield } from 'lucide-react';
import GlassPill from '../components/GlassPill';

gsap.registerPlugin(ScrollTrigger);

export default function Section2Milk() {
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

    const pillItems = pills.querySelectorAll('.rpill');
    const words = panel.querySelectorAll('.word');

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
        .fromTo(words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.06)
        .fromTo(pillItems, { x: '40vw', opacity: 0, scale: 0.92 }, { x: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'none' }, 0.1)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.16);

      // SETTLE (30-70%): static

      // EXIT (70-100%)
      scrollTl
        .fromTo(panel, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(pillItems, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ zIndex: 20 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/milk_field_bg.jpg" alt="Fresh milk in field" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime/50 via-lime/20 to-transparent" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel p-8"
        style={{ left: '6vw', top: '22vh', width: '42vw', height: '56vh', maxWidth: '560px' }}
      >
        <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight">Fresh Milk</span>
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight mt-1">Sourced</span>
        </h2>
        <p className="word mt-8 font-body text-[clamp(13px,1.1vw,16px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
          We partner with dairies that prioritize animal welfare and land care—so every batch starts clean.
        </p>
      </div>

      {/* Right Pills */}
      <div ref={pillsRef} className="absolute flex flex-col gap-5" style={{ left: '72vw', top: '24vh' }}>
        <div className="rpill">
          <GlassPill icon={<Leaf size={16} className="text-lime-dark" />}>100% Natural</GlassPill>
        </div>
        <div className="rpill">
          <GlassPill icon={<Heart size={16} className="text-pink-500" />}>Pasture-Raised</GlassPill>
        </div>
        <div className="rpill">
          <GlassPill icon={<Shield size={16} className="text-sky-500" />}>Antibiotic-Free</GlassPill>
        </div>
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex gap-3">
        <GlassPill>Grass-fed</GlassPill>
        <GlassPill>Hormone-free</GlassPill>
        <GlassPill>Local farms</GlassPill>
      </div>
    </section>
  );
}
