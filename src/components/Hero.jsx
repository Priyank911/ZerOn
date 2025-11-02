import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Bot, Network } from 'lucide-react'
import ParticleField from './ParticleField'
import DataStream from './DataStream'
import TerminalEffect from './TerminalEffect'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const handleStartHunting = () => {
    window.location.href = '/face-scan'
  }

  const terminalCommands = [
    'nmap -sS -O target.domain.com',
    'sqlmap -u "http://target.com/page?id=1" --dbs',
    'nikto -h http://target.com',
    'dirb http://target.com /usr/share/wordlists/dirb/common.txt',
    'hydra -l admin -P passwords.txt target.com ssh',
    'VULNERABILITIES DETECTED: 7 HIGH, 12 MEDIUM',
    'BOUNTY PAYMENT INITIATED: 0.5 ETH'
  ]

  return (
    <section className="hero">
      <div className="grid-overlay"></div>
      <ParticleField count={30} className="hero-particles" />
      <DataStream direction="vertical" density={8} className="background terminal-green sparse" />
      
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Text */}
        <motion.div 
          className="hero-welcome"
          variants={itemVariants}
        >
          <span className="terminal-prefix">//</span>
          <span className="terminal-text">WELCOME TO </span>
          <span className="terminal-highlight">ZERON</span>
        </motion.div>

        {/* Main Content - Left Side */}
        <div className="hero-main-layout">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span>POWER UP WITH</span><br />
              <span>NEXT-GEN <span className="gradient-text">CYBER DEFENSE</span></span>
            </motion.h1>

            <motion.div 
              className="hero-features"
              variants={itemVariants}
            >
              <div className="feature-item">
                <span className="feature-number">_01 {'>'}</span>
                <span className="feature-title">SECURITY</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">_02 {'>'}</span>
                <span className="feature-title">INCREASING SPEED</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">_03 {'>'}</span>
                <span className="feature-title">AUTOMATION</span>
              </div>
            </motion.div>

            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Join our community and learn<br />
              how you can benefit from this<br />
              technology_
            </motion.p>

            <motion.div 
              className="hero-cta"
              variants={itemVariants}
            >
              <motion.button 
                className="btn-primary"
                onClick={handleStartHunting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START HUNTING
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                WHITEPAPER
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                HOW IT WORKS
              </motion.button>
              <motion.div className="play-button">
                <span>▶</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Content */}
          <motion.div 
            className="hero-right"
            variants={itemVariants}
          >
            <div className="code-preview">
              <span className="comment-text">//Unlocking the power of Web3</span><br />
              <span className="comment-text">while delivering a Web2-like user experience</span><br />
              <span className="comment-text">and increasing speed, security, and</span><br />
              <span className="comment-text">automation is a significant step forward in</span><br />
              <span className="comment-text">smart contract development_</span>
            </div>
            <div className="terminal-display">
              <TerminalEffect commands={terminalCommands} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Actor Model Text */}
      <motion.div 
        className="hero-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="actor-model-text">
          Z E R O N &nbsp;&nbsp;&nbsp; M O D E L
        </div>
      </motion.div>

    </section>
  )
}

export default Hero