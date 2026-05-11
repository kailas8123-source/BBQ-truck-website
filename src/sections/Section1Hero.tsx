import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Cherry, Leaf, ArrowRight } from 'lucide-react';
import GlassPill from '../components/GlassPill';
import Sparkles from '../components/Sparkles';
import Mascot from '../components/Mascot';

gsap.registerPlugin(ScrollTrigger);

export default function Section1Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const microPillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const pills = pillsRef.current;
    const mascot = mascotRef.current;
    const microPills = microPillsRef.current;
    const cta = ctaRef.current;
    if (!section || !card || !headline || !pills || !mascot || !microPills || !cta) return;

    const words = headline.querySelectorAll('.word');
    const pillItems = pills.querySelectorAll('.pill-item');

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(card, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 })
        .fromTo(words, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .fromTo(pillItems, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.6)' }, '-=0.3')
        .fromTo(cta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo(mascot, { opacity: 0, x: '-10vw' }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.5')
        .fromTo(microPills.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.3');

      // Scroll-driven EXIT animation (entrance holds at load end state)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Force visible when scrolling back to top
            gsap.set([card, ...words, ...pillItems, mascot, cta], { opacity: 1, x: 0, y: 0, scale: 1 });
            gsap.set(microPills.children, { opacity: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0-30%): hold at visible state
      // SETTLE (30-70%): static
      // EXIT (70-100%): animate out
      scrollTl
        .fromTo(card, { y: 0, scale: 1, opacity: 1 }, { y: '-10vh', scale: 0.96, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(words, { opacity: 1, y: 0 }, { opacity: 0, y: -20, stagger: 0.02 }, 0.72)
        .fromTo(pillItems[0], { x: 0, opacity: 1 }, { x: '-8vw', opacity: 0 }, 0.7)
        .fromTo(pillItems[1], { x: 0, opacity: 1 }, { x: '-6vw', opacity: 0 }, 0.72)
        .fromTo(pillItems[2], { x: 0, opacity: 1 }, { x: '8vw', opacity: 0 }, 0.74)
        .fromTo(mascot, { x: 0, opacity: 1 }, { x: '-12vw', opacity: 0 }, 0.7)
        .fromTo(microPills, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0 }, 0.75)
        .fromTo(cta, { opacity: 1 }, { opacity: 0 }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="aura-section relative w-full h-screen overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_kitchen_bg.jpg"
          alt="Modern kitchen"
          decoding="async"
          fetchPriority="high"
          className="aura-bg-image"
        />
        <div className="aura-image-overlay" />
      </div>

      {/* Top Right Badge */}
      <div className="aura-badge rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/70 z-20">
        <div className="text-center">
          <Leaf size={20} className="mx-auto text-lime-dark mb-0.5" />
          <span className="font-label text-[10px] uppercase tracking-wider text-[#243329] block">Natural</span>
        </div>
        <Sparkles className="-top-4 -right-4" />
      </div>

      {/* Center Card */}
      <div
        ref={cardRef}
        className="aura-hero-panel glass-panel"
      >
        {/* Headline */}
        <div ref={headlineRef} className="relative z-10 max-w-[38rem]">
          <h1 className="aura-display aura-display-lg text-shadow-display">
            <span className="word aura-heading-line">Frozen</span>
            <span className="word aura-heading-line mt-1">Joy</span>
          </h1>
          <p className="word aura-copy mt-6">
            Made with fresh milk, real fruit & naturally delicious.
          </p>
        </div>

        {/* Pills inside card */}
        <div ref={pillsRef} className="absolute inset-0 pointer-events-none">
          <div className="pill-item absolute" style={{ left: '58%', top: '20%' }}>
            <GlassPill icon={<Droplets size={16} className="text-sky-500" />}>Fresh Milk</GlassPill>
          </div>
          <div className="pill-item absolute" style={{ left: '10%', top: '52%' }}>
            <GlassPill icon={<Cherry size={16} className="text-pink-500" />}>Real Fruit</GlassPill>
          </div>
          <div className="pill-item absolute" style={{ left: '54%', top: '68%' }}>
            <GlassPill icon={<Leaf size={16} className="text-lime-dark" />}>No Artificial Nasties</GlassPill>
          </div>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="aura-cta absolute left-[clamp(24px,4vw,56px)] bottom-[clamp(24px,7vh,64px)] glass-pill px-6 py-3 flex items-center gap-2 bg-sky-accent/90 hover:bg-sky-accent"
        >
          <span className="font-label text-sm uppercase tracking-wider">Explore flavors</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Mascot */}
      <div ref={mascotRef} className="absolute" style={{ left: '6vw', top: '62vh', height: '18vh' }}>
        <Mascot className="h-full w-auto" bubbleText="Let's make something yummy!" bubblePosition="right" />
      </div>

      {/* Bottom Micro Pills */}
      <div
        ref={microPillsRef}
        className="aura-micro-row"
      >
        <GlassPill>Natural</GlassPill>
        <GlassPill>Creamy</GlassPill>
        <GlassPill>Tasty</GlassPill>
      </div>
    </section>
  );
}
