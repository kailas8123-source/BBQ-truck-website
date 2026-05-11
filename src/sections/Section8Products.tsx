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
    { image: '/images/product_cup.jpg', title: 'Ice Cream Cup', specs: 'Creamy - 120 ml' },
    { image: '/images/product_cone.jpg', title: 'Cone Bar', specs: 'Crispy - 90 ml' },
    { image: '/images/product_tub.jpg', title: 'Family Tub', specs: 'Share size - 500 ml' },
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full min-h-screen py-[10vh] overflow-hidden"
      style={{ zIndex: 80, background: 'linear-gradient(135deg, #F7FFFC 0%, #B6FF70 42%, #B3E0FF 100%)' }}
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45), rgba(247,255,252,0.1)), radial-gradient(ellipse at center, transparent 48%, rgba(28,54,42,0.08) 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Heading */}
          <div ref={headingRef} className="lg:w-[40%] lg:sticky lg:top-[20vh] lg:self-start">
            <h2 className="aura-display aura-display-md text-shadow-display">
              <span className="aura-heading-line">Our</span>
              <span className="aura-heading-line mt-1">Products</span>
            </h2>
            <p className="aura-copy mt-6">
              Cups, cones, and bars - crafted for everyday moments and big celebrations.
            </p>
            <a href="#" className="aura-cta glass-pill inline-flex items-center gap-2 mt-6 px-5 py-3 font-label text-sm uppercase tracking-wider text-[#111] bg-white/80 group">
              View full range
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Cards */}
          <div ref={cardsRef} className="lg:w-[55%] flex flex-col gap-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="product-card glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
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
                  <p className="mt-1 font-label text-xs uppercase tracking-widest text-[#243329]">{product.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
