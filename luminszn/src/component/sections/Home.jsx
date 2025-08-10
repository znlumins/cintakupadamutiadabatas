import { useState, useEffect } from 'react';

export const Home = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Timer ini memicu animasi saat komponen dimuat
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    // --- PERUBAHAN DI SINI ---
    // 1. Menghapus kelas `relative` dan `overflow-hidden` karena tidak lagi diperlukan.
    // 2. Menambahkan kelas `bg-black` untuk latar belakang hitam.
    <section id="home" className="min-h-screen flex items-center justify-center bg-black">
      
      {/* Latar Belakang Video telah dihapus */}
      {/* 
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video autoPlay loop muted playsInline className="object-cover w-full h-full">
            <source src="/videos/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        </div> 
      */}
      
      {/* --- PERUBAHAN DI SINI --- */}
      {/* 1. Menghapus kelas `z-10` karena tidak lagi ada lapisan di bawahnya. */}
      <div className="text-center px-6 sm:px-4">
        {/* Judul */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-500 ease-out"
          style={{ opacity: isReady ? 1 : 0, transform: isReady ? 'translateY(0)' : 'translateY(-20px)' }}
        >
          Hi, I'm Gipsy.Dev
        </h1>
        
        {/* Subteks Adaptif */}
        {/* Versi Singkat Mobile */}
        <p className="text-gray-300 text-sm sm:hidden mb-8 max-w-sm mx-auto transition-all duration-500 ease-out" style={{ transitionDelay: '200ms', opacity: isReady ? 1 : 0, transform: isReady ? 'translateY(0)' : 'translateY(20px)' }}>
          Video editor, developer, dan blockchain enthusiast yang menggabungkan kreativitas dan teknologi untuk menciptakan solusi digital inovatif. 🚀
        </p>
        {/* Versi Lengkap Desktop */}
        <p className="text-gray-300 hidden sm:block sm:text-base lg:text-lg mb-8 max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto transition-all duration-500 ease-out" style={{ transitionDelay: '200ms', opacity: isReady ? 1 : 0, transform: isReady ? 'translateY(0)' : 'translateY(20px)' }}>
          Halo, saya Adam Fairuz Akmal Aryaguna, seorang video editor, developer, dan blockchain enthusiast yang menggabungkan kreativitas dan teknologi dalam setiap proyek. Berpengalaman di Adobe Premiere Pro, After Effects, pengembangan web, dan blockchain. Saya selalu tertarik untuk menciptakan solusi digital inovatif. 🚀
        </p>

        {/* Tombol yang selalu sejajar */}
        <div
          className="flex flex-row justify-center items-center space-x-4 sm:space-x-6"
        >
          <a
            href="#projects"
            className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-500 ease-out transform hover:scale-110 hover:bg-blue-700"
            style={{ transitionDelay: '400ms', opacity: isReady ? 1 : 0, transform: isReady ? 'scale(1)' : 'scale(0.9)' }}
          >
            View Project
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-500 ease-out transform hover:scale-110 hover:bg-white hover:text-gray-900"
            style={{ transitionDelay: '500ms', opacity: isReady ? 1 : 0, transform: isReady ? 'scale(1)' : 'scale(0.9)' }}
          >
            Contact Me
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Home;