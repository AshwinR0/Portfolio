import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Trophy, Mail, ArrowRight } from 'lucide-react';

const FinalWhistle: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stadiumRef = useRef<HTMLDivElement>(null);
  const scoreboardRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stadium to stars transition
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          const tl = gsap.timeline();

          // Stadium fade to night sky
          tl.to(stadiumRef.current, {
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
            duration: 2,
            ease: 'power2.out'
          })
          .fromTo(starsRef.current,
            { opacity: 0, scale: 0, y: 50 },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.1,
              ease: 'back.out(2)'
            },
            '-=1'
          )
          .fromTo(scoreboardRef.current,
            { opacity: 0, y: -100, rotateX: -90 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'back.out(1.7)' },
            '-=0.5'
          )
          .fromTo(trophyRef.current,
            { opacity: 0, scale: 0, rotation: -180 },
            { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(2)' },
            '-=0.5'
          )
          .fromTo(ctaRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            '-=0.3'
          );

          // Trophy floating animation
          gsap.to(trophyRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: 2
          });

          // Stars twinkling
          starsRef.current.forEach((star, index) => {
            if (star) {
              gsap.to(star, {
                opacity: 0.3,
                duration: 1 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                delay: Math.random() * 2
              });
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const starPositions = [
    { top: '15%', left: '10%' },
    { top: '25%', left: '85%' },
    { top: '35%', left: '15%' },
    { top: '20%', left: '70%' },
    { top: '40%', left: '90%' },
    { top: '10%', left: '60%' },
    { top: '30%', left: '40%' },
    { top: '45%', left: '25%' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Stadium background transitioning to night sky */}
      <div 
        ref={stadiumRef}
        className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-800"
      />

      {/* Stars */}
      {starPositions.map((pos, index) => (
        <div
          key={index}
          ref={el => { if (el) starsRef.current[index] = el; }}
          className="absolute"
          style={{ top: pos.top, left: pos.left }}
        >
          <Star className="w-4 h-4 text-yellow-300 fill-current" />
        </div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Final scoreboard */}
        <div 
          ref={scoreboardRef}
          className="bg-gray-900 border-4 border-yellow-400 rounded-3xl p-8 mb-12 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4">
              FINAL WHISTLE
            </h2>
            <div className="bg-black p-6 rounded-2xl mb-4">
              <div className="text-2xl md:text-4xl font-bold text-green-400 mb-2">
                NEXT MATCH
              </div>
              <div className="text-lg md:text-xl text-white">
                Senior Front-End Developer Role
              </div>
            </div>
          </div>
        </div>

        {/* Trophy with player */}
        <div 
          ref={trophyRef}
          className="text-center mb-12"
        >
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-16 h-16 text-yellow-900" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">⚽</span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Match Winner
          </h3>
          <p className="text-yellow-300 text-lg">
            Ready for the championship league
          </p>
        </div>

        {/* Call to action */}
        <div 
          ref={ctaRef}
          className="text-center max-w-2xl mx-auto"
        >
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Let's Work Together
          </h4>
          <p className="text-gray-300 text-lg mb-8">
            Ready to join your team and create something amazing. 
            Let's discuss how I can contribute to your next big win.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ashwin@example.com"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#"
              className="group bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-green-400 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Trophy className="w-5 h-5" />
              <span>View Resume</span>
            </a>
          </div>
        </div>

        {/* Final stats */}
        <div className="mt-16 bg-gray-900 bg-opacity-80 p-6 rounded-2xl border border-gray-700">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">4+</div>
              <div className="text-sm text-gray-400">Years Pro</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-sm text-gray-400">Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalWhistle;