import React, { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { 
  FaGithub, FaInstagram, FaWhatsapp, FaTwitter, FaDiscord, FaTimes, FaCamera, 
  FaDownload, FaSync, FaPhotoVideo, FaCodeBranch, FaStar, FaPlus 
} from "react-icons/fa";

// --- KOMPONEN GITHUB ACTIVITY TICKER (DIPERBAIKI UNTUK VITE) ---
const GitHubActivityTicker = () => {
  const GITHUB_USERNAME = "znlumins";

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      // Membaca token dari import.meta.env (untuk Vite)
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

      if (!GITHUB_TOKEN) {
        setError("GitHub token tidak ditemukan. Pastikan file .env memiliki VITE_GITHUB_TOKEN dan server sudah di-restart.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`
            }
          }
        );
        if (response.status === 403) {
            throw new Error('Limit permintaan API GitHub terlampaui. Coba lagi dalam beberapa menit.');
        }
        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }
        const data = await response.json();
        
        const filteredData = data.filter(event => 
          event.type === 'PushEvent' || 
          (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') ||
          event.type === 'WatchEvent'
        ).slice(0, 10);

        setActivities(filteredData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    const intervalId = setInterval(fetchActivities, 300000); // Refresh setiap 5 menit

    return () => clearInterval(intervalId);
  }, []);

  const renderEvent = (event) => {
    const repoName = event.repo.name.split('/')[1];
    switch (event.type) {
      case 'PushEvent':
        const commitMsg = event.payload.commits[0]?.message || 'No commit message';
        return (
          <>
            <FaCodeBranch className="text-cyan-400 flex-shrink-0" />
            <span className="ml-2 font-bold text-gray-200">COMMIT</span>
            <span className="ml-2 text-gray-400">to</span>
            <span className="ml-2 font-semibold text-green-400">{repoName}</span>
            <span className="ml-3 text-gray-500 italic">"{truncate(commitMsg, 40)}"</span>
          </>
        );
      case 'CreateEvent':
        return (
          <>
            <FaPlus className="text-green-400 flex-shrink-0" />
            <span className="ml-2 font-bold text-gray-200">CREATED REPO</span>
            <span className="ml-2 font-semibold text-green-400">{repoName}</span>
          </>
        );
      case 'WatchEvent':
        return (
          <>
            <FaStar className="text-yellow-400 flex-shrink-0" />
            <span className="ml-2 font-bold text-gray-200">STARRED</span>
            <span className="ml-2 font-semibold text-green-400">{repoName}</span>
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-sm mx-8">Memuat aktivitas GitHub @{GITHUB_USERNAME}...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-sm mx-8">{error}</div>;
  }
  
  if (activities.length === 0) {
      return <div className="text-gray-500 text-sm mx-8">Tidak ada aktivitas publik terbaru dari @{GITHUB_USERNAME}.</div>
  }

  return (
    <div className="flex">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center mx-6 text-sm font-mono whitespace-nowrap">
          {renderEvent(activity)}
        </div>
      ))}
    </div>
  );
};


// --- DATA-DATA & KOMPONEN LAINNYA ---
const socialLinks = [
  { href: 'https://github.com/znlumins', Icon: FaGithub, name: 'GitHub' },
  { href: 'https://www.instagram.com/adam_akmal18/?hl=id', Icon: FaInstagram, name: 'Instagram' },
  { href: 'https://discordapp.com/users/747396909399801856', Icon: FaDiscord, name: 'Discord' },
  { href: 'https://x.com/AdamF184953', Icon: FaTwitter, name: 'Twitter' },
  { href: 'https://wa.me/6281229497848', Icon: FaWhatsapp, name: 'WhatsApp' },
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

const PhotoStripModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const PHOTO_COUNT = 3;
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
      const canvasWidth = 600;
      const canvasHeight = 2200;
      const padding = 40;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = '#181A1B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      ctx.textAlign = 'center';
      const accentColor = '#00FF9C';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText("// SYS_FLAG: EASTER_EGG_UNLOCKED", canvasWidth / 2, 60);
      ctx.font = '700 48px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("SESSION_CAPTURE_LOG", canvasWidth / 2, 110);
      ctx.font = '400 18px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText("// znlumins.dev", canvasWidth / 2, 150);
      const loadedCaptures = await Promise.all(
        captures.map(src => new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
        }))
      );
      const headerSpace = 220;
      const footerSpace = 130;
      const photoAreaHeight = canvasHeight - headerSpace - footerSpace;
      const gap = 40;
      const photoWidth = canvasWidth - (2 * padding);
      const photoHeight = (photoAreaHeight - (2 * gap)) / 3;
      const photoSlots = [
        { x: padding, y: headerSpace, w: photoWidth, h: photoHeight },
        { x: padding, y: headerSpace + photoHeight + gap, w: photoWidth, h: photoHeight },
        { x: padding, y: headerSpace + (photoHeight + gap) * 2, w: photoWidth, h: photoHeight },
      ];
      loadedCaptures.forEach((userPhoto, index) => {
        if (userPhoto) {
          const slot = photoSlots[index];
          ctx.textAlign = 'left';
          ctx.font = '700 16px "JetBrains Mono", monospace';
          ctx.fillStyle = accentColor;
          ctx.fillText(`> [IMG_SEQUENCE_0${index + 1}]`, slot.x, slot.y - 15);
          ctx.save();
          ctx.beginPath();
          ctx.rect(slot.x, slot.y, slot.w, slot.h);
          ctx.clip();
          drawAndCover(ctx, userPhoto, slot);
          ctx.restore();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 2;
          ctx.strokeRect(slot.x, slot.y, slot.w, slot.h);
        }
      });
      const logDate = new Date().toISOString().split('T')[0];
      const logTime = new Date().toTimeString().split(' ')[0];
      ctx.textAlign = 'center';
      ctx.font = '400 16px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText("> ACCESS_METHOD: MANUAL_OVERRIDE", canvasWidth/2, canvasHeight - 90);
      ctx.fillStyle = accentColor;
      ctx.fillText(`LOG_TIME: ${logDate}#${logTime}`, canvasWidth / 2, canvasHeight - 65);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText("...SESSION TERMINATED", canvasWidth / 2, canvasHeight - 40);
      setFinalImage(canvas.toDataURL('image/png'));
      setCaptureState('final');
    } catch (err) {
      console.error("Error creating image:", err);
      setError("Gagal membuat gambar akhir.");
      setCaptureState('idle');
    }
  };

  const handleReset = () => { /* ... */ };
  const handleDownload = () => { /* ... */ };
  const handleClose = () => { /* ... */ };

  return (
    // JSX untuk modal photostrip
    <></>
  );
};


// --- KOMPONEN UTAMA FOOTER ---
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
      <div className="py-3 bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <GitHubActivityTicker />
          <GitHubActivityTicker /> 
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