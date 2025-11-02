import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './PlanWarningBanner.css'

const PlanWarningBanner = ({ userId }) => {
  const navigate = useNavigate()

  const handleSelectPlan = () => {
    navigate(`/plan-selection?id=${userId}`)
  }

  return (
    <motion.div 
      className="plan-warning-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="banner-content">
        <div className="banner-left">
          <div className="banner-icon">
            <AlertCircle size={20} />
          </div>
          <div className="banner-text">
            <h4 className="banner-title">Choose Your Plan to Get Started</h4>
            <p className="banner-description">
              Select a plan to unlock domain scanning and vulnerability assessment features
            </p>
          </div>
        </div>
        <motion.button
          className="banner-action-btn"
          onClick={handleSelectPlan}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles size={16} />
          <span>Select Plan</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PlanWarningBanner
