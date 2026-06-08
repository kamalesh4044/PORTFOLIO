import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Star, Gamepad2 } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'SkillWarz FPS',
    description: 'A multiplayer first-person shooter game with real-time gameplay, built from scratch. Under active development with live test servers.',
    tech: ['JavaScript', 'Node.js', 'WebSocket', 'Three.js'],
    github: 'https://github.com/kamalesh4044/multiplayer-fps-game',
    live: 'https://multiplayer-fps-game.onrender.com',
    stars: 2,
    featured: true
  },
  {
    id: 2,
    title: 'Velocity.io',
    description: 'A fast-paced multiplayer FPS game with competitive gameplay mechanics and real-time synchronization.',
    tech: ['JavaScript', 'WebGL', 'Socket.io'],
    github: 'https://github.com/kamalesh4044/velocity.io',
    live: '#',
    stars: 0,
    featured: true
  },
  {
    id: 3,
    title: 'Void Runner',
    description: 'An endless runner game with procedural generation, deployed on Vercel for instant play in the browser.',
    tech: ['JavaScript', 'Three.js', 'Vercel'],
    github: 'https://github.com/kamalesh4044',
    live: 'https://void-runner-seven.vercel.app',
    stars: 0,
    featured: true
  },
  {
    id: 4,
    title: 'EvoDot',
    description: 'A game built with Godot Engine featuring evolution-based mechanics. MIT licensed with an active multiplayer web version.',
    tech: ['GDScript', 'Godot Engine', 'Multiplayer'],
    github: 'https://github.com/kamalesh4044/evodot',
    live: '#',
    stars: 2,
    featured: false
  },
  {
    id: 5,
    title: 'Madras Drift',
    description: 'An open-world, third-person driving and exploration game set in Chennai. Currently under active development.',
    tech: ['GDScript', 'Godot Engine', 'Open World'],
    github: 'https://github.com/kamalesh4044/Madras-Drift',
    live: '#',
    stars: 0,
    featured: false
  },
  {
    id: 6,
    title: 'EvoDot Web',
    description: 'Web-based multiplayer version of EvoDot. Connect to the server and play with others in real-time.',
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Projects</h2>
          <div className="line"></div>
          <p className="section-subtitle">Games, apps, and experiments I've built</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`project-card glass ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-header">
                <Gamepad2 size={20} className="project-icon" />
                {project.stars > 0 && (
                  <span className="project-stars"><Star size={14} /> {project.stars}</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link"><Code size={20} /> Code</a>
                {project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-link live-link"><ExternalLink size={20} /> Play Now</a>
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
