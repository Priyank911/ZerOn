import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import './Roadmap.css';

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const roadmapData = [
    {
      id: 1,
      quarter: "Q1 2025",
      title: "Foundation & Core Infrastructure",
      status: "completed",
      progress: 100,
      description: "Building the fundamental architecture for autonomous security operations with blockchain integration and immutable proof storage.",
      features: [
        "Smart Contract Deployment on Ethereum Mainnet",
        "Core Bot Framework with SQL Injection Detection",
        "IPFS Integration for Immutable Proof Storage",
        "Basic Web Interface for Bot Operators",
        "Beta Testing with 50+ Security Researchers",
        "Initial Cryptocurrency Payout System"
      ],
      technical: [
        "Solidity Smart Contracts (OpenZeppelin Security)",
        "Node.js Backend with Express Framework",
        "React Frontend with Web3 Integration",
        "IPFS Pinning Service Integration",
        "Ethereum Gas Optimization Techniques"
      ],
      metrics: {
        bots: "25",
        vulnerabilities: "150+",
        payouts: "$12,000"
      }
    },
    {
      id: 2,
      quarter: "Q2 2025",
      title: "Security Module Expansion",
      status: "in-progress",
      progress: 75,
      description: "Expanding vulnerability detection capabilities with advanced security testing modules and real-time threat intelligence integration.",
      features: [
        "XSS & CSRF Vulnerability Detection",
        "Advanced Port Scanning Capabilities",
        "Weak Authentication Pattern Recognition",
        "Real-time Threat Intelligence Integration",
        "Enhanced Bot Reputation System",
        "Multi-Chain Support (Polygon, BSC)"
      ],
      technical: [
        "Advanced SQL Injection Pattern Matching",
        "Machine Learning Vulnerability Classification",
        "WebSocket Real-time Communication",
        "Redis Caching for Performance",
        "Docker Containerization for Bot Deployment"
      ],
      metrics: {
        bots: "100+",
        vulnerabilities: "500+",
        payouts: "$45,000"
      }
    },
    {
      id: 3,
      quarter: "Q3 2025",
      title: "Enterprise Platform Launch",
      status: "current",
      progress: 25,
      description: "Professional-grade platform for enterprise customers with advanced reporting, compliance features, and white-label solutions.",
      features: [
        "Enterprise Dashboard with Advanced Analytics",
        "SOC 2 & ISO 27001 Compliance Reporting",
        "White-label Solutions for Security Firms",
        "Advanced API for Custom Integrations",
        "Multi-currency Payout Support (BTC, ETH, USDC)",
        "24/7 Customer Support System"
      ],
      technical: [
        "GraphQL API for Flexible Data Queries",
        "Kubernetes Orchestration for Scalability",
        "Advanced Monitoring with Grafana",
        "OAuth 2.0 & SAML Integration",
        "End-to-End Encryption for Data Security"
      ],
      metrics: {
        bots: "500+",
        vulnerabilities: "2000+",
        payouts: "$150,000"
      }
    },
    {
      id: 4,
      quarter: "Q4 2025",
      title: "AI-Powered Security Intelligence",
      status: "planned",
      progress: 0,
      description: "Integrating machine learning and AI for predictive security analysis, zero-day vulnerability discovery, and behavioral anomaly detection.",
      features: [
        "Machine Learning Vulnerability Prediction",
        "AI-Assisted Zero-Day Discovery",
        "Behavioral Analysis for Anomaly Detection",
        "Automated Threat Classification System",
        "Predictive Security Risk Assessment",
        "Natural Language Vulnerability Reporting"
      ],
      technical: [
        "TensorFlow & PyTorch ML Models",
        "Natural Language Processing (NLP)",
        "Computer Vision for Code Analysis",
        "Reinforcement Learning for Bot Optimization",
        "Edge Computing for Real-time Analysis"
      ],
      metrics: {
        bots: "1000+",
        vulnerabilities: "5000+",
        payouts: "$500,000"
      }
    },
    {
      id: 5,
      quarter: "Q1 2026",
      title: "Global Network Expansion",
      status: "planned",
      progress: 0,
      description: "Establishing a worldwide network of security bots with regional compliance, multi-language support, and partnerships with major security vendors.",
      features: [
        "Global Bot Deployment (50+ Regions)",
        "Multi-language Platform Support (20+ Languages)",
        "Regional Compliance Frameworks (GDPR, CCPA)",
        "Local Cryptocurrency Payment Options",
        "Partnerships with Major Security Vendors",
        "Community Governance Implementation"
      ],
      technical: [
        "Global CDN for Low-latency Access",
        "Multi-region Database Replication",
        "Localized Smart Contract Deployment",
        "Advanced Load Balancing",
        "Regulatory Compliance Automation"
      ],
      metrics: {
        bots: "5000+",
        vulnerabilities: "20000+",
        payouts: "$2,000,000"
      }
    },
    {
      id: 6,
      quarter: "Q2 2026",
      title: "Ecosystem Maturity & DAO",
      status: "planned",
      progress: 0,
      description: "Full decentralization with community governance, mature ecosystem for sustainable growth, and advanced tokenomics implementation.",
      features: [
        "Full DAO Governance Implementation",
        "Community-Driven Platform Development",
        "Advanced Tokenomics & Staking Rewards",
        "Decentralized Dispute Resolution",
        "Self-Sustaining Ecosystem Model",
        "Cross-Chain Interoperability"
      ],
      technical: [
        "Layer 2 Scaling Solutions",
        "Decentralized Governance Contracts",
        "Cross-chain Bridge Implementation",
        "Automated Market Making (AMM)",
        "Decentralized Identity (DID) Integration"
      ],
      metrics: {
        bots: "10000+",
        vulnerabilities: "100000+",
        payouts: "$10,000,000"
      }
    }
  ];

  const statusConfig = {
    completed: { color: '#00ff41', label: 'COMPLETED', icon: '✓' },
    'in-progress': { color: '#ffbd2e', label: 'IN PROGRESS', icon: '⚡' },
    current: { color: '#ff6b35', label: 'CURRENT FOCUS', icon: '🎯' },
    planned: { color: '#888888', label: 'PLANNED', icon: '📋' }
  };

  return (
    <div className="roadmap-container">
      <Navigation />
      {/* Terminal Header */}
      <motion.div 
        className="roadmap-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="terminal-window">
          <div className="terminal-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="prompt">zeron@protocol:~$</span>
              <span className="command"> roadmap --detailed --interactive</span>
            </div>
            <div className="terminal-output">
              <h1 className="roadmap-title">
                ZerOn Protocol Development Roadmap
              </h1>
              <p className="roadmap-subtitle">
                Autonomous cybersecurity through decentralized red team operations
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        className="stats-overview"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">18</div>
            <div className="stat-label">Months Timeline</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">6</div>
            <div className="stat-label">Major Releases</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Bot Operations</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0%</div>
            <div className="stat-label">Platform Fees</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Timeline */}
      <div className="timeline-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Development Timeline
        </motion.h2>
        
        <div className="timeline-container">
          <div className="timeline-nav">
            {roadmapData.map((phase, index) => (
              <motion.button
                key={phase.id}
                className={`timeline-nav-item ${activePhase === index ? 'active' : ''}`}
                onClick={() => setActivePhase(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="nav-quarter">{phase.quarter}</div>
                <div className="nav-status" style={{ color: statusConfig[phase.status].color }}>
                  {statusConfig[phase.status].icon}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              className="timeline-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {roadmapData[activePhase] && (
                <div className="phase-details">
                  {/* Phase Header */}
                  <div className="phase-header">
                    <div className="phase-meta">
                      <span className="phase-quarter">{roadmapData[activePhase].quarter}</span>
                      <span 
                        className="phase-status"
                        style={{ 
                          color: statusConfig[roadmapData[activePhase].status].color,
                          borderColor: statusConfig[roadmapData[activePhase].status].color
                        }}
                      >
                        {statusConfig[roadmapData[activePhase].status].icon} {statusConfig[roadmapData[activePhase].status].label}
                      </span>
                    </div>
                    <h3 className="phase-title">{roadmapData[activePhase].title}</h3>
                    <p className="phase-description">{roadmapData[activePhase].description}</p>
                    
                    {/* Progress Bar */}
                    <div className="progress-container">
                      <div className="progress-label">
                        <span>Development Progress</span>
                        <span>{roadmapData[activePhase].progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${roadmapData[activePhase].progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          style={{ backgroundColor: statusConfig[roadmapData[activePhase].status].color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase Content Grid */}
                  <div className="phase-content-grid">
                    {/* Features */}
                    <div className="content-section">
                      <h4 className="content-title">🚀 Key Features</h4>
                      <ul className="feature-list">
                        {roadmapData[activePhase].features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                          >
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Stack */}
                    <div className="content-section">
                      <h4 className="content-title">⚙️ Technical Stack</h4>
                      <ul className="tech-list">
                        {roadmapData[activePhase].technical.map((tech, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                          >
                            {tech}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="content-section metrics-section">
                      <h4 className="content-title">📊 Target Metrics</h4>
                      <div className="metrics-grid">
                        <div className="metric-item">
                          <div className="metric-value">{roadmapData[activePhase].metrics.bots}</div>
                          <div className="metric-label">Active Bots</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-value">{roadmapData[activePhase].metrics.vulnerabilities}</div>
                          <div className="metric-label">Vulnerabilities Found</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-value">{roadmapData[activePhase].metrics.payouts}</div>
                          <div className="metric-label">Total Payouts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Vision Statement */}
      <motion.div 
        className="vision-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="vision-terminal">
          <div className="terminal-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <div className="vision-content">
            <h3 className="vision-title">Our Vision</h3>
            <p className="vision-text">
              ZerOn Protocol represents the future of cybersecurity - where autonomous bots work around the clock 
              to discover vulnerabilities, validate findings through blockchain verification, and instantly reward 
              security researchers with cryptocurrency payments. We're building a world where security is 
              proactive, decentralized, and accessible to everyone.
            </p>
            <div className="vision-stats">
              <div className="vision-stat">
                <span className="stat-number">100%</span>
                <span className="stat-text">Autonomous Operations</span>
              </div>
              <div className="vision-stat">
                <span className="stat-number">0%</span>
                <span className="stat-text">Platform Fees</span>
              </div>
              <div className="vision-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-text">Security Scanning</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Roadmap;
