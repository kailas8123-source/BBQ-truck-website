import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section8Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const cardItems = cards.querySelectorAll('.product-card');

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards reveal with parallax
      cardItems.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: '18vw', opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax while scrolling
        gsap.to(card, {
          y: '-4vh',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const products = [
    { image: '/images/product_cup.jpg', title: 'Ice Cream Cup', specs: 'Creamy \u00b7 120 ml' },
    { image: '/images/product_cone.jpg', title: 'Cone Bar', specs: 'Crispy \u00b7 90 ml' },
    { image: '/images/product_tub.jpg', title: 'Family Tub', specs: 'Share size \u00b7 500 ml' },
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full min-h-screen py-[10vh]"
      style={{ zIndex: 80, background: 'linear-gradient(180deg, #B6FF70 0%, #A8F060 100%)' }}
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.05) 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Heading */}
          <div ref={headingRef} className="lg:w-[40%] lg:sticky lg:top-[20vh] lg:self-start">
            <h2 className="font-display font-bold text-[#111] text-shadow-display leading-[0.95]">
              <span className="block text-[clamp(32px,5vw,64px)] uppercase tracking-tight">Our</span>
              <span className="block text-[clamp(32px,5vw,64px)] uppercase tracking-tight mt-1">Products</span>
            </h2>
            <p className="mt-6 font-body text-[clamp(14px,1.2vw,18px)] text-[#2B2B2B] leading-relaxed max-w-[90%]">
              Cups, cones, and bars—crafted for everyday moments and big celebrations.
            </p>
            <a href="#" className="inline-flex items-center gap-2 mt-6 font-label text-sm uppercase tracking-wider text-[#111] hover:text-lime-dark transition-colors group">
              View full range
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Cards */}
          <div ref={cardsRef} className="lg:w-[55%] flex flex-col gap-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="product-card glass-card overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-[#111]">{product.title}</h3>
                  <p className="mt-1 font-label text-xs uppercase tracking-widest text-[#2B2B2B]">{product.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
