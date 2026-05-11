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
    <section ref={sectionRef} className="aura-section relative w-full h-screen overflow-hidden" style={{ zIndex: 50 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/churner_bg.jpg" alt="Ice cream churners" className="aura-bg-image" />
        <div className="aura-image-overlay" />
      </div>

      {/* Left Panel */}
      <div
        ref={panelRef}
        className="aura-copy-panel glass-panel"
      >
        <h2 className="aura-display aura-display-md text-shadow-display">
          <span className="word aura-heading-line">The</span>
          <span className="word aura-heading-line mt-1">Freezer</span>
        </h2>
        <p className="word aura-copy mt-8">
          Slow churning, steady freezing, and a careful whip create the signature texture - smooth, light, and creamy.
        </p>
      </div>

      {/* Right Circles */}
      <div ref={circlesRef} className="aura-circle-stack flex flex-col gap-5">
        {circles.map((c, i) => (
          <div key={i} className="circle-item w-[72px] h-[72px] rounded-full glass-panel flex flex-col items-center justify-center gap-1">
            <span className="text-sky-500">{c.icon}</span>
            <span className="font-label text-[9px] uppercase tracking-wider text-[#243329] text-center">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Micro Pills */}
      <div ref={microRef} className="aura-micro-row">
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Air-light</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Smooth</span></div>
        <div className="glass-pill px-4 py-2"><span className="font-label text-xs uppercase tracking-widest text-[#243329]">Creamy</span></div>
      </div>
    </section>
  );
}
