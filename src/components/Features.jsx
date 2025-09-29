import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Shield, 
  Lock, 
  Terminal,
  Code,
  Database,
  Zap,
  Globe
} from 'lucide-react'
import './Features.css'

const Features = () => {
  const [activeSection, setActiveSection] = useState('actor')

  const features = [
    {
      id: 'security',
      icon: Shield,
      title: "SECURITY AUTOMATION",
      subtitle: "[LEARN MORE]",
      description: "ZerOn provides automated security scanning and vulnerability detection for smart contracts and dApps. Real-time monitoring with AI-powered threat analysis ensures comprehensive protection against emerging security risks.",
      visual: "cube-network",
      codeExample: `// Security Scanner
const scanner = new ZerOnScanner({
  target: contractAddress,
  scanTypes: ['sqli', 'xss', 'reentrancy']
});

const result = await scanner.scan();
if (result.vulnerabilities.length > 0) {
  await reportVulnerability(result);
}`
    },
    {
      id: 'blockchain',
      icon: Database,
      title: "BLOCKCHAIN STORAGE",
      subtitle: "[LEARN MORE]",
      description: "Immutable proof storage on blockchain with IPFS integration. All security reports and findings are cryptographically verified and stored permanently, ensuring audit trails and compliance requirements are met.",
      visual: "memory-grid",
      codeExample: `// Blockchain Storage
contract ZerOnVault {
    mapping(bytes32 => Report) reports;
    
    function storeReport(bytes32 hash, Report memory report) 
        external onlyValidator {
        reports[hash] = report;
        emit SecurityReportStored(hash);
    }
}`
    },
    {
      id: 'smart',
      icon: Code,
      title: "SMART CONTRACTS",
      subtitle: "[LEARN MORE]",
      description: "Automated payout system using smart contracts for verified vulnerabilities. Instant cryptocurrency payments when security issues are confirmed, eliminating manual processes and payment delays.",
      visual: "code-terminal",
      codeExample: `// Smart Contract Payout
function processPayout(
    address researcher,
    uint256 amount,
    bytes32 vulnHash
) external onlyVerified(vulnHash) {
    token.transfer(researcher, amount);
    emit PayoutProcessed(researcher, amount);
}`
    },
    {
      id: 'network',
      icon: Globe,
      title: "GLOBAL NETWORK",
      subtitle: "[LEARN MORE]",
      description: "Distributed bot network providing worldwide coverage and reduced latency. Multiple scanning nodes ensure 24/7 security monitoring with regional compliance and optimized performance.",
      visual: "network-bridge",
      codeExample: `// Network Node
class ZerOnNode {
  async startScanning() {
    const targets = await this.getTargets();
    
    for (const target of targets) {
      const result = await this.scan(target);
      await this.reportResults(result);
    }
  }
}`
    }
  ]

  const renderVisual = (type) => {
    switch(type) {
      case 'cube-network':
        return (
          <div className="visual-container cube-network">
            <div className="cube-grid">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="cube-node" style={{
                  '--delay': `${i * 0.1}s`,
                  '--x': `${(i % 4) * 25}%`,
                  '--y': `${Math.floor(i / 4) * 33}%`
                }}>
                  <div className="cube-face"></div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'memory-grid':
        return (
          <div className="visual-container memory-grid">
            <div className="memory-blocks">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="memory-block" style={{
                  '--delay': `${i * 0.05}s`
                }}>
                  <div className="block-header"></div>
                  <div className="block-data"></div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'code-terminal':
        return (
          <div className="visual-container code-terminal">
            <div className="terminal-window-visual">
              <div className="terminal-lines">
                {Array.from({length: 8}).map((_, i) => (
                  <div key={i} className="terminal-line-visual" style={{
                    '--delay': `${i * 0.1}s`,
                    '--width': `${Math.random() * 60 + 40}%`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'network-bridge':
        return (
          <div className="visual-container network-bridge">
            <div className="bridge-structure">
              <div className="bridge-arch">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="arch-segment" style={{
                    '--angle': `${(i * 9) - 90}deg`,
                    '--delay': `${i * 0.05}s`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="features section">
      <div className="container">        
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="terminal-prefix">$</span>
            <span className="title-text">ZERON SECURITY PLATFORM FEATURES</span>
          </h2>
          <p className="section-subtitle">
            Advanced cybersecurity automation for Web3 applications with blockchain-verified results and instant cryptocurrency payouts for verified vulnerabilities.
          </p>
        </motion.div>

        <div className="toolkit-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="toolkit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3 className="card-title">{feature.title}</h3>
                <span className="learn-more">{feature.subtitle}</span>
              </div>
              
              <div className="card-content">
                <div className="content-left">
                  <p className="card-description">{feature.description}</p>
                </div>
                
                <div className="content-right">
                  <div className="visual-section">
                    {renderVisual(feature.visual)}
                  </div>
                </div>
              </div>

              {feature.codeExample && (
                <div className="code-section">
                  <div className="code-window">
                    <div className="code-header">
                      <div className="window-controls">
                        <span className="control close"></span>
                        <span className="control minimize"></span>
                        <span className="control maximize"></span>
                      </div>
                    </div>
                    <div className="code-content">
                      <pre><code>{feature.codeExample}</code></pre>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
