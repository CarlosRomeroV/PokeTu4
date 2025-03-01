import { useState, useEffect } from "react";

export default function PaginaBriant() {
  const [showCode, setShowCode] = useState(false);
  const [codePosition, setCodePosition] = useState({ x: "100vw", y: "0" });
  const [bgImage, setBgImage] = useState(
    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkODImcu9TJK_7S2uB1WAgphxLxNSuhD4UYmcvHPkI7NiworESnjD8u4Nvule7acZBK4k&usqp=CAU')"
  );

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
    
    const iframe = document.getElementById("youtube-audio") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = "https://www.youtube.com/embed/v-trZ5EVpX0?autoplay=1&loop=1&playlist=v-trZ5EVpX0&mute=0";
    }
    
    // Eliminar cualquier otro sonido previo
    const audios = document.getElementsByTagName("audio");
    for (let audio of audios) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    setShowCode(true);
    animateCode();

    // Cambiar imagen de fondo con transición
    setBgImage("url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjFvR2OG8XAwnRO_GFzs0M7rwgrbQtjXk6Q&s')");
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
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white transition-all"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover", // Asegura que la imagen cubra todo el fondo
        backgroundPosition: "center", // Centra la imagen
        transition: "background-image 1s ease-in-out", // Transición suave
      }}
    >
      <iframe
        id="youtube-audio"
        width="0"
        height="0"
        src=""
        allow="autoplay"
        style={{ display: "none" }}
      ></iframe>
      <button 
        onClick={handleClick} 
        className="text-lg p-4 bg-blue-500 rounded-xl shadow-lg hover:bg-blue-600 transition-all"
      >
        Pulsa para celebrar!
      </button>
      {showCode && (
        <div 
          style={{ transform: `translate(${codePosition.x}, ${codePosition.y})` }}
          className="mt-8 text-4xl font-bold text-yellow-400 transition-all"
        >
            código de PSN :D
            D7PC-AE4R-QCLP
        </div>
      )}
    </div>
  );
}
