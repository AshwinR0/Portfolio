import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail } from 'lucide-react';
import goalKeeper from '../assets/svg/goalKeeper.svg'; // Adjust the path as necessary
import striker from '../assets/svg/striker.svg'; // Adjust the path as necessary

interface MatchHeroProps {
  isDarkMode: boolean;
}

const MatchHero: React.FC<MatchHeroProps> = ({ isDarkMode }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const playerSilhouettesRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, socialRef.current], { opacity: 0, y: 50 });
      gsap.set(silhouetteRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(playerSilhouettesRef.current, { opacity: 0 });

      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(fieldRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      })
        .to(playerSilhouettesRef.current, {
          opacity: isDarkMode ? 0.8 : 0.6,
          duration: 1.5,
          ease: 'power2.out'
        }, '-=1.5')
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

      // Mouse tilt interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!titleRef.current || !nameRef.current || !subtitleRef.current) return;

        const rect = titleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse position relative to title center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate tilt angles (limit the range for subtle effect)
        const maxTilt = 15; // Maximum tilt in degrees
        const tiltX = (mouseY / (rect.height / 2)) * maxTilt * -1; // Invert Y for natural feel
        const tiltY = (mouseX / (rect.width / 2)) * maxTilt;

        // Calculate translation for depth effect
        const maxTranslate = 8;
        const translateX = (mouseX / (rect.width / 2)) * maxTranslate;
        const translateY = (mouseY / (rect.height / 2)) * maxTranslate;

        // Apply different intensities for name and subtitle
        gsap.to(nameRef.current, {
          rotationX: tiltX,
          rotationY: tiltY,
          x: translateX,
          y: translateY,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformOrigin: 'center center'
        });

        gsap.to(subtitleRef.current, {
          rotationX: tiltX * 0.7, // Less intense for subtitle
          rotationY: tiltY * 0.7,
          x: translateX * 0.5,
          y: translateY * 0.5,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformOrigin: 'center center'
        });

      };

      const handleMouseLeave = () => {
        // Reset to original position when mouse leaves
        gsap.to([nameRef.current, subtitleRef.current], {
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      };

      // Add event listeners
      if (titleRef.current) {
        titleRef.current.addEventListener('mousemove', handleMouseMove);
        titleRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      // Scroll-triggered stadium transformation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(fieldRef.current, {
            scale: 1 + progress * 0.1,
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

      // Animate player silhouettes
      const players = playerSilhouettesRef.current?.children;
      if (players) {
        Array.from(players).forEach((player, index) => {
          gsap.to(player, {
            y: -5 + Math.sin(index) * 3,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.2
          });
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isDarkMode]);

  // Theme transition effect
  useEffect(() => {
    gsap.to(playerSilhouettesRef.current, {
      opacity: isDarkMode ? 0.8 : 0.6,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }, [isDarkMode]);

  return (
    <section
      ref={heroRef}
      className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-100'
        }`}
    >
      {/* Football Field Background */}
      <div
        ref={fieldRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, #1a4d3a 0%, #2d5a27 30%, #1a4d3a 70%, #0f2419 100%)'
            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 30%, #15803d 70%, #166534 100%)',
          transform: 'scale(0.8)'
        }}
      >
        {/* Field markings */}
        <div className="absolute inset-0">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white opacity-30 transform -translate-x-1/2" />

          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border-2 border-white opacity-30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

          {/* Goal areas */}
          <div className="absolute left-0 top-1/2 w-16 h-24 border-2 border-white opacity-30 transform -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-16 h-24 border-2 border-white opacity-30 transform -translate-y-1/2" />

          {/* Corner arcs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-b-2 border-r-2 border-white opacity-30 rounded-br-full" />
          <div className="absolute top-0 right-0 w-8 h-8 border-b-2 border-l-2 border-white opacity-30 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-t-2 border-r-2 border-white opacity-30 rounded-tr-full" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-white opacity-30 rounded-tl-full" />
        </div>
      </div>

      {/* Player Silhouettes */}
      <div
        ref={playerSilhouettesRef}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Kicking player silhouette */}
        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2">
          {/* <svg width="120" height="120" viewBox="0 0 120 120" className={`${isDarkMode ? 'text-black' : 'text-gray-800'} opacity-70`}>
            <path fill="currentColor" d="M60 10c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm-8 25c-3 0-5 2-5 5v15l-15 8c-2 1-3 3-2 5l8 15c1 2 3 3 5 2l12-6v20c0 3 2 5 5 5s5-2 5-5V79l12 6c2 1 4 0 5-2l8-15c1-2 0-4-2-5l-15-8V40c0-3-2-5-5-5h-16z"/>
          </svg> */}
          <img
            src={striker}
            alt="Goalkeeper"
            width={350}
            height={350}
            className={`${isDarkMode ? 'text-black' : 'text-gray-800'} opacity-70`}
            draggable={false}
          />
        </div>

        {/* Goalkeeper silhouette */}
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
          {/* <svg width="100" height="100" viewBox="0 0 100 100" className={`${isDarkMode ? 'text-black' : 'text-gray-800'} opacity-70`}>
            <path fill="currentColor" d="M50 8c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm-6 20c-2 0-4 2-4 4v12l-20 5c-2 0-3 2-3 4v8c0 2 1 4 3 4l20-5v25c0 2 2 4 4 4h12c2 0 4-2 4-4V60l20 5c2 0 3-2 3-4v-8c0-2-1-4-3-4l-20-5V32c0-2-2-4-4-4H44z"/>
          </svg> */}
          <img
            src={goalKeeper}
            alt="Goalkeeper"
            width={500}
            height={500}
            className={`${isDarkMode ? 'text-black' : 'text-gray-800'} opacity-70`}
            draggable={false}
          />
        </div>

        {/* Football */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-800'} opacity-60`}>
            <div className="w-full h-full rounded-full border-2 border-current opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Stadium tunnel overlay */}
      <div
        ref={tunnelRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)'
            : 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Stadium lights effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-10 left-1/4 w-20 h-20 rounded-full opacity-20 blur-xl animate-pulse ${isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'
          }`} />
        <div className={`absolute top-20 right-1/4 w-16 h-16 rounded-full opacity-30 blur-lg animate-pulse ${isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'
          }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-32 left-1/3 w-12 h-12 rounded-full opacity-25 blur-lg animate-pulse ${isDarkMode ? 'bg-yellow-200' : 'bg-yellow-500'
          }`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div ref={titleRef}>
          {/* 3D Extruded Name */}
          {/* <h1 
            ref={nameRef}
            className={`text-6xl md:text-8xl font-bold mb-4 relative ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
            style={{
              textShadow: isDarkMode 
                ? '4px 4px 0px #4ade80, 8px 8px 0px #22c55e, 12px 12px 0px #16a34a, 16px 16px 20px rgba(0,0,0,0.3)'
                : '4px 4px 0px #86efac, 8px 8px 0px #4ade80, 12px 12px 0px #22c55e, 16px 16px 20px rgba(0,0,0,0.2)',
              filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.3))',
              transformStyle: 'preserve-3d'
            }}
          >
          Ashwin R
          </h1> */}
          <h1
            ref={nameRef}
            className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                ? 'from-white via-green-200 to-green-400'
                : 'from-gray-800 via-green-600 to-green-800'
              }`}
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              fontSize: "100px",
              color: '#FFFFFF', // Set the text color
              textShadow: '-5px 4px 0px rgba(0,0,0,0.95)',
              filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.10))',
              transformStyle: 'preserve-3d'
            }}
          >
            Ashwin R
          </h1>

          {/* 3D Extruded Subtitle */}
          {/* <h2
            ref={subtitleRef}
            className={`text-2xl md:text-3xl font-semibold ${isDarkMode ? 'text-green-200' : 'text-green-700'
              }`}
            style={{
              textShadow: isDarkMode
                ? '2px 2px 0px #22c55e, 4px 4px 0px #16a34a, 6px 6px 10px rgba(0,0,0,0.2)'
                : '2px 2px 0px #4ade80, 4px 4px 0px #22c55e, 6px 6px 10px rgba(0,0,0,0.1)',
              filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.2))',
              transformStyle: 'preserve-3d'
            }}
          >
            Front-End Developer
          </h2> */}
          <h1
            ref={subtitleRef}
            className={`text-xl md:text-2xl mb-2 font-medium ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              color: '#FFFFFF', // Set the text color
              textShadow: '-5px 4px 0px rgba(0,0,0,0.95)',
              filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.10))',
              transformStyle: 'preserve-3d'
            }}  
            >
            Front-End Developer
          </h1>

          <p className={`text-lg md:text-xl mb-8 text-gray-300'
            }`}>
            Code Strategist | Game Changer
          </p>
        </div>

        {/* Social badges */}
        <div ref={socialRef} className="flex justify-center space-x-6">
          <a
            href="https://github.com/AshwinR0"
            target='_blank'
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${isDarkMode
              ? 'bg-gray-800 hover:bg-green-600'
              : 'bg-white hover:bg-green-500 text-gray-800 hover:text-white shadow-lg'
              }`}
          >
            <Github className="w-5 h-5" />
            <span className="hidden md:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ashwinrevi/"
            target='_blank'
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${isDarkMode
              ? 'bg-gray-800 hover:bg-blue-600'
              : 'bg-white hover:bg-blue-500 text-gray-800 hover:text-white shadow-lg'
              }`}
          >
            <Linkedin className="w-5 h-5" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>
          <a
            href="mailto:ashwinrevi10@gmail.com"
            className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${isDarkMode
              ? 'bg-gray-800 hover:bg-red-600'
              : 'bg-white hover:bg-red-500 text-gray-800 hover:text-white shadow-lg'
              }`}
          >
            <Mail className="w-5 h-5" />
            <span className="hidden md:inline">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MatchHero;