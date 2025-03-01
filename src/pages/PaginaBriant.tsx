import { useState, useEffect } from "react";

export default function PaginaBriant() {
  const [showCode, setShowCode] = useState(false);
  const [codePosition, setCodePosition] = useState({ x: "100vw", y: "0" });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && "confetti" in window) {
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    
    const audio = new Audio("https://www.myinstants.com/media/sounds/trollolol.mp3");
    audio.play();
    
    setShowCode(true);
    animateCode();
  };

  const animateCode = () => {
    let xPos = 100;
    let yPos = 0;
    const interval = setInterval(() => {
      xPos -= 5;
      yPos = Math.sin(xPos * 0.1) * 50;
      setCodePosition({ x: `${xPos}vw`, y: `${yPos}px` });
      if (xPos <= 0) {
        clearInterval(interval);
        setCodePosition({ x: "0", y: "0" });
      }
    }, 50);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <button 
        onClick={handleClick} 
        className="text-lg p-4 bg-blue-500 rounded-xl shadow-lg hover:bg-blue-600 transition-all"
      >
        Pulsa para la sorpresa
      </button>
      {showCode && (
        <div 
          style={{ transform: `translate(${codePosition.x}, ${codePosition.y})` }}
          className="mt-8 text-4xl font-bold text-yellow-400 transition-all"
        >
          1234abcd
        </div>
      )}
    </div>
  );
}
