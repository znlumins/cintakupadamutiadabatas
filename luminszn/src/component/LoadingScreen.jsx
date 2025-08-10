import React, { useEffect, useState, useRef } from "react";

// Hook useTextScramble (tidak ada perubahan)
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
            to: to,
            start: Math.floor(Math.random() * 40),
            end: Math.floor(Math.random() * 40) + i * 3,
        }));
        
        frame.current = 0;
        cancelAnimationFrame(frameRequest.current);
        frameRequest.current = requestAnimationFrame(update);
        
        return () => cancelAnimationFrame(frameRequest.current);
    }, [targetText]);

    return text;
};

// Komponen Loading Screen
export const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Booting system...");
    const [isDone, setIsDone] = useState(false);
    const [isLuminMode, setIsLuminMode] = useState(false);
    const keySequence = useRef("");
    const secretCode = "LUMINSZN";

    const targetScrambleText = isLuminMode ? "ZNLUMINSCENT" : "<Gipsy.Dev/>";
    const scrambledText = useTextScramble(targetScrambleText);

    const statusSequence = [
        { p: 0, text: "Booting system..." }, { p: 20, text: "Loading modules..." },
        { p: 45, text: "Decrypting assets..." }, { p: 70, text: "Authenticating user..." },
        { p: 95, text: "Finalizing..." },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isLuminMode) return;
            keySequence.current += e.key.toUpperCase();
            if (keySequence.current.length > secretCode.length) {
                keySequence.current = keySequence.current.slice(-secretCode.length);
            }
            if (keySequence.current === secretCode) setIsLuminMode(true);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLuminMode]);

    useEffect(() => {
        if (isLuminMode) return;
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                const next = prev + 1;
                const currentStatus = statusSequence.find(s => s.p === next);
                if (currentStatus) setStatusText(currentStatus.text);
                return next;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [isLuminMode]);

    useEffect(() => {
        if (progress >= 100) {
            setStatusText(isLuminMode ? "Illumination Protocol: Activated." : "System ready. Welcome.");
            const finishTimer = setTimeout(() => {
                setIsDone(true); 
                const completeTimer = setTimeout(onComplete, 600);
                return () => clearTimeout(completeTimer);
            }, 1200);
            return () => clearTimeout(finishTimer);
        }
    }, [progress, onComplete, isLuminMode]);
    
    useEffect(() => {
        if (isLuminMode) {
            const fastFill = setInterval(() => {
                setProgress(prev => {
                    const next = prev + 5;
                    if (next >= 100) { clearInterval(fastFill); return 100; }
                    return next;
                });
            }, 30);
            return () => clearInterval(fastFill);
        }
    }, [isLuminMode]);

    const theme = isLuminMode ? {
        textColor: 'text-yellow-300', borderColor: 'border-yellow-300/20', shadowColor: 'shadow-yellow-300/20',
        bgColor: 'bg-yellow-400', bgGlow: 'shadow-[0_0_15px_rgba(252,211,77,0.8)]', bgContainer: 'bg-gray-900/30',
        bgProgress: 'bg-yellow-900/50'
    } : {
        textColor: 'text-cyan-400', borderColor: 'border-cyan-400/10', shadowColor: 'shadow-cyan-500/10',
        bgColor: 'bg-cyan-400', bgGlow: 'shadow-[0_0_10px_rgba(34,211,238,0.7)]', bgContainer: 'bg-black/30',
        bgProgress: 'bg-cyan-900/50'
    };

    return (
     // === PERUBAHAN 1: Menambah padding `px-4` agar kotak tidak menempel di tepi layar HP ===
     <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ease-in-out px-4 ${isDone ? 'opacity-0' : 'opacity-100'} ${isLuminMode ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/30 via-black to-black' : ''}`}>
        
        {/* === PERUBAHAN 2: Padding dan Spacing dibuat responsif === */}
        <div className={`w-full max-w-lg rounded-lg ${theme.bgContainer} backdrop-blur-sm border ${theme.borderColor} shadow-2xl ${theme.shadowColor} transition-all duration-700 space-y-6 sm:space-y-8 p-4 sm:p-8`}>
            
            {/* === PERUBAHAN 3: Ukuran font dibuat responsif === */}
            <div className={`text-center font-mono font-bold ${theme.textColor} transition-colors duration-700 text-2xl sm:text-3xl md:text-4xl`}>
                {scrambledText}
            </div>

            <div>
                <div className="flex justify-between items-center text-sm font-mono text-gray-400 mb-2">
                    <span>{statusText}<span className="animate-pulse">_</span></span>
                    <span>{progress}%</span>
                </div>
                <div className={`w-full h-2 ${theme.bgProgress} rounded-full overflow-hidden`}>
                    <div 
                        className={`h-full ${theme.bgColor} rounded-full ${theme.bgGlow} transition-all duration-150 ease-linear`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
     </div>
    );    
};

export default LoadingScreen;