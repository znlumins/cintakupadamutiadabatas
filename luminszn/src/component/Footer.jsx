import React, { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { FaGithub, FaInstagram, FaWhatsapp, FaTwitter, FaDiscord, FaTimes, FaCamera, FaDownload, FaSync, FaPhotoVideo } from "react-icons/fa";

// Pastikan path ini benar dan file 'input_file_0.png' adalah versi yang transparan.
import templateImage from '../pct/input_file_0.png'; 

// --- DATA UNTUK FOOTER ---
const socialLinks = [
  { href: 'https://github.com/GipsyDanger-dev', Icon: FaGithub, name: 'GitHub' },
  { href: 'https://www.instagram.com/adam_akmal18/?hl=id', Icon: FaInstagram, name: 'Instagram' },
  { href: 'https://discordapp.com/users/747396909399801856', Icon: FaDiscord, name: 'Discord' },
  { href: 'https://x.com/AdamF184953', Icon: FaTwitter, name: 'Twitter' },
  { href: 'https://wa.me/6281229497848', Icon: FaWhatsapp, name: 'WhatsApp' },
];

const apiEndpoints = Array(30).fill("GipsyDanger-dev™");

// --- DATA UNTUK EASTER EGG ---
const creators = [
  { name: 'GipsyDanger-dev (Adam Fairuz)', role: 'Lead Developer & Designer', link: 'https://github.com/GipsyDanger-dev' },
  { name: 'znlumins (Daffa Ahmad Al Attas)', role: 'Front-End Refinement & UI/UX', link: 'https://github.com/znlumins' },
  { name: 'Gemini AI by Google', role: 'Code Assistant & Idea Generator', link: null },
];


// --- Komponen Modal untuk Easter Egg "Credits" ---
const CreditsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="relative bg-gray-800/80 backdrop-blur-lg border border-gray-100/10 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <FaTimes size={20} />
        </button>
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dibuat Oleh</h3>
        <div className="space-y-3">
          {creators.map(creator => (
            <div key={creator.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="font-semibold text-lg text-white">{creator.name}</p>
                <p className="text-sm text-gray-400">{creator.role}</p>
              </div>
              {creator.link && (
                <a 
                  href={creator.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-md transition-colors duration-200"
                  aria-label={`Lihat profil GitHub ${creator.name}`}
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// === KOORDINAT BARU YANG SUDAH DIKALIBRASI ULANG ===
const PHOTO_SLOTS = [
  { x: 226, y: 278, w: 1658, h: 922 },
  { x: 226, y: 1414, w: 1658, h: 922 },
  { x: 190, y: 2570, w: 1740, h: 960 },
  { x: 190, y: 3712, w: 1740, h: 960 },
];


// --- Helper function untuk logika "cover" (Logika ini sudah benar) ---
function drawAndCover(ctx, img, slot) {
  const { x, y, w, h } = slot;
  const imgRatio = img.width / img.height;
  const slotRatio = w / h;
  let newWidth, newHeight, newX, newY;
  if (imgRatio > slotRatio) {
    newHeight = h;
    newWidth = newHeight * imgRatio;
    newX = x - (newWidth - w) / 2;
    newY = y;
  } else {
    newWidth = w;
    newHeight = newWidth / imgRatio;
    newY = y - (newHeight - h) / 2;
    newX = x;
  }
  ctx.drawImage(img, newX, newY, newWidth, newHeight);
}


// --- Komponen Photo Booth FINAL ---
const PhotoStripModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const PHOTO_COUNT = 4;
  const [captureState, setCaptureState] = useState('idle');
  const [captures, setCaptures] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [finalImage, setFinalImage] = useState(null);

  const modalAnimationStyle = `
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes zoomInOut { 0% { transform: scale(0.8); opacity: 0; } 40% { transform: scale(1.2); opacity: 1; } 80% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0; } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    .animate-fade-out { animation: fadeOut 0.3s ease-out forwards; }
    .animate-zoom-in-out { animation: zoomInOut 1s ease-in-out forwards; }
  `;
  
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) { setError("Kamera tidak dapat diakses."); }
    };
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, []);

  useEffect(() => {
    let intervalId;
    if (captureState === 'countdown') {
      setCountdown(3);
      intervalId = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [captureState]);

  useEffect(() => {
    if (countdown === 0) handleCapture();
  }, [countdown]);
  
  useEffect(() => {
    if (captures.length === 0) return;
    if (captures.length === PHOTO_COUNT) {
      setCaptureState('generating');
      setTimeout(() => createFinalImage(), 500);
    } else {
      setCaptureState('countdown');
    }
  }, [captures]);

  const startPhotoSession = () => {
    setError(null);
    setFinalImage(null);
    setCaptures([]);
    setCaptureState('countdown');
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    setCaptureState('capturing');
    setTimeout(() => {
      const tempCanvas = document.createElement('canvas');
      const video = videoRef.current;
      tempCanvas.width = video.videoWidth;
      tempCanvas.height = video.videoHeight;
      const context = tempCanvas.getContext('2d');
      context.translate(tempCanvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
      const newCapture = tempCanvas.toDataURL('image/jpeg', 0.9);
      setCaptures(prev => [...prev, newCapture]);
    }, 200);
  };
  
  const createFinalImage = async () => {
    try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const template = new Image();
        template.src = templateImage; 
        
        template.onload = async () => {
            canvas.width = template.width;
            canvas.height = template.height;

            const loadedCaptures = await Promise.all(
                captures.map(src => new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                }))
            );

            // LANGKAH 1: Gambar dulu FOTO Anda ke kanvas sesuai slotnya
            loadedCaptures.forEach((userPhoto, index) => {
                const slot = PHOTO_SLOTS[index];
                if (slot) {
                    drawAndCover(ctx, userPhoto, slot);
                }
            });
            
            // LANGKAH 2: TIMPA semuanya dengan TEMPLATE sebagai lapisan paling atas
            ctx.drawImage(template, 0, 0);

            setFinalImage(canvas.toDataURL('image/png'));
            setCaptureState('final');
        };
        
        template.onerror = () => {
             setError("Gagal memuat file template.");
             setCaptureState('idle');
        }

    } catch (err) {
        setError("Gagal membuat gambar akhir.");
        setCaptureState('idle');
    }
  };

  const handleReset = () => {
    setCaptures([]);
    setFinalImage(null);
    setError(null);
    setCaptureState('idle');
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = finalImage;
    link.download = `techfair-photobooth-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClose = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    onClose();
  };

  return (
    <>
      <style>{modalAnimationStyle}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in p-4" onClick={handleClose}>
        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white flex flex-col max-h-[95vh]" onClick={e => e.stopPropagation()}>
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"><FaTimes size={22} /></button>
          <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-500 bg-clip-text text-transparent text-center flex-shrink-0">Tech Fair Photo Booth</h3>
          
          <div className="flex-1 relative min-h-0 w-full bg-black/30 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden">
            {error && <div className="text-center text-red-400 p-4">{error}</div>}
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-opacity duration-300 ${captureState === 'final' ? 'opacity-0' : 'opacity-100'}`} style={{ transform: 'scaleX(-1)' }}></video>
            {finalImage && captureState === 'final' && !error && (
              <div className="absolute inset-0 flex justify-center items-center p-2 bg-gray-800">
                <img src={finalImage} alt="Hasil Photo Booth" className="max-h-full w-auto object-contain shadow-2xl"/>
              </div>
            )}
            {captureState === 'countdown' && countdown > 0 && (
                <div key={countdown} className="absolute inset-0 flex items-center justify-center bg-black/50 text-9xl font-bold text-white animate-zoom-in-out">{countdown}</div>
            )}
            {captureState === 'capturing' && <div className="absolute inset-0 bg-white animate-fade-out"></div>}
            {captureState === 'generating' && <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-10"><div className="w-8 h-8 border-4 border-t-blue-500 border-gray-600 rounded-full animate-spin"></div><p className="mt-4">Menempelkan ke template...</p></div>}
          </div>
          
          <div className="pt-4 flex-shrink-0">
            <div className={`grid grid-cols-4 gap-2`}>
              {Array(PHOTO_COUNT).fill(0).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-black/20 rounded border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                  {captures[i] ? <img src={captures[i]} alt={`Capture ${i+1}`} className="w-full h-full object-cover rounded-sm" /> : <FaPhotoVideo className="text-gray-500"/>}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center items-center space-x-4 h-12">
              {(captureState === 'idle' || error) && <button onClick={error ? handleReset : startPhotoSession} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-200"><FaCamera size={20}/><span>{error ? 'Coba Lagi' : 'Ambil Foto'}</span></button>}
              {captureState === 'final' && !error && (
                <>
                  <button onClick={handleReset} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"><FaSync /><span>Ulangi</span></button>
                  <button onClick={handleDownload} className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg"><FaDownload /><span>Unduh</span></button>
                </>
              )}
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      </div>
    </>
  );
};


// --- Komponen Utama Footer ---
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
      <div className="py-3 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700/50">
        <Marquee gradient={false} speed={50}>
          {apiEndpoints.map((api, index) => (
            <code key={index} className="text-gray-500 dark:text-gray-400 text-sm mx-8">{api}</code>
          ))}
        </Marquee>
      </div>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 cursor-pointer select-none" onClick={handleCopyrightClick} title="Sesuatu yang tersembunyi... (atau coba Konami code?)">
            © 2025 <a href="https://github.com/GipsyDanger-dev" className="hover:underline">GipsyDanger-dev™</a>. All Rights Reserved.
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