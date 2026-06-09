import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Star, Gamepad2 } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'SkillWarz FPS',
    description: 'A high-octane multiplayer first-person shooter built entirely from scratch. Features real-time bullet physics and matchmaking. Currently live and under active testing.',
    tech: ['JavaScript', 'Node.js', 'WebSocket', 'Three.js'],
    github: 'https://github.com/kamalesh4044/multiplayer-fps-game',
    live: 'https://multiplayer-fps-game.onrender.com',
    stars: 2,
    featured: true
  },
  {
    id: 2,
    title: 'Velocity.io',
    description: 'A relentless, fast-paced multiplayer arena. Built to push browser networking capabilities to the limit with seamless real-time synchronization.',
    tech: ['JavaScript', 'WebGL', 'Socket.io'],
    github: 'https://github.com/kamalesh4044/velocity.io',
    live: '#',
    stars: 0,
    featured: true
  },
  {
    id: 3,
    title: 'Void Runner',
    description: 'Dive into the void. An endless, procedural runner game deployed on Vercel. Instant browser play with zero install required.',
    tech: ['JavaScript', 'Three.js', 'Vercel'],
    github: 'https://github.com/kamalesh4044',
    live: 'https://void-runner-seven.vercel.app',
    stars: 0,
    featured: true
  },
  {
    id: 4,
    title: 'EvoDot',
    description: 'A Godot-powered experiment in evolutionary mechanics. Evolve, adapt, and survive in an active multiplayer web ecosystem.',
    tech: ['GDScript', 'Godot Engine', 'Multiplayer'],
    github: 'https://github.com/kamalesh4044/evodot',
    live: '#',
    stars: 2,
    featured: false
  },
  {
    id: 5,
    title: 'Madras Drift',
    description: 'Tear up the streets of Chennai in this open-world, third-person driving experience. Pushing mobile and web rendering boundaries.',
    tech: ['GDScript', 'Godot Engine', 'Open World'],
    github: 'https://github.com/kamalesh4044/Madras-Drift',
    live: '#',
    stars: 0,
    featured: false
  },
  {
    id: 6,
    title: 'EvoDot Web',
    description: 'The web-native client for EvoDot. Connect directly via WebSocket and experience real-time evolutionary combat directly in your browser.',
    tech: ['JavaScript', 'WebSocket', 'Canvas'],
    github: 'https://github.com/kamalesh4044/evodot_web',
    live: '#',
    stars: 1,
    featured: false
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Arsenal</h2>
          <div className="line"></div>
          <p className="section-subtitle">A collection of games, applications, and late-night experiments.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`project-card glass ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 240, 255, 0.15)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-header">
                <Gamepad2 size={20} className="project-icon" />
                {project.stars > 0 && (
                  <span className="project-stars"><Star size={14} /> {project.stars}</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description" style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <motion.a 
                  whileHover={{ scale: 1.05, color: "var(--primary-color)" }} 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-link"
                >
                  <Code size={20} /> Code
                </motion.a>
                {project.live !== '#' && (
                  <motion.a 
                    whileHover={{ scale: 1.05, color: "var(--primary-color)" }} 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="icon-link live-link"
                  >
                    <ExternalLink size={20} /> Play Now
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
