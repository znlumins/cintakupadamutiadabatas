import React, { useEffect, useState, useRef } from "react";

// Hook scramble text langsung di sini
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

        queue.current = targetText.split("").map((to, i) => ({
            from: text[i] || "",
            to,
            start: Math.floor(Math.random() * 30),
            end: Math.floor(Math.random() * 30) + i * 2,
        }));

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
    const scrambledText = useTextScramble("ZNLUMINS.DEV");

    // Progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                return prev + 1;
            });
        }, 25);
        return () => clearInterval(interval);
    }, []);

    // Selesai loading → fade out
    useEffect(() => {
        if (progress >= 100) {
            const finishTimer = setTimeout(() => {
                setIsDone(true);
                const completeTimer = setTimeout(onComplete, 500);
                return () => clearTimeout(completeTimer);
            }, 800);
            return () => clearTimeout(finishTimer);
        }
    }, [progress, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ${isDone ? "opacity-0 blur-md" : "opacity-100 blur-0"}`}
            style={{
                fontFamily: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif`,
                background: `linear-gradient(180deg, #000000 0%, #020202 50%, #0d0d0d 100%)`,
                backgroundColor: "#000", // fallback
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            {/* Scramble text */}
            <div
                className="text-white text-2xl sm:text-3xl mb-8 tracking-[0.15em]"
                style={{
                    textShadow: "0 0 12px rgba(255,255,255,0.7)",
                    animation: "glowPulse 3s ease-in-out infinite"
                }}
            >
                {scrambledText}
            </div>

            {/* Progress bar container */}
            <div className="w-44 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <div
                    className="h-full bg-white/90 transition-all ease-linear"
                    style={{
                        width: `${progress}%`,
                        boxShadow: "0 0 8px rgba(255,255,255,0.6)"
                    }}
                ></div>

                {/* Shimmer effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        animation: "shimmerMove 2s infinite"
                    }}
                ></div>
            </div>

            {/* Animasi keyframes */}
            <style>
                {`
                    @keyframes glowPulse {
                        0%, 100% { text-shadow: 0 0 12px rgba(255,255,255,0.7); }
                        50% { text-shadow: 0 0 20px rgba(255,255,255,0.9); }
                    }
                    @keyframes shimmerMove {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}
            </style>
        </div>
    );
};

// Export sebagai named biar cocok sama import { LoadingScreen }
export { LoadingScreen };
