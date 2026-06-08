import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'glass scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        <a href="#home" className="logo">Kamalesh<span>.</span></a>
        
        <div className="desktop-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="btn btn-outline nav-btn">Let's Talk</a>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu glass"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <a href="#home" onClick={toggleMenu} className="nav-link">Home</a>
          <a href="#about" onClick={toggleMenu} className="nav-link">About</a>
          <a href="#skills" onClick={toggleMenu} className="nav-link">Skills</a>
          <a href="#projects" onClick={toggleMenu} className="nav-link">Projects</a>
          <a href="#contact" onClick={toggleMenu} className="btn btn-primary">Let's Talk</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
