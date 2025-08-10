import { useState, useEffect } from "react";

export const Navbar = () => {
  // State untuk mengelola status buka/tutup menu (sekarang di dalam komponen ini)
  const [menuOpen, setMenuOpen] = useState(false);

  // Efek untuk mencegah scroll pada body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    // Fungsi cleanup untuk memastikan style dikembalikan jika komponen di-unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Fungsi untuk menutup menu (berguna untuk link pada menu mobile)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Utama */}
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="font-mono text-xl font-bold text-white z-50">
              Gipsy<span className="text-blue-500">.Dev</span>
            </a>

            {/* Menu Navigasi Desktop (Tengah) */}
            <div className="hidden md:flex flex-grow items-center justify-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>

            {/* Tombol Download CV (Kanan) */}
            <div className="hidden md:flex items-center">
              <a
                href="/cv-gipsy.pdf" // GANTI DENGAN PATH CV ANDA
                download
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Download CV
              </a>
            </div>

            {/* Ikon Hamburger untuk Mobile */}
            <div
              className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Overlay untuk Mobile (Hamburger) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-95 z-30 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="#home" className="text-gray-300 hover:text-white text-2xl transition-colors" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" className="text-gray-300 hover:text-white text-2xl transition-colors" onClick={closeMenu}>
            About
          </a>
          <a href="#projects" className="text-gray-300 hover:text-white text-2xl transition-colors" onClick={closeMenu}>
            Projects
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white text-2xl transition-colors" onClick={closeMenu}>
            Contact
          </a>
          <a
            href="/cv-gipsy.pdf" // GANTI DENGAN PATH CV ANDA
            download
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors mt-4"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
};