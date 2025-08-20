import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Link Unsplash yang stabil
const galleryImages = [
  {
    src: 'https://i.ibb.co.com/CprX459S/2025-02-18-11-33-IMG-0281.jpg?q=80&w=1648&auto=format=fit=crop',
    alt: 'Abstract dark background with glowing tech lines'
  },
  {
    src: 'https://i.ibb.co.com/Txfxy9sn/DSC00825.jpg?q=80&w=1648&auto=format=fit',
    alt: 'React code on a monitor with a reflective logo'
  },
  {
    src: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=1740&auto=format=crop',
    alt: 'Abstract blue and purple network plexus'
  }
];

export const Home = () => {
  const [isReady, setIsReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .swiper-pagination-bullet-active { background-color: #3b82f6 !important; }

        @keyframes moveAurora {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }

        .final-bg {
          background-color: #000;
          position: relative;
          isolation: isolate;
          background-image: 
            radial-gradient(at 20% 25%, hsla(268, 75%, 50%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, hsla(212, 100%, 50%, 0.15) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: moveAurora 20s ease-in-out infinite alternate;
        }
        
        .final-bg::before {
          content: '';
          position: absolute; inset: 0;
          z-index: -2;
          
          /* === PERUBAHAN DI SINI === */
          background-image: 
            /* Gradasi hitam halus di bagian bawah */
            linear-gradient(to top, hsla(0, 0%, 0%, 1) 0%, transparent 60%),
            
            /* Grid pertama (duplikat) */
            linear-gradient(to right, hsla(210, 30%, 80%, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(210, 30%, 80%, 0.04) 1px, transparent 1px),

            /* Grid kedua (asli) */
            linear-gradient(to right, hsla(210, 30%, 80%, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(210, 30%, 80%, 0.04) 1px, transparent 1px);
            
          background-size: 100% 100%, 50px 50px, 50px 50px, 50px 50px, 50px 50px;
        }

        .final-bg::after {
          content: '';
          position: absolute; inset: 0;
          z-index: -1;
          background-image: 
            linear-gradient(to right, hsla(210, 50%, 80%, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(210, 50%, 80%, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(300px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(300px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%);
          transition: mask-image 0.1s ease-out;
        }
      `}</style>
      
      <section 
        id="home" 
        className="final-bg min-h-screen flex items-center overflow-hidden"
        style={{'--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px`}}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* Kolom Kiri */}
            <div 
              className="transition-all duration-500 ease-out"
              style={{ opacity: isReady ? 1 : 0, transform: isReady ? 'translateX(0)' : 'translateX(-20px)' }}
            >
              <div className="p-8 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Hi, I'm znlumins.
                </h1>
                
                <p className="text-gray-400 hidden sm:block text-sm lg:text-base mb-8 max-w-xl mx-auto md:mx-0">
                  Hello, I'm Daffa Ahmad Al Attas. An IT enthusiast with a passion for website development and creating innovative digital solutions. 🚀
                </p>

                <div className="flex flex-row justify-center md:justify-start items-center space-x-4 sm:space-x-6">
                  <a href="#projects" className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-500 ease-out transform hover:scale-110 hover:bg-blue-700">View Projects</a>
                  <a href="#contact" className="border-2 border-white text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-500 ease-out transform hover:scale-110 hover:bg-white hover:text-gray-900">Contact Me</a>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div 
              className="w-full mx-auto transition-all duration-500 ease-out rounded-2xl border border-white/10"
              style={{ transitionDelay: '200ms', opacity: isReady ? 1 : 0, transform: isReady ? 'scale(1)' : 'scale(0.9)', filter: 'drop-shadow(0 0 15px hsla(220, 90%, 60%, 0.2))' }}
            >
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="rounded-2xl"
              >
                {galleryImages.map((image, index) => ( <SwiperSlide key={index}> <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-video"/> </SwiperSlide> ))}
              </Swiper>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;