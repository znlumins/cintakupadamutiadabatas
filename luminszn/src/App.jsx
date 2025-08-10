import { useState } from 'react';
import './App.css'
import { LoadingScreen } from './component/LoadingScreen'
import { Navbar } from './component/Navbar';
import { MobileMenu } from './component/MobileMenu';
import { Home } from './component/sections/Home';
import { About } from './component/sections/About';
import { Project } from './component/sections/Project';
import { Footer } from './component/Footer';
import { Contact } from './component/sections/Contact';
import "./index.css";
import { SplashCursor } from './component/SplashCursor';



function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
  <>
    {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{""} 
      <div
       className={`relative min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"       
      } bg-black text-gray-100 `}
      >
        <SplashCursor />
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Project />
        <Contact />
        <Footer />
      </div>
  </>
  );
}

export default App
