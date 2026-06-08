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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <div className="line"></div>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Let's build something together</h3>
            <p>
              I'm currently open for new opportunities, collaborations, and interesting projects. Whether you have a question, want to collaborate on a game, or just want to say hi — I'd love to hear from you!
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:kamalesh404e@gmail.com">kamalesh404e@gmail.com</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/kamalesh-kumar-a-308a89332/" target="_blank" rel="noopener noreferrer">Kamalesh Kumar A</a></p>
              <p><strong>GitHub:</strong> <a href="https://github.com/kamalesh4044" target="_blank" rel="noopener noreferrer">kamalesh4044</a></p>
              <p><strong>Location:</strong> Greater Coimbatore Area, India</p>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="What would you like to build together?"></textarea>
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              Send Message <Send size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
