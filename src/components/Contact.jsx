import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Establish Connection</h2>
          <div className="line"></div>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-light)' }}>Let's build the future together</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              I'm always looking for new challenges, crazy game ideas, or cutting-edge web projects. If you want to collaborate, have a question, or just want to geek out over AI and tech—drop me a line!
            </p>
            <div className="contact-info" style={{ marginTop: '2rem' }}>
              <p><strong>Transmission Line:</strong> <a href="mailto:kamalesh404e@gmail.com" style={{ color: 'var(--primary-color)' }}>kamalesh404e@gmail.com</a></p>
              <p><strong>Professional Hub:</strong> <a href="https://www.linkedin.com/in/kamalesh-kumar-a-308a89332/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>Kamalesh Kumar A</a></p>
              <p><strong>Code Repository:</strong> <a href="https://github.com/kamalesh4044" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>kamalesh4044</a></p>
              <p><strong>Base Coordinates:</strong> Greater Coimbatore Area, India</p>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label htmlFor="name">Designation (Name)</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Comms Link (Email)</label>
              <input type="email" id="email" placeholder="john@domain.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Transmission Data (Message)</label>
              <textarea id="message" rows="5" placeholder="What are we building?"></textarea>
            </div>
            <motion.button 
              type="submit" 
              className="btn btn-primary submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Initialize Ping <Send size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
