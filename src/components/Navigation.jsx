import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { name: '[ZERON TECHNOLOGIES]', href: '#features', type: 'anchor' },
    { name: '[ZERON.EXE]', href: '#demo', type: 'anchor' },
    { name: '[ZERON ROADMAP]', href: '/roadmap', type: 'route' },
    { name: '[ZERON FOUNDATION]', href: '#dual-audience', type: 'anchor' },
    { name: '[CONTACT US]', href: '#footer', type: 'anchor' }
  ]

  const handleNavClick = (e, item) => {
    if (item.type === 'anchor' && location.pathname !== '/') {
      // If we're on roadmap page and user clicks anchor link, go to home first
      e.preventDefault()
      window.location.href = `/${item.href}`
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <motion.div 
        className="nav-banner"
        initial={{ opacity: 0, height: 'auto' }}
        animate={{ 
          opacity: isScrolled ? 0 : 1,
          height: isScrolled ? 0 : 'auto',
          marginTop: isScrolled ? '-10px' : '0px'
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="banner-dot">●</span>
        <span className="banner-text">Interested in learning more?</span>
        <span className="banner-arrow">→</span>
        <a href="#footer" className="banner-link">Contact us here</a>
      </motion.div>
      
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/assets/zeron-logo.png" alt="ZerOn" className="logo-image" />
        </motion.div>
        
        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.type === 'route' ? (
                <Link
                  to={item.href}
                  className="nav-item"
                >
                  {item.name}
                </Link>
              ) : (
                <motion.a
                  href={item.href}
                  className="nav-item"
                  onClick={(e) => handleNavClick(e, item)}
                  whileHover={{ color: '#ffffff' }}
                >
                  {item.name}
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation