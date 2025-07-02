import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorTrail: React.FC = () => {
  const trailRef = useRef<HTMLDivElement>(null);
  // Store the timeout ID in a ref to ensure it's stable across renders
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const trailElement = trailRef.current;
    if (!trailElement) return;

    // Initial hide, then quick fade in to avoid seeing it jump from 0,0
    gsap.set(trailElement, { opacity: 0, xPercent: -50, yPercent: -50 });
    gsap.to(trailElement, { opacity: 1, duration: 0.3, delay: 0.1 });


    const onMouseMove = (e: MouseEvent) => {
      if (trailElement) {
        gsap.to(trailElement, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2, // Fast follow
          ease: 'power2.out',
        });
        // Make it visible and reset hide timer
        gsap.to(trailElement, { scale: 1, opacity: 0.7, duration: 0.2 });
        if (hideTimeoutRef.current !== null) {
            window.clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = window.setTimeout(() => {
            gsap.to(trailElement, { scale: 0.5, opacity: 0, duration: 0.3 });
        }, 150); // Hide after 150ms of no movement
      }
    };

    const onMouseLeave = () => {
        if (trailElement) {
            gsap.to(trailElement, { scale: 0.5, opacity: 0, duration: 0.3 });
        }
    }

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);


    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      // Ensure GSAP animations are killed if the component unmounts
      if (trailElement) {
        gsap.killTweensOf(trailElement);
      }
    };
  }, []);

  return (
    <div
      ref={trailRef}
      style={{
        position: 'fixed',
        top: 0, // GSAP will handle positioning via transform
        left: 0, // GSAP will handle positioning via transform
        width: '24px', // Increased size
        height: '24px', // Increased size
        backgroundColor: "#FFFFFF",
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998, // Below loading screen, but above most other content
        opacity: 0, // Start hidden
        scale: 1,
        // Centering the origin of the transform
        transformOrigin: 'center center', 
      }}
    />
  );
};

export default CursorTrail;
