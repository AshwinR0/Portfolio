import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Trophy, Mail, ArrowRight } from 'lucide-react';

interface FinalWhistleProps {
  isDarkMode: boolean;
}

const FinalWhistle: React.FC<FinalWhistleProps> = ({ isDarkMode }) => {
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
          const nightGradient = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
          const dayGradient = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 30%, #87CEEB 100%)';
          
          tl.to(stadiumRef.current, {
            background: isDarkMode ? nightGradient : dayGradient,
            duration: 2,
            ease: 'power2.out'
          })
          .fromTo(starsRef.current,
            { opacity: 0, scale: 0, y: 50 },
            { 
              opacity: isDarkMode ? 1 : 0.3, 
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
          starsRef.current.forEach((star) => {
            if (star) {
              gsap.to(star, {
                opacity: isDarkMode ? 0.3 : 0.1,
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
  }, [isDarkMode]);

  // Theme transition effect
  useEffect(() => {
    const nightGradient = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
    const dayGradient = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 30%, #87CEEB 100%)';
    
    gsap.to(stadiumRef.current, {
      background: isDarkMode ? nightGradient : dayGradient,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    // Update stars opacity based on theme
    starsRef.current.forEach((star) => {
      if (star) {
        gsap.to(star, {
          opacity: isDarkMode ? 1 : 0.3,
          duration: 0.5
        });
      }
    });
  }, [isDarkMode]);

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
        className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-800 transition-all duration-500"
      />

      {/* Stars */}
      {starPositions.map((pos, index) => (
        <div
          key={index}
          ref={el => { if (el) starsRef.current[index] = el; }}
          className="absolute"
          style={{ top: pos.top, left: pos.left }}
        >
          <Star className={`w-4 h-4 fill-current ${
            isDarkMode ? 'text-yellow-300' : 'text-yellow-400'
          }`} />
        </div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-16">
        {/* Final scoreboard */}
        <div 
          ref={scoreboardRef}
          className={`border-4 border-yellow-400 rounded-3xl p-8 mb-12 shadow-2xl transition-colors duration-500 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4">
              FINAL WHISTLE
            </h2>
            <div className={`p-6 rounded-2xl mb-4 ${
              isDarkMode ? 'bg-black' : 'bg-gray-800'
            }`}>
              <div className="text-2xl md:text-4xl font-bold text-green-400 mb-2">
                NEXT MATCH
              </div>
              <div className={`text-lg md:text-xl ${
                isDarkMode ? 'text-white' : 'text-gray-100'
              }`}>
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
          <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Match Winner
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready for the championship league
          </p>
        </div>

        {/* Call to action */}
        <div 
          ref={ctaRef}
          className="text-center max-w-2xl mx-auto"
        >
          <h4 className={`text-2xl md:text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Let's Work Together
          </h4>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
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
              className={`group border-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-green-400 text-white' 
                  : 'bg-white hover:bg-gray-50 border-gray-300 hover:border-green-500 text-gray-800'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>View Resume</span>
            </a>
          </div>
        </div>

        {/* Final stats */}
        <div className={`mt-16 p-6 rounded-2xl border transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gray-900 bg-opacity-80 border-gray-700' 
            : 'bg-white bg-opacity-90 border-gray-300 shadow-lg'
        }`}>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Win Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">4+</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Pro</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalWhistle;