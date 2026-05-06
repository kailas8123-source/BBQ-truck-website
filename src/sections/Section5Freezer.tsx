import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Snowflake, Thermometer, Wind, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section5Freezer() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const circles = circlesRef.current;
    const micro = microRef.current;
    if (!section || !panel || !circles || !micro) return;

    const words = panel.querySelectorAll('.word');
    const circleItems = circles.querySelectorAll('.circle-item');

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
        .fromTo(circleItems, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.02, ease: 'back.out(1.8)' }, 0.1)
        .fromTo(micro.children, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.14);

      // EXIT (70-100%)
      scrollTl
        .fromTo(panel, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(circleItems, { x: 0, opacity: 1 }, { x: '14vw', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  const circles = [
    { icon: <Snowflake size={22} />, label: 'Slow Churn' },
    { icon: <Thermometer size={22} />, label: 'Steady Freeze' },
    { icon: <Wind size={22} />, label: 'Perfect Whip' },
    { icon: <Cloud size={22} />, label: 'Creamy Texture' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden" style={{ zIndex: 50 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/churner_bg.jpg" alt="Ice cream churners" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime/50 via-lime/20 to-transparent" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="absolute glass-panel p-8"
        style={{ left: '6vw', top: '22vh', width: '42vw', height: '56vh', maxWidth: '560px' }}
      >
        <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight">The</span>
          <span className="word block text-[clamp(28px,4vw,56px)] uppercase tracking-tight mt-1">Freezer</span>
        </h2>
        <p className="word mt-8 font-body text-[clamp(13px,1.1vw,16px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
          Slow churning, steady freezing, and a careful whip create the signature texture—smooth, light, and creamy.
        </p>
      </div>

      {/* Right Circles */}
      <div ref={circlesRef} className="absolute flex flex-col gap-5" style={{ left: '70vw', top: '20vh' }}>
        {circles.map((c, i) => (
          <div key={i} className="circle-item w-[72px] h-[72px] rounded-full glass-panel flex flex-col items-center justify-center gap-1">
            <span className="text-sky-500">{c.icon}</span>
            <span className="font-label text-[9px] uppercase tracking-wider text-[#2B2B2B]">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex gap-3">
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Air-light</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Smooth</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#2B2B2B]">Creamy</span></div>
      </div>
    </section>
  );
}
