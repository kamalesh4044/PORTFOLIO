import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['c', 'cpp', 'cs', 'java', 'python', 'js', 'ts', 'html', 'css', 'php', 'ruby', 'go', 'rust'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['nodejs', 'express', 'react', 'nextjs', 'vue', 'angular', 'mysql', 'mongodb', 'postgres', 'firebase'],
  },
  {
    title: 'DevOps & Software',
    skills: ['git', 'github', 'docker', 'aws', 'linux', 'ubuntu', 'windows', 'bash', 'powershell', 'vscode', 'visualstudio', 'figma', 'unity', 'unreal', 'blender'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Tech Stack</h2>
          <div className="line"></div>
          <p className="section-subtitle">Weapons of choice for building the future.</p>
        </motion.div>

        {skillCategories.map((category, catIndex) => (
          <div className="skills-category" key={category.title}>
            <motion.h3
              className="category-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {category.title}
            </motion.h3>

            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {category.skills.map((skill) => (
                <motion.div
                  className="skill-card glass"
                  key={skill}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.05, boxShadow: "0 10px 20px rgba(0, 240, 255, 0.2)" }}
                >
                  <div className="skill-icon-wrapper">
                    <img
                      src={`https://skillicons.dev/icons?i=${skill}&theme=dark`}
                      alt={skill}
                      className="skill-icon"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                  </div>
                  <span className="skill-name" style={{ textTransform: 'capitalize' }}>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
