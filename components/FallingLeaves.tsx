import React from 'react';

const FallingLeaves: React.FC = () => {
  const leafEmojis = ['🍂', '🍁', '🍃']; // More emoji variety

  const leaves = Array.from({ length: 15 }).map((_, i) => {
    const animationType = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const animationDuration = `${Math.random() * 10 + 8}s`; // Slower, more graceful fall
    
    const emoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    const initialRotation = `rotate(${Math.random() * 360}deg)`;

    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      animation: `fall-${animationType} ${animationDuration} linear infinite`,
      animationDelay: `${Math.random() * 12}s`,
      fontSize: `${Math.random() * 2 + 1}rem`, // Increased size
    };
    return { id: i, style, emoji, initialRotation };
  });

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {leaves.map(leaf => (
          <div key={leaf.id} className="absolute top-[-10vh]" style={leaf.style}>
            <span style={{ display: 'inline-block', transform: leaf.initialRotation }}>
              {leaf.emoji}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        /* Gentle Drift */
        @keyframes fall-1 {
          0% {
            transform: translateY(0vh) translateX(0vw) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(15vw) rotate(180deg);
            opacity: 0;
          }
        }
        
        /* Tumble */
        @keyframes fall-2 {
          0% {
            transform: translateY(0vh) translateX(0vw) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateX(-10vw) rotate(90deg);
          }
          50% {
            transform: translateX(5vw) rotate(180deg);
          }
          75% {
            transform: translateX(-15vw) rotate(270deg);
          }
          100% {
            transform: translateY(110vh) translateX(10vw) rotate(360deg);
            opacity: 0;
          }
        }

        /* Zigzag */
        @keyframes fall-3 {
          0% {
            transform: translateY(0vh) translateX(0vw) rotate(-20deg);
            opacity: 1;
          }
          20% {
            transform: translateX(10vw) rotate(40deg);
          }
          40% {
            transform: translateX(-10vw) rotate(80deg);
          }
          60% {
            transform: translateX(15vw) rotate(120deg);
          }
          80% {
            transform: translateX(-5vw) rotate(160deg);
          }
          100% {
            transform: translateY(110vh) translateX(5vw) rotate(200deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default FallingLeaves;