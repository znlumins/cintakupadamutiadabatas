import React, { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import {
    FaGithub, FaInstagram, FaWhatsapp, FaTwitter, FaDiscord, FaTimes, FaCamera,
    FaDownload, FaSync, FaPhotoVideo
} from "react-icons/fa";

// --- KOMPONEN BARU: LYRICS TICKER DENGAN HIGHLIGHT ---
// Ini adalah implementasi dari Ide 2 yang direkomendasikan.
const LyricsTicker = () => {
  // Data lirik dengan penanda untuk highlighting
  const lyricsData = [
    { text: "Tomorrow, try asking to leave early", highlight: false },
    { text: "Just say someone’s feeling sick", highlight: false },
    { text: "’Cause you’re not some assembly line", highlight: false },
    { text: "Do what you want right now", highlight: true },
    { text: "When your heart moves, don’t hold it down", highlight: true },
    { text: "This life has no meaning", highlight: false },
    { text: "So you’re free to write your own meaning alone", highlight: false },
    { text: "Dance, you’re the king of the world", highlight: true },
    { text: "This career means nothing at all", highlight: false },
    { text: "Dance, you’re the queen of the world", highlight: true },
    { text: "This life means nothing at all", highlight: false },
    { text: "Prioritize yourself for the rest of your life", highlight: true },
  ];

  return (
    <div className="flex items-center text-lg font-semibold whitespace-nowrap cursor-default">
      {lyricsData.map((item, index) => (
        <React.Fragment key={index}>
          <span className={`px-8 transition-colors ${
            item.highlight
              ? 'text-cyan-300 font-bold' // Gaya untuk lirik yang di-highlight
              : 'text-gray-400 hover:text-white' // Gaya untuk lirik normal
          }`}>
            {item.text}
          </span>
          {/* Separator visual antar baris lirik */}
          <span className="text-gray-600 text-2xl font-light select-none">/</span>
        </React.Fragment>
      ))}
    </div>
  );
};


// --- DATA-DATA & KOMPONEN LAINNYA (TIDAK BERUBAH) ---
const socialLinks = [
  { href: 'https://github.com/znlumins', Icon: FaGithub, name: 'GitHub' },
  { href: 'https://www.instagram.com/dfaahm/', Icon: FaInstagram, name: 'Instagram' },
  { href: 'https://x.com/zen_luminscent', Icon: FaTwitter, name: 'Twitter' },
  { href: 'https://wa.me/6281358939283', Icon: FaWhatsapp, name: 'WhatsApp' },
];

const creators = [
  { name: 'znlumins.dev (Daffa Ahmad Al Attas)', role: 'Lead Developer & Designer', link: 'https://github.com/znlumins' },
  { name: 'GipsyDanger-dev (Adam Fairuz)', role: 'Initial Concept & Contributor', link: 'https://github.com/GipsyDanger-dev' },
  { name: 'Gemini AI by Google', role: 'Code Assistant & Idea Generator', link: null },
];

const CreditsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative bg-gray-800/80 backdrop-blur-lg border border-gray-100/10 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><FaTimes size={20} /></button>
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dibuat Oleh</h3>
        <div className="space-y-3">
          {creators.map(creator => (
            <div key={creator.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="font-semibold text-lg text-white">{creator.name}</p>
                <p className="text-sm text-gray-400">{creator.role}</p>
              </div>
              {creator.link && <a href={creator.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-md transition-colors duration-200" aria-label={`Lihat profil GitHub ${creator.name}`}><FaGithub /><span>GitHub</span></a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function drawAndCover(ctx, img, slot) {const { x, y, w, h } = slot; const imgRatio = img.width / img.height; const slotRatio = w / h; let newWidth, newHeight, newX, newY; if (imgRatio > slotRatio) { newHeight = h; newWidth = newHeight * imgRatio; newX = x - (newWidth - w) / 2; newY = y; } else { newWidth = w; newHeight = newWidth / imgRatio; newY = y - (newHeight - h) / 2; newX = x; } ctx.drawImage(img, newX, newY, newWidth, newHeight);}
const PhotoStripModal = ({ onClose }) => { const videoRef = useRef(null); const canvasRef = useRef(null); const [error, setError] = useState(null); const PHOTO_COUNT = 3; const [captureState, setCaptureState] = useState('idle'); const [captures, setCaptures] = useState([]); const [countdown, setCountdown] = useState(3); const [finalImage, setFinalImage] = useState(null); const modalAnimationStyle = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } } @keyframes zoomInOut { 0% { transform: scale(0.8); opacity: 0; } 40% { transform: scale(1.2); opacity: 1; } 80% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0; } } .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; } .animate-fade-out { animation: fadeOut 0.3s ease-out forwards; } .animate-zoom-in-out { animation: zoomInOut 1s ease-in-out forwards; }`; useEffect(() => { let mediaStream; const startCamera = async () => { try { mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } }); if (videoRef.current) { videoRef.current.srcObject = mediaStream; } } catch (err) { setError("Kamera tidak dapat diakses. Izinkan akses kamera pada browser Anda."); } }; startCamera(); return () => { if (mediaStream) { mediaStream.getTracks().forEach(track => track.stop()); } }; }, []); useEffect(() => { if (captureState !== 'countdown') return; if (countdown <= 0) { handleCapture(); return; } const timerId = setTimeout(() => { setCountdown(prev => prev - 1); }, 1000); return () => clearTimeout(timerId); }, [captureState, countdown]); const startPhotoSession = () => { setError(null); setFinalImage(null); setCaptures([]); setCountdown(3); setCaptureState('countdown'); }; const handleCapture = () => { if (!videoRef.current) return; setCaptureState('capturing'); setTimeout(() => { const tempCanvas = document.createElement('canvas'); const video = videoRef.current; tempCanvas.width = video.videoWidth; tempCanvas.height = video.videoHeight; const context = tempCanvas.getContext('2d'); context.translate(tempCanvas.width, 0); context.scale(-1, 1); context.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height); const newCapture = tempCanvas.toDataURL('image/jpeg', 0.9); const updatedCaptures = [...captures, newCapture]; setCaptures(updatedCaptures); if (updatedCaptures.length < PHOTO_COUNT) { setCountdown(3); setCaptureState('countdown'); } else { setCaptureState('generating'); setTimeout(() => createFinalImage(updatedCaptures), 500); } }, 200); }; const createFinalImage = async (finalCaptures) => { try { const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); const canvasWidth = 600; const canvasHeight = 2200; const padding = 40; canvas.width = canvasWidth; canvas.height = canvasHeight; ctx.fillStyle = '#181A1B'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; ctx.lineWidth = 1; for (let i = 0; i < canvas.width; i += 20) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); } for (let i = 0; i < canvas.height; i += 20) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); } ctx.textAlign = 'center'; const accentColor = '#00FF9C'; ctx.font = '700 16px "JetBrains Mono", monospace'; ctx.fillStyle = '#FFD700'; ctx.fillText("// SYS_FLAG: EASTER_EGG_UNLOCKED", canvasWidth / 2, 60); ctx.font = '700 48px "Space Grotesk", sans-serif'; ctx.fillStyle = '#FFFFFF'; ctx.fillText("SESSION_CAPTURE_LOG", canvasWidth / 2, 110); ctx.font = '400 18px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; ctx.fillText("// znlumins.dev", canvasWidth / 2, 150); const loadedCaptures = await Promise.all( finalCaptures.map(src => new Promise(resolve => { const img = new Image(); img.src = src; img.onload = () => resolve(img); img.onerror = () => resolve(null); })) ); const headerSpace = 220; const footerSpace = 130; const photoAreaHeight = canvasHeight - headerSpace - footerSpace; const gap = 40; const photoWidth = canvasWidth - (2 * padding); const photoHeight = (photoAreaHeight - (2 * gap)) / 3; const photoSlots = [ { x: padding, y: headerSpace, w: photoWidth, h: photoHeight }, { x: padding, y: headerSpace + photoHeight + gap, w: photoWidth, h: photoHeight }, { x: padding, y: headerSpace + (photoHeight + gap) * 2, w: photoWidth, h: photoHeight }, ]; loadedCaptures.forEach((userPhoto, index) => { if (userPhoto) { const slot = photoSlots[index]; ctx.textAlign = 'left'; ctx.font = '700 16px "JetBrains Mono", monospace'; ctx.fillStyle = accentColor; ctx.fillText(`> [IMG_SEQUENCE_0${index + 1}]`, slot.x, slot.y - 15); ctx.save(); ctx.beginPath(); ctx.rect(slot.x, slot.y, slot.w, slot.h); ctx.clip(); drawAndCover(ctx, userPhoto, slot); ctx.restore(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 2; ctx.strokeRect(slot.x, slot.y, slot.w, slot.h); } }); const logDate = new Date().toISOString().split('T')[0]; const logTime = new Date().toTimeString().split(' ')[0]; ctx.textAlign = 'center'; ctx.font = '400 16px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; ctx.fillText("> ACCESS_METHOD: MANUAL_OVERRIDE", canvasWidth/2, canvasHeight - 90); ctx.fillStyle = accentColor; ctx.fillText(`LOG_TIME: ${logDate}#${logTime}`, canvasWidth / 2, canvasHeight - 65); ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; ctx.fillText("...SESSION TERMINATED", canvasWidth / 2, canvasHeight - 40); setFinalImage(canvas.toDataURL('image/png')); setCaptureState('final'); } catch (err) { console.error("Error creating image:", err); setError("Gagal membuat gambar akhir."); setCaptureState('idle'); } }; const handleReset = () => { setCaptures([]); setFinalImage(null); setCaptureState('idle'); }; const handleDownload = () => { if (!finalImage) return; const link = document.createElement('a'); link.href = finalImage; link.download = `photostrip-znlumins-dev-${Date.now()}.png`; document.body.appendChild(link); link.click(); document.body.removeChild(link); }; const handleClose = () => onClose(); return (<><style>{modalAnimationStyle}</style><div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in" onClick={handleClose}><div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}><button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"><FaTimes size={22} /></button><canvas ref={canvasRef} style={{ display: 'none' }} />{captureState === 'final' && finalImage ? (<div className="flex flex-col items-center w-full animate-fade-in"><h3 className="text-2xl font-bold mb-4 text-white">Your Photo Strip!</h3><img src={finalImage} alt="Final photo strip" className="rounded-lg border-2 border-gray-600 max-h-[60vh] object-contain mb-6"/><div className="flex space-x-4"><button onClick={handleDownload} className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-transform hover:scale-105"><FaDownload /><span>Download</span></button><button onClick={handleReset} className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition-transform hover:scale-105"><FaSync /><span>Coba Lagi</span></button></div></div>) : (<>{<div className="w-full aspect-video relative flex items-center justify-center bg-black rounded-lg overflow-hidden">{error && <div className="text-center text-red-400 p-4">{error}</div>}{!error && <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />}{captureState === 'countdown' && (<div className="absolute inset-0 flex items-center justify-center bg-black/50"><span key={countdown} className="text-9xl font-bold text-white animate-zoom-in-out">{countdown > 0 ? countdown : ''}</span></div>)}{captureState === 'capturing' && <div className="absolute inset-0 bg-white animate-fade-out"></div>}{captureState === 'generating' && (<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"><FaPhotoVideo className="text-white text-5xl animate-pulse" /><p className="text-white mt-4 text-lg">Membuat gambar...</p></div>)}</div>}{captureState === 'idle' && !error && (<button onClick={startPhotoSession} className="mt-6 flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105"><FaCamera /><span>Mulai Sesi Foto</span></button>)}{['countdown', 'capturing', 'generating'].includes(captureState) && (<div className="flex space-x-3 mt-4 h-14">{[...Array(PHOTO_COUNT)].map((_, i) => (<div key={i} className={`w-10 rounded border-2 transition-all ${i < captures.length ? 'bg-green-500/50 border-green-400' : 'bg-gray-700/50 border-gray-600'}`}>{captures[i] && <img src={captures[i]} alt={`Capture ${i+1}`} className="w-full h-full object-cover rounded-sm transform -scale-x-100" />}</div>))}</div>)}</>)}</div></div></>); };


// --- KOMPONEN UTAMA FOOTER (DENGAN PERUBAHAN) ---
export const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickTimeout = useRef(null);
  const CLICKS_TO_TRIGGER = 7;

  const [isPhotoBoothOpen, setIsPhotoBoothOpen] = useState(false);
  const konamiSequence = useRef([]);
  const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

  useEffect(() => {
    if (clickCount > 0) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => { setClickCount(0); }, 2000);
    }
    return () => clearTimeout(clickTimeout.current);
  }, [clickCount]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (konamiCode.includes(key)) {
        konamiSequence.current.push(key);
        if (konamiSequence.current.length > konamiCode.length) konamiSequence.current.shift();
        if (JSON.stringify(konamiSequence.current) === JSON.stringify(konamiCode)) {
          setIsPhotoBoothOpen(true);
          konamiSequence.current = [];
        }
      } else {
        konamiSequence.current = [];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === CLICKS_TO_TRIGGER) {
      setIsModalOpen(true);
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="py-3 bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50 overflow-hidden">
        <Marquee gradient={true} gradientColor={[17, 24, 39]} gradientWidth={50} speed={50} pauseOnHover={true}>
          {/* Menggunakan komponen LyricsTicker yang sudah disempurnakan */}
          <LyricsTicker />
          {/* Duplikat untuk memastikan loop berjalan mulus */}
          <LyricsTicker />
        </Marquee>
      </div>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 cursor-pointer select-none" onClick={handleCopyrightClick} title="Sesuatu yang tersembunyi... (atau coba Konami code?)">
            © 2025 <a href="https://github.com/znlumins" className="hover:underline">znlumins.dev™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            {socialLinks.map(({ href, Icon, name }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-white transition-transform hover:scale-110">
                <Icon className="w-5 h-5" /><span className="sr-only">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {isModalOpen && <CreditsModal onClose={() => setIsModalOpen(false)} />}
      {isPhotoBoothOpen && <PhotoStripModal onClose={() => setIsPhotoBoothOpen(false)} />}
    </footer>
  );
};

export default Footer;