import React, { useState } from 'react';
import { 
  Rocket, 
  Shield, 
  Brain, 
  Globe, 
  Coins, 
  Code, 
  Target,
  Clock,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  Briefcase,
  Settings,
  BarChart3,
  Database
} from 'lucide-react';
import Navigation from './Navigation';
import ParticleField from './ParticleField';
import NetworkPulse from './NetworkPulse';
import './Roadmap.css';

const Roadmap = () => {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      period: "Q1-Q2 2025",
      title: "Foundation & Core Infrastructure",
      status: "Completed",
      progress: "92%",
      description: "Establishing foundational technology stack for autonomous cybersecurity operations with blockchain integration and smart contract automation.",
      keyItems: [
        "Ethereum Smart Contract Deployment",
        "Core Autonomous Bot Framework",
        "IPFS Integration for Vulnerability Proofs", 
        "Cryptocurrency Payout System",
        "Web Interface for Bot Operators",
        "Security Testing & Beta Program"
      ],
      techStack: "Solidity, Node.js, React, MongoDB, Docker",
      deliverables: "Smart Contract Audit, Beta Testing Results, Security Framework Documentation",
      targetMetrics: "125 Bots • 650+ Vulnerabilities • $2.5M Payouts"
    },
    {
      phase: "Phase 2", 
      period: "Q3-Q4 2025",
      title: "AI-Powered Expansion & Enterprise",
      status: "In Progress",
      progress: "67%",
      description: "Integrating artificial intelligence for advanced vulnerability detection and enterprise-grade features across multiple blockchain networks.",
      keyItems: [
        "Machine Learning Classification",
        "AI Zero-Day Detection",
        "Enterprise Dashboard",
        "Multi-Chain Support",
        "Real-Time Intelligence",
        "SOC 2 Compliance"
      ],
      techStack: "TensorFlow, PyTorch, GraphQL, Kubernetes, Redis, OAuth 2.0",
      deliverables: "AI Model Reports, Security Certifications, Integration Documentation",
      targetMetrics: "500+ Bots • 2.5K+ Vulnerabilities • $8.2M Payouts"
    },
    {
      phase: "Phase 3",
      period: "Q1-Q2 2026",
      title: "Global Network & Partnerships", 
      status: "Planned",
      progress: "23%",
      description: "Establishing worldwide network of security bots with regional compliance frameworks and strategic partnerships.",
      keyItems: [
        "Global Bot Network (50+ Regions)",
        "Multi-Language Support",
        "Regional Compliance (GDPR, CCPA)",
        "Strategic Partnerships",
        "Government Programs",
        "Community Governance"
      ],
      techStack: "Global CDN, Multi-Region Database, Localized Smart Contracts",
      deliverables: "Global Strategy Report, Partnership Templates, Compliance Matrix",
      targetMetrics: "2.5K+ Bots • 10K+ Vulnerabilities • $25M Payouts"
    },
    {
      phase: "Phase 4",
      period: "Q3-Q4 2026", 
      title: "Full Autonomy & DAO Governance",
      status: "Planned",
      progress: "8%",
      description: "Achieving complete decentralization through DAO governance and creating a fully self-sustaining ecosystem.",
      keyItems: [
        "Full DAO Governance",
        "Community-Driven Development",
        "Advanced Tokenomics",
        "Cross-Chain Interoperability",
        "Self-Sustaining Economics",
        "Decentralized Identity"
      ],
      techStack: "Layer 2 Scaling, Governance Smart Contracts, Cross-Chain Bridges",
      deliverables: "DAO Framework, Tokenomics White Paper, Governance Handbook",
      targetMetrics: "10K+ Bots • 50K+ Vulnerabilities • $100M+ Payouts"
    }
  ];

  return (
    <div className="roadmap-page">
      <Navigation />
      <ParticleField count={50} className="roadmap-particles" />
      <NetworkPulse className="network-background" />
      
      {/* Document Header */}
      <div className="roadmap-document">
        <div className="document-header">
          <h1>ZerOn Protocol Development Roadmap</h1>
          <p>2025-2026 Strategic Implementation Plan</p>
          <div className="document-meta">
            <span>4 Phases</span> • <span>18 Months</span> • <span>$100M+ Target</span>
          </div>
        </div>

        {/* Document Content */}
        <div className="document-content">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="phase-section">
              
              {/* Phase Header */}
              <div className="phase-header">
                <div className="phase-number">{phase.phase}</div>
                <div className="phase-info">
                  <h2>{phase.title}</h2>
                  <div className="phase-meta">
                    <span className="period">{phase.period}</span>
                    <span className={`status ${phase.status.toLowerCase().replace(' ', '-')}`}>
                      {phase.status}
                    </span>
                    <span className="progress">{phase.progress}</span>
                  </div>
                </div>
              </div>

              {/* Phase Content */}
              <div className="phase-content">
                <p className="description">{phase.description}</p>
                
                <div className="content-grid">
                  <div className="content-column">
                    <h4>Key Features</h4>
                    <ul>
                      {phase.keyItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="content-column">
                    <h4>Technology Stack</h4>
                    <p className="tech-stack">{phase.techStack}</p>
                    
                    <h4>Deliverables</h4>
                    <p className="deliverables">{phase.deliverables}</p>
                    
                    <h4>Target Metrics</h4>
                    <p className="metrics">{phase.targetMetrics}</p>
                  </div>
                </div>
              </div>
              
              {index < roadmapPhases.length - 1 && <div className="phase-separator"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
