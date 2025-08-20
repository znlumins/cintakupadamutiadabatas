import React, { useEffect, useState, useRef } from "react";

const useTextScramble = (targetText) => {
  const [text, setText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#";
  const frameRequest = useRef();
  const frame = useRef(0);
  const queue = useRef([]);

  useEffect(() => {
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0, n = queue.current.length; i < n; i++) {
        const { from, to, start, end } = queue.current[i] || {};
        if (frame.current >= end) {
          complete++;
          output += to;
        } else if (frame.current >= start) {
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += from || "";
        }
      }
      setText(output);
      if (complete === queue.current.length) {
        cancelAnimationFrame(frameRequest.current);
        return;
      }
      frame.current += 1;
      frameRequest.current = requestAnimationFrame(update);
    };

    queue.current = targetText.split("").map((to, i) => {
      const start = Math.floor(Math.random() * 40) + i * 3;
      const end = start + Math.floor(Math.random() * 40) + 10;
      return {
        from: text[i] || "",
        to,
        start,
        end,
      };
    });

    frame.current = 0;
    cancelAnimationFrame(frameRequest.current);
    frameRequest.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRequest.current);
  }, [targetText]);

  return text;
};

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [highlightDone, setHighlightDone] = useState(false);
  const scrambledText = useTextScramble("ZNLUMINS.DEV");

  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + Math.random() * 3));
    }, 25);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      setHighlightDone(true);
      const highlightTimer = setTimeout(() => {
        setHighlightDone(false);
        setIsDone(true);
        const completeTimer = setTimeout(onComplete, 600);
        return () => clearTimeout(completeTimer);
      }, 700);
      return () => clearTimeout(highlightTimer);
    }
  }, [progress, onComplete]);

  const handleClick = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 3500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ${
        isDone ? "opacity-0 blur-lg" : "opacity-100 blur-0"
      }`}
      style={{
        fontFamily:
          `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
        background: `linear-gradient(180deg, #000000 0%, #05070a 40%, #0f1219 100%)`,
        backgroundColor: "#000",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Scramble text */}
      <div
        className={`text-white text-3xl sm:text-4xl mb-8 tracking-[0.2em] cursor-pointer select-none transition-colors duration-300 ${
          highlightDone ? "text-white" : ""
        }`}
        style={{
          textShadow: highlightDone
            ? "0 0 6px rgba(255,255,255,0.7), 0 0 12px rgba(255,255,255,0.4)"
            : "0 0 4px rgba(255,255,255,0.3)",
          fontWeight: 400,
          userSelect: "none",
          animation: "glowPulse 5s ease-in-out infinite",
        }}
        onClick={handleClick}
        title="Click me!"
      >
        {scrambledText}
      </div>

      {/* Easter egg message */}
      {showEasterEgg && (
        <div className="text-sm text-gray-300 mb-6 select-none animate-fadeIn font-medium">
          🚀 You're a true lumins explorer! Keep shining ✨
        </div>
      )}

      {/* Progress bar container with frosted glass */}
      <div
        className="w-52 h-[4px] rounded-full overflow-hidden relative"
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 0 15px rgba(255,255,255,0.15)",
        }}
      >
        <div
          className={`h-full bg-white/90 transition-all ease-out rounded-full`}
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 12px rgba(255,255,255,0.3)",
            transformOrigin: "left",
            animation: progress >= 100 ? "progressBounce 0.4s ease-out" : "none",
          }}
        ></div>

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            animation: "shimmerMove 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        ></div>
      </div>

      {/* Animasi keyframes */}
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% { text-shadow: 0 0 4px rgba(255,255,255,0.3); }
            50% { text-shadow: 0 0 10px rgba(255,255,255,0.6); }
          }
          @keyframes shimmerMove {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
          @keyframes progressBounce {
            0% { transform: scaleX(1); }
            50% { transform: scaleX(1.1); }
            100% { transform: scaleX(1); }
          }
        `}
      </style>
    </div>
  );
};

export { LoadingScreen };
