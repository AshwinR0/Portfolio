import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  const [typingText, setTypingText] = useState(''); 
  const fullTypingText = 'Coompiling portfolio'; // Corrected typo here

  useEffect(() => {
    setTypingText(''); // Ensure typingText starts empty

    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 500);

    // Typing animation
    let typingIndex = 0;
    const typingInterval = setInterval(() => {
      if (typingIndex < fullTypingText.length) {
        // Use charAt for safer character access
        setTypingText((prev) => prev + fullTypingText.charAt(typingIndex));
        typingIndex++;
      } else {
        clearInterval(typingInterval);
        // Optional: Ensure final text is correct if there were any race conditions/timing issues
        // setTypingText(fullTypingText); 
      }
    }, 100); // Adjust typing speed here

    return () => {
      clearInterval(dotsInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.95)', // Corresponds to dark:bg-gray-900 with opacity
        color: 'white',
        zIndex: 9999,
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '1.5rem',
        textAlign: 'center', // Ensure text is centered if it wraps
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', minHeight: '2em' /* prevent jump */ }}>
        <span>&gt; {typingText}</span>
        <span style={{ width: '2rem', textAlign: 'left' }}>{dots}</span>
      </div>
      <div
        style={{
          marginTop: '1rem',
          width: '250px', // Slightly wider bar
          height: '12px', // Slightly thicker bar
          backgroundColor: 'rgba(55, 65, 81, 1)', // gray-600
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(34, 197, 94, 1)', // green-500
            animation: 'loadingBar 5s linear forwards', // Changed to 3s and linear
          }}
        />
      </div>
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0%); }
          }
          /* Blinking cursor for typing effect */
          .typing-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
