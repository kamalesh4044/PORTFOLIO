import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Globe, Brain, Cpu, Code2, Server, MonitorSmartphone, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>My Journey</h2>
          <div className="line"></div>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              I've always been fascinated by how a few lines of code can build entire interactive worlds. As a Computer Science student, my journey isn't just about passing classes—it's driven by an intense, late-night curiosity to build things that feel alive.
            </motion.p>
            <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              Whether I'm debugging physics for a multiplayer FPS game, training an AI model to recognize patterns, or crafting a buttery-smooth web interface, I love the thrill of problem-solving. I'm constantly exploring the bleeding edge of tech, looking for that next "aha!" moment.
            </motion.p>
            
            <motion.div variants={itemVariants} className="about-interests">
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '1.2rem', fontSize: '1.4rem' }}>What keeps me awake at night?</h4>
              <div className="interest-grid">
                <div className="interest-card glass">
                  <Globe className="interest-icon" size={20} />
                  <span>Modern Web Architecture</span>
                </div>
                <div className="interest-card glass">
                  <Gamepad2 className="interest-icon" size={20} />
                  <span>Unreal & Godot Engines</span>
                </div>
                <div className="interest-card glass">
                  <Brain className="interest-icon" size={20} />
                  <span>Machine Learning Models</span>
                </div>
                <div className="interest-card glass">
                  <Cpu className="interest-icon" size={20} />
                  <span>Low-level System Design</span>
                </div>
              </div>
            </motion.div>
            
            <motion.a 
              variants={itemVariants}
              href="#contact" 
              className="btn btn-primary mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Build Something
            </motion.a>
          </motion.div>

          <div className="about-cards">
            {[
              { icon: <Gamepad2 size={32} />, title: "Game Dev", desc: "Crafting immersive 3D worlds, fluid mechanics, and multiplayer architectures." },
              { icon: <Globe size={32} />, title: "Web Tech", desc: "Building highly interactive, premium user interfaces with React and Next.js." },
              { icon: <Brain size={32} />, title: "AI & ML", desc: "Training intelligent systems and exploring the fascinating world of neural networks." },
              { icon: <Cpu size={32} />, title: "Systems", desc: "Bridging the gap between raw hardware performance and seamless software execution." }
            ].map((card, index) => (
              <motion.div 
                key={index}
                className="about-card glass"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 240, 255, 0.15)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
              >
                <div className="card-icon" style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{card.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
