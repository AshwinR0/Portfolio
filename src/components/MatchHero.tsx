import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';

interface MatchHeroProps {
  isDarkMode: boolean;
}

const MatchHero: React.FC<MatchHeroProps> = ({ isDarkMode }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, socialRef.current], { opacity: 0, y: 50 });
      gsap.set(silhouetteRef.current, { opacity: 0, scale: 0.8 });

      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      const dayGradient = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #4ade80 100%)';
      const nightGradient = 'linear-gradient(135deg, #1a1a1a 0%, #2d5a27 50%, #4ade80 100%)';
      
      tl.to(tunnelRef.current, {
        background: isDarkMode ? nightGradient : dayGradient,
        duration: 2,
        ease: 'power2.out'
      })
      .to(silhouetteRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)'
      }, '-=1')
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5')
      .to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3');

      // Scroll-triggered stadium transformation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        onUpdate: () => {
          const currentGradient = isDarkMode ? nightGradient : dayGradient;
          gsap.to(tunnelRef.current, {
            background: currentGradient,
            duration: 0.3
          });
        }
      });

      // Floating animation for silhouette
      gsap.to(silhouetteRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isDarkMode]);

  // Theme transition effect
  useEffect(() => {
    const dayGradient = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #4ade80 100%)';
    const nightGradient = 'linear-gradient(135deg, #1a1a1a 0%, #2d5a27 50%, #4ade80 100%)';
    
    gsap.to(tunnelRef.current, {
      background: isDarkMode ? nightGradient : dayGradient,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }, [isDarkMode]);

  return (
    <section 
      ref={heroRef}
      className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-blue-100'
      }`}
    >
      {/* Stadium tunnel background */}
      <div 
        ref={tunnelRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-green-400"
        style={{
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
        }}
      />
      
      {/* Stadium lights effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute top-10 left-1/4 w-20 h-20 rounded-full opacity-20 blur-xl animate-pulse ${
          isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'
        }`} />
        <div className={`absolute top-20 right-1/4 w-16 h-16 rounded-full opacity-30 blur-lg animate-pulse ${
          isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-32 left-1/3 w-12 h-12 rounded-full opacity-25 blur-lg animate-pulse ${
          isDarkMode ? 'bg-yellow-200' : 'bg-yellow-500'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef}>
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            isDarkMode 
              ? 'from-white via-green-200 to-green-400' 
              : 'from-gray-800 via-green-600 to-green-800'
          }`}>
            Ashwin R
          </h1>
          <h2 className={`text-xl md:text-2xl mb-2 font-medium ${
            isDarkMode ? 'text-green-200' : 'text-green-700'
          }`}>
            Front-End Developer
          </h2>
          <p className={`text-lg md:text-xl mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Code Strategist | Game Changer
          </p>
        </div>

        {/* Social badges */}
        <div ref={socialRef} className="flex justify-center space-x-6">
          <a 
            href="https://github.com" 
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-green-600' 
                : 'bg-white hover:bg-green-500 text-gray-800 hover:text-white shadow-lg'
            }`}
          >
            <Github className="w-5 h-5" />
            <span className="hidden md:inline">GitHub</span>
          </a>
          <a 
            href="https://linkedin.com" 
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-blue-600' 
                : 'bg-white hover:bg-blue-500 text-gray-800 hover:text-white shadow-lg'
            }`}
          >
            <Linkedin className="w-5 h-5" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>
          <a 
            href="mailto:ashwin@example.com" 
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-red-600' 
                : 'bg-white hover:bg-red-500 text-gray-800 hover:text-white shadow-lg'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="hidden md:inline">Email</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="w-1 h-12 bg-gradient-to-b from-green-400 to-transparent mx-auto mb-2 animate-pulse" />
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Match Starting
        </p>
      </div>
    </section>
  );
};

export default MatchHero;