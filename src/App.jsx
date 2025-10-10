import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import DualAudience from './components/DualAudience'
import LiveDemo from './components/LiveDemo'
import Footer from './components/Footer'
import Roadmap from './components/Roadmap'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false) // Disable loading for now to see changes

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const HomePage = () => (
    <>
      <Navigation />
      <Hero />
      <HowItWorks />
      <Features />
      <DualAudience />
      <LiveDemo />
      <Footer />
    </>
  )

  return (
    <div className="App">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
