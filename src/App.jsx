import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CursorTrail from './components/CursorTrail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="preloader">
          <div className="loader-content">
            <div className="loader"></div>
            <p className="loader-text">KAMALESH</p>
          </div>
        </div>
      ) : (
        <div className="app-container animate-fade-in">
          <ParticleBackground />
          <CursorTrail />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
