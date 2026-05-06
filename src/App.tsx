import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Section1Hero from './sections/Section1Hero';
import Section2Milk from './sections/Section2Milk';
import Section3Fruit from './sections/Section3Fruit';
import Section4Flavor from './sections/Section4Flavor';
import Section5Freezer from './sections/Section5Freezer';
import Section6Topping from './sections/Section6Topping';
import Section7Factory from './sections/Section7Factory';
import Section8Products from './sections/Section8Products';
import Section9Final from './sections/Section9Final';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Small delay to let all section ScrollTriggers initialize
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative">
        <Section1Hero />
        <Section2Milk />
        <Section3Fruit />
        <Section4Flavor />
        <Section5Freezer />
        <Section6Topping />
        <Section7Factory />
        <Section8Products />
        <Section9Final />
      </main>
      {/* Grain overlay */}
      <div className="grain-overlay" />
    </>
  );
}

export default App;
