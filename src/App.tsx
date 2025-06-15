import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import MatchHero from './components/MatchHero';
import SkillsFormation from './components/SkillsFormation';
import ExperienceReplay from './components/ExperienceReplay';
import ProjectGoals from './components/ProjectGoals';
import LockerRoom from './components/LockerRoom';
import FinalWhistle from './components/FinalWhistle';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function App() {
  useEffect(() => {
    // Initialize scroll-snap behavior
    gsap.set(document.body, { overflow: 'auto' });
    
    // Smooth scrolling setup
    
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <MatchHero />
      <SkillsFormation />
      <ExperienceReplay />
      <ProjectGoals />
      <LockerRoom />
      <FinalWhistle />
    </div>
  );
}

export default App;