import { RevealOnScroll } from "../RevealOnScroll";
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects, SiBlender, SiFigma } from 'react-icons/si';
import { useState, useRef } from 'react';

// --- DATA ---
const skills = [
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Illustrator", icon: <SiAdobeillustrator /> },
  { name: "Premiere Pro", icon: <SiAdobepremierepro /> },
  { name: "After Effects", icon: <SiAdobeaftereffects /> },
  { name: "Blender", icon: <SiBlender /> },
  { name: "Figma", icon: <SiFigma /> },
];

// --- KOMPONEN-KOMPONEN ---
const SpotlightCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setStyle({ '--spotlight-x': `${x}px`, '--spotlight-y': `${y}px` });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      style={style}
      className={`relative bg-gray-900/60 p-8 rounded-2xl border border-white/10 transition-all duration-300 group flex flex-col ${className}`}
    >
      {children}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(450px circle at var(--spotlight-x) var(--spotlight-y), hsla(200, 100%, 70%, 0.15), transparent 80%)` }}
      ></div>
    </div>
  );
};

// --- KOMPONEN UTAMA "ABOUT" ---
export const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-16 px-4 sm:py-24 bg-modern-dark">
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto">
          <SpotlightCard className="text-center p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Halo, saya Daffa! Sebagai seorang mahasiswa Teknologi Informasi, saya memiliki komitmen tinggi dan sangat tertarik untuk menuangkan ide-ide kreatif ke dalam bentuk visual. Saya selalu bersemangat untuk belajar, berkembang, dan berkolaborasi dalam tim untuk mencapai tujuan bersama.
            </p>
            <div className="mt-12">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-8">My Skillset</h3>
              <div className="flex justify-center flex-wrap gap-x-6 gap-y-8 sm:gap-x-8">
                {skills.map((skill) => (
                  <div key={skill.name} className="group/skill flex flex-col items-center justify-center text-center w-20 sm:w-24">
                    <div
                      className="text-3xl sm:text-4xl text-gray-400 group-hover/skill:text-cyan-400 transition-all duration-300 group-hover/skill:scale-110 group-hover/skill:-translate-y-1"
                    >
                      {skill.icon}
                    </div>
                    <span
                      className="mt-3 font-medium text-gray-400 group-hover/skill:text-white text-sm transition-colors duration-300"
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default About;