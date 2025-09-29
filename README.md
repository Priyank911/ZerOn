# 🛡️ Decentralized Autonomous Cyber Red Team - Landing Page

A modern, professional landing page for a revolutionary cybersecurity + blockchain project that combines autonomous penetration testing with smart contract-powered bounty payouts.

## 🚀 **Live Demo**
Visit [http://localhost:3000](http://localhost:3000) to see the landing page in action!

## 📋 **Project Overview**

This project showcases a **Decentralized Autonomous Cyber Red Team** - a penetration testing platform where:

- 🏢 **Companies** fund bounty smart contracts and register their targets
- 🤖 **Security bots** continuously scan for vulnerabilities (SQLi, XSS, open ports, etc.)
- 🔗 **Smart contracts** automatically verify findings and release cryptocurrency payments
- 📜 **IPFS storage** ensures immutable, timestamped evidence
- ⚡ **Instant payouts** with no disputes or middlemen

## 🎨 **Design Features**

### **Theme & Visual Design**
- 🌙 **Dark Mode**: Navy/black backgrounds with neon cyan/teal accents
- ✨ **Animations**: Framer Motion powered micro-interactions and smooth transitions
- 🎯 **Modern UI**: Clean, grid-based layout with rounded cards and subtle glow effects
- 📱 **Fully Responsive**: Mobile-first design that works on all devices

### **Typography**
- **Primary**: Inter (body text, readability)
- **Headings**: Space Grotesk (modern, tech-focused)
- **Code**: JetBrains Mono (monospace for technical content)

## 📖 **Page Sections**

### 1. **🎯 Hero Section**
- Bold headline: "Autonomous, Trustless Penetration Testing — Paid Automatically"
- Dual CTAs: "Create a Bounty" and "Run a Bot"
- Animated network lines and floating security icons
- Key statistics display

### 2. **⚙️ How It Works**
- 3-step animated process flow: Register → Bots Scan → Smart Contract Pays
- Interactive timeline with progress indicators
- Detailed milestone descriptions

### 3. **⭐ Features**
- 8 comprehensive feature cards including:
  - Continuous Scanning (24/7)
  - Immutable Proofs (IPFS)
  - Instant Payouts (Smart Contracts)
  - DAO-Ready Governance
- Hover effects and benefit lists

### 4. **👥 Dual Audience**
- **For Companies**: Cost-effective security, continuous protection
- **For Bot Operators**: Automated revenue, instant payouts
- Statistics and feature comparisons

### 5. **🔍 Live Demo**
- **Interactive Simulation**: Start/stop scanning with real-time updates
- **Active Scanning**: Shows targets being scanned with progress bars
- **Vulnerability Findings**: Animated list of discovered issues with severity levels
- **Payout Process**: Smart contract verification and payment simulation

### 6. **💰 Pricing Plans**
- **Basic** (0.1 ETH/month): Up to 3 apps, daily scans
- **Premium** (0.5 ETH/month): Up to 15 apps, real-time scanning
- **Enterprise** (Custom): Unlimited apps, multi-region scanning

### 7. **🗺️ Roadmap & DAO**
- 5-phase development timeline
- DAO governance features
- Community-driven development goals
- Project statistics and milestones

### 8. **📧 Footer**
- Platform statistics
- Social media links
- Newsletter signup
- Legal and support links

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern component-based architecture
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icon system

### **Styling**
- **CSS Custom Properties** - Maintainable theming system
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Custom keyframes and transitions

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 16+ and npm
- Modern web browser

### **Installation**

```bash
# Clone the repository
cd "d:\Major project\Landing page"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Development Commands**

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📂 **Project Structure**

```
src/
├── components/           # React components
│   ├── Hero.jsx         # Hero section with CTAs
│   ├── HowItWorks.jsx   # 3-step process flow
│   ├── Features.jsx     # Platform features
│   ├── DualAudience.jsx # For companies & operators
│   ├── LiveDemo.jsx     # Interactive demo
│   ├── Pricing.jsx      # Pricing plans
│   ├── Roadmap.jsx      # Timeline & DAO
│   └── Footer.jsx       # Footer section
├── App.jsx              # Main app component
├── App.css              # Global app styles
├── index.css            # CSS variables & base styles
└── main.jsx             # App entry point
```

## 🎯 **Key Features**

### **Interactive Elements**
- ✅ **Live Demo Simulation**: Start/stop scanning with realistic animations
- ✅ **Hover Effects**: Cards lift and glow on interaction
- ✅ **Smooth Scrolling**: Animated scroll-triggered animations
- ✅ **Progress Indicators**: Real-time scanning progress bars
- ✅ **Dynamic Content**: Animated vulnerability findings generation

### **Performance Optimizations**
- ✅ **Component Lazy Loading**: Efficient resource management
- ✅ **Optimized Images**: Fast loading times
- ✅ **Minimal Bundle Size**: Tree-shaking and code splitting
- ✅ **CSS Optimization**: Efficient styling system

### **Accessibility Features**
- ✅ **Semantic HTML**: Proper heading structure and landmarks
- ✅ **ARIA Labels**: Screen reader friendly
- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **Color Contrast**: WCAG compliant contrast ratios

## 🎨 **Design System**

### **Color Palette**
```css
--primary-bg: #0a0e1a        /* Deep navy background */
--secondary-bg: #1a1f2e      /* Card backgrounds */
--accent-bg: #252b3d         /* Elevated surfaces */
--primary-cyan: #00d4ff      /* Primary accent color */
--primary-teal: #14b8a6      /* Secondary accent */
--primary-text: #ffffff      /* Main text */
--secondary-text: #b4bcd0    /* Subtle text */
```

### **Typography Scale**
- **Hero Title**: 3.5rem (56px) - Space Grotesk Bold
- **Section Titles**: 2.5rem (40px) - Space Grotesk SemiBold
- **Card Titles**: 1.5rem (24px) - Space Grotesk Medium
- **Body Text**: 1rem (16px) - Inter Regular
- **Small Text**: 0.875rem (14px) - Inter Regular

## 🔧 **Customization**

### **Updating Content**
1. **Hero Section**: Edit `src/components/Hero.jsx`
2. **Features**: Modify the features array in `src/components/Features.jsx`
3. **Pricing**: Update plans in `src/components/Pricing.jsx`
4. **Contact Info**: Change links in `src/components/Footer.jsx`

### **Styling Changes**
1. **Colors**: Update CSS custom properties in `src/index.css`
2. **Fonts**: Modify font imports in `index.html`
3. **Animations**: Adjust Framer Motion configs in component files

## 🌟 **Future Enhancements**

### **Planned Features**
- [ ] **Blog Integration**: Technical articles and updates
- [ ] **User Dashboard**: Account management for companies/operators
- [ ] **Real API Integration**: Connect to actual backend services
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Advanced Analytics**: User behavior tracking

### **Technical Improvements**
- [ ] **TypeScript Migration**: Type safety and better DX
- [ ] **Testing Suite**: Unit and integration tests
- [ ] **CI/CD Pipeline**: Automated deployment
- [ ] **SEO Optimization**: Meta tags, sitemap, schema markup

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 **Support**

For support or questions about this landing page:

- 📧 **Email**: support@redteam-dao.com
- 💬 **Discord**: [RedTeam DAO Community](https://discord.gg/redteam)
- 🐦 **Twitter**: [@RedTeamDAO](https://twitter.com/redteamDAO)

---

Built with ❤️ using React, Vite, and Framer Motion

**Live at**: [http://localhost:3000](http://localhost:3000)
