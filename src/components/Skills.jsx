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
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Skills & Technologies</h2>
          <div className="line"></div>
        </motion.div>

        {skillCategories.map((category, catIndex) => (
          <div className="skills-category" key={category.title}>
            <motion.h3
              className="category-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {category.title}
            </motion.h3>

            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {category.skills.map((skill) => (
                <motion.div
                  className="skill-card glass"
                  key={skill}
                  variants={cardVariants}
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
                  <span className="skill-name">{skill}</span>
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
