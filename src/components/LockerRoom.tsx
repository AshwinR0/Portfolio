import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Code, TestTube, Rocket } from 'lucide-react';

const LockerRoom: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chalkboardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  const philosophy = [
    {
      step: 'Plan',
      icon: Target,
      description: 'Strategic thinking and requirement analysis',
      color: 'text-blue-400 border-blue-400'
    },
    {
      step: 'Build',
      icon: Code,
      description: 'Clean, scalable code development',
      color: 'text-green-400 border-green-400'
    },
    {
      step: 'Test',
      icon: TestTube,
      description: 'Comprehensive testing and quality assurance',
      color: 'text-yellow-400 border-yellow-400'
    },
    {
      step: 'Deploy',
      icon: Rocket,
      description: 'Efficient deployment and monitoring',
      color: 'text-red-400 border-red-400'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chalkboard animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(chalkboardRef.current,
            { opacity: 0, rotateY: -45, scale: 0.8 },
            { opacity: 1, rotateY: 0, scale: 1, duration: 1.5, ease: 'back.out(1.4)' }
          );
        }
      });

      // Steps animation with drawing effect
      stepsRef.current.forEach((step, index) => {
        if (step) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            onEnter: () => {
              const tl = gsap.timeline();
              
              // Step card entrance
              tl.fromTo(step,
                { opacity: 0, y: 50, rotateX: 45 },
                { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'back.out(1.4)' }
              );

              // Connect lines drawing effect
              if (index < philosophy.length - 1) {
                const connector = step.parentElement?.querySelector(`[data-connector="${index}"]`);
                if (connector) {
                  tl.fromTo(connector,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
                    '-=0.3'
                  );
                }
              }
            }
          });
        }
      });

      // Floating animation for philosophy cards
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.to(step, {
            y: -8,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [philosophy.length]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-indigo-950 to-gray-900 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Locker Room
          </h2>
          <p className="text-xl text-indigo-200">
            Development Philosophy & Process
          </p>
        </div>

        {/* Chalkboard */}
        <div 
          ref={chalkboardRef}
          className="bg-gray-800 p-8 rounded-3xl shadow-2xl border-4 border-gray-600 mb-12"
          style={{
            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Game Plan</h3>
            <p className="text-gray-300">My development methodology</p>
          </div>

          {/* Philosophy steps */}
          <div className="relative">
            {/* Connection lines */}
            {philosophy.slice(0, -1).map((_, index) => (
              <div
                key={`connector-${index}`}
                data-connector={index}
                className={`absolute top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -translate-y-1/2 ${
                  index === 0 ? 'left-1/4' : index === 1 ? 'left-1/2' : 'left-3/4'
                }`}
                style={{
                  left: `${(index + 1) * 25}%`,
                  width: '25%',
                  transformOrigin: 'left center'
                }}
              />
            ))}

            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {philosophy.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={el => { if (el) stepsRef.current[index] = el; }}
                    className={`bg-gray-700 p-6 rounded-2xl border-2 ${item.color} group hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-gray-500 transition-colors duration-300`}>
                        <IconComponent className={`w-8 h-8 ${item.color.split(' ')[0]}`} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.step}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Philosophy details */}
        <div className="bg-gray-800 p-8 rounded-3xl border border-indigo-400">
          <h4 className="text-2xl font-bold text-white text-center mb-6">Coaching Notes</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="text-lg font-semibold text-indigo-400 mb-3">Technical Excellence</h5>
              <ul className="space-y-2 text-gray-300">
                <li>• Clean, maintainable code architecture</li>
                <li>• Performance-first development approach</li>
                <li>• Comprehensive testing strategies</li>
                <li>• Continuous learning and adaptation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-green-400 mb-3">Team Collaboration</h5>
              <ul className="space-y-2 text-gray-300">
                <li>• Agile development methodologies</li>
                <li>• Clear communication and documentation</li>
                <li>• Code reviews and knowledge sharing</li>
                <li>• Mentoring and skill development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockerRoom;