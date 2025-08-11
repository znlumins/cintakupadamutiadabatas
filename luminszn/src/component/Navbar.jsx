import { useState, useEffect } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          {/* 
            ↓↓↓ PERUBAHAN 1: Tambahkan kelas "relative" di sini ↓↓↓
          */}
          <div className="relative flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="font-mono text-xl font-bold text-white z-50">
              Zn<span className="text-blue-500">lumins.dev</span>
            </a>

            {/* 
              ↓↓↓ PERUBAHAN 2: Ubah kelas untuk menu navigasi di sini ↓↓↓
              Menghapus: "flex-grow", "justify-center"
              Menambahkan: "absolute", "left-1/2", "top-1/2", "-translate-x-1/2", "-translate-y-1/2"
            */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            <div className="hidden md:flex items-center z-50">
              <a
                href="/cv-gipsy.pdf"
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

      {/* Menu Overlay untuk Mobile */}
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
            href="/cv-gipsy.pdf"
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