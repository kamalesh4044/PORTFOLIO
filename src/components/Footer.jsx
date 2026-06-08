import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Kamalesh Kumar A. All rights reserved.
        </p>
        <p className="made-with">
          Made with <Heart size={16} className="heart-icon" /> and React.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
