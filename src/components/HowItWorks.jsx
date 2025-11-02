import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Code, Database, Shield, Play, CheckCircle } from 'lucide-react'
import './HowItWorks.css'

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('init')

  const productTabs = [
    { id: 'init', label: 'Init', active: true },
    { id: 'scan', label: 'Scan', active: false },
    { id: 'verify', label: 'Verify', active: false }
  ]

  const codeBlocks = {
    init: {
      title: 'INITIALIZE SECURITY CONTRACT',
      code: `// Initialize ZerOn Security Contract
const contract = await ZerOn.init({
  target: "https://your-app.com",
  bounty: "0.5 ETH",
  scope: ["XSS", "SQLi", "CSRF"],
  duration: "30 days"
});

console.log("Contract deployed:", contract.address);
console.log("Bounty pool:", contract.balance);`,
      terminal: [
        '$ zeron init --target https://your-app.com',
        '✓ Smart contract deployed: 0x742d3...',
        '✓ Bounty pool funded: 0.5 ETH',
        '✓ Security bots activated',
        '',
        'Ready for vulnerability detection...'
      ]
    },
    scan: {
      title: 'AUTONOMOUS VULNERABILITY SCANNING',
      code: `// Security Bot Auto-Discovery
const scanner = new ZerOn.SecurityBot({
  patterns: vulnDatabase.getAllPatterns(),
  depth: "comprehensive",
  stealth: true
});

await scanner.scan(target)
  .onVulnerability((vuln) => {
    console.log(\`Found: \${vuln.type}\`);
    blockchain.submitProof(vuln.evidence);
  });`,
      terminal: [
        '$ zeron scan --comprehensive',
        'Scanning target: https://your-app.com',
        '━━━━━━━━━━━━━━━━━━━━━━━ 48%',
        '',
        '⚠️  SQL Injection detected',
        '⚠️  XSS vulnerability found',
        '✓  Evidence submitted to IPFS'
      ]
    },
    verify: {
      title: 'SMART CONTRACT VERIFICATION & PAYOUT',
      code: `// Automated Verification & Payment
contract.on('VulnerabilitySubmitted', async (evidence) => {
  const verification = await ipfs.verify(evidence);
  
  if (verification.isValid) {
    const payout = calculateBounty(evidence.severity);
    await contract.releaseFunds(evidence.finder, payout);
    
    console.log(\`Paid: \${payout} ETH\`);
  }
});`,
      terminal: [
        '$ zeron verify --evidence QmX7f2...',
        'Verifying vulnerability evidence...',
        '',
        '✓ Evidence cryptographically valid',
        '✓ Vulnerability confirmed: HIGH severity',
        '✓ Payment released: 0.35 ETH',
        '✓ Transaction: 0x9a4b2c1...'
      ]
    }
  }

  return (
    <section className="how-it-works section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="terminal-prefix">//</span>
            <span className="title-text">HOW IT WORKS</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="works-grid">
          {/* Left Side - Product Tabs */}
          <motion.div
            className="product-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="product-tabs">
              {productTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="code-window">
              <div className="code-header">
                <div className="window-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <div className="code-title">{codeBlocks[activeTab].title}</div>
              </div>
              <div className="code-content">
                <pre>
                  <code>{codeBlocks[activeTab].code}</code>
                </pre>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <Terminal size={16} />
                <span>ZerOn Terminal</span>
              </div>
              <div className="terminal-content">
                {codeBlocks[activeTab].terminal.map((line, index) => (
                  <motion.div
                    key={index}
                    className="terminal-line"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Process Overview */}
          <motion.div
            className="process-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="process-header">
              <span className="step-indicator">_02 {'>'}</span>
              <h3>ZERON FOUNDATION</h3>
            </div>

            <div className="process-description">
              <h4>THE CORE ENTITY BEHIND THE ZERON ECOSYSTEM</h4>
              <p>
                The ZerOn Foundation supports next-generation cybersecurity platforms, 
                revolutionizing vulnerability detection through automated security scanning 
                and blockchain-verified bounty systems. Join the ZerOn community and become 
                a driving force in advancing cyber defense technologies.
              </p>
            </div>

            <div className="process-stats">
              <div className="stat-item">
                <div className="stat-label">DETECT, SECURE YOUR</div>
                <div className="stat-value">CYBER INFRASTRUCTURE</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-label">VULNERABILITIES FOUND</div>
                <div className="stat-value">5000+</div>
              </div>
            </div>

            <motion.button
              className="foundation-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ZERON FOUNDATION
            </motion.button>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-label">PING-PONG</div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "48%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="progress-text">48%</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
