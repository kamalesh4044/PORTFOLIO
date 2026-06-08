import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Globe, Brain, Cpu } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="line"></div>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I am a <strong>Computer Science Engineering student</strong> at Kingston Engineering College, passionate about software development, game development, web technologies, and artificial intelligence.
            </p>
            <p>
              I enjoy building projects, exploring new technologies, and continuously improving my programming and problem-solving skills. Currently focused on developing real-world projects, strengthening my technical skills, and expanding my knowledge in modern software technologies.
            </p>
            <div className="about-interests">
              <h4>My Interests</h4>
              <ul>
                <li>Software Development</li>
                <li>Web Development</li>
                <li>Game Development</li>
                <li>Artificial Intelligence</li>
                <li>Machine Learning</li>
              </ul>
            </div>
            <a href="#contact" className="btn btn-primary mt-4">Let's Connect</a>
          </motion.div>

          <div className="about-cards">
            <motion.div 
              className="about-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Gamepad2 size={32} className="card-icon" />
              <h3>Game Development</h3>
              <p>Building multiplayer FPS games, open-world driving games, and interactive experiences with Godot, Unity & Unreal Engine.</p>
            </motion.div>
            
            <motion.div 
              className="about-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Globe size={32} className="card-icon" />
              <h3>Web Development</h3>
              <p>Creating modern web applications using React, Next.js, Node.js, and cutting-edge frontend technologies.</p>
            </motion.div>

            <motion.div 
              className="about-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Brain size={32} className="card-icon" />
              <h3>AI & Machine Learning</h3>
              <p>Exploring artificial intelligence, machine learning algorithms, and building intelligent applications with Python.</p>
            </motion.div>

            <motion.div 
              className="about-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Cpu size={32} className="card-icon" />
              <h3>Hardware & Software</h3>
              <p>Bridging the gap between hardware and software, building systems that interact with the physical world.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
