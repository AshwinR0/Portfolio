import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import LoadingScreen from './components/LoadingScreen'; // Import LoadingScreen
import CursorTrail from './components/CursorTrail'; // Import CursorTrail
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Sun, Moon } from 'lucide-react';
import MatchHero from './components/MatchHero';
import SkillsFormation from './components/SkillsFormation';
import ExperienceReplay from './components/ExperienceReplay';
import ProjectGoals from './components/ProjectGoals';
import LockerRoom from './components/LockerRoom';
import FinalWhistle from './components/FinalWhistle';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // isLoading state

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  useEffect(() => {
    // Initialize scroll-snap behavior
    gsap.set(document.body, { overflow: 'auto' });
    
    // Smooth scrolling setup
    ScrollTrigger.normalizeScroll(true);
    
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    // Animate theme transition
    gsap.to(document.body, {
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}>
      <CursorTrail /> {/* Pass isDarkMode to CursorTrail */}
      <div className="bg-gray-900 dark:bg-gray-900 text-white overflow-x-hidden relative">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 group"
          aria-label={isDarkMode ? 'Switch to Day Match' : 'Switch to Night Match'}
        >
          <div className="relative w-6 h-6">
            <Sun className={`w-6 h-6 absolute transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-yellow-500`} />
            <Moon className={`w-6 h-6 absolute transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-blue-400`} />
          </div>
          <div className="absolute -bottom-12 right-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isDarkMode ? 'Day Match' : 'Night Match'}
          </div>
        </button>

        <MatchHero isDarkMode={isDarkMode} />
        <SkillsFormation isDarkMode={isDarkMode} />
        <ExperienceReplay isDarkMode={isDarkMode} />
        <ProjectGoals isDarkMode={isDarkMode} />
        <LockerRoom isDarkMode={isDarkMode} />
        <FinalWhistle isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;