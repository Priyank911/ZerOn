import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  Shield, 
  Zap, 
  Crown, 
  Check, 
  X,
  Sparkles,
  Target,
  Lock,
  Wallet
} from 'lucide-react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import Footer from './Footer'
import './PlanSelection.css'

const PlanSelection = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id')
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: Shield,
      price: 'Free',
      domains: 1,
      description: 'Perfect for individual users and small projects',
      features: [
        { text: '1 Domain Scan', included: true },
        { text: 'Basic Vulnerability Detection', included: true },
        { text: 'Email Reports', included: true },
        { text: 'Community Support', included: true },
        { text: 'Advanced Threat Analysis', included: false },
        { text: 'Priority Support', included: false },
        { text: 'API Access', included: false }
      ],
      color: '#00ff88',
      gradient: 'linear-gradient(135deg, #00ff88, #00ccff)'
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Zap,
      price: '$29',
      priceUnit: '/month',
      domains: 3,
      popular: true,
      description: 'Everything in Basic, plus:',
      features: [
        { text: '3 Domain Scans', included: true },
        { text: 'Advanced Vulnerability Detection', included: true },
        { text: 'Real-time Alerts', included: true },
        { text: 'Priority Email Support', included: true },
        { text: 'Advanced Threat Analysis', included: true },
        { text: 'API Access', included: true },
        { text: 'Custom Reports', included: false }
      ],
      color: '#00ccff',
      gradient: 'linear-gradient(135deg, #00ccff, #0099ff)'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      price: '$99',
      priceUnit: '/month',
      domains: 6,
      description: 'Everything in Pro, plus:',
      features: [
        { text: '6 Domain Scans', included: true },
        { text: 'Enterprise-grade Detection', included: true },
        { text: 'Real-time Monitoring', included: true },
        { text: '24/7 Priority Support', included: true },
        { text: 'Advanced Threat Intelligence', included: true },
        { text: 'Full API Access', included: true },
        { text: 'Custom Integrations', included: true }
      ],
      color: '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    }
  ]

  useEffect(() => {
    if (!userId) {
      navigate('/')
    }
  }, [userId, navigate])

  const handleSelectPlan = async (plan) => {
    if (loading) return
    
    console.log('Plan selected:', plan.id)
    
    setLoading(true)
    setSelectedPlan(plan.id)
    
    try {
      // For Basic and Pro plans - require wallet connection and signature
      if (plan.id === 'basic' || plan.id === 'pro') {
        console.log(`Processing ${plan.name} plan - checking for wallet...`)
        
        // Check if Core wallet is available
        if (!window.ethereum) {
          console.error('No ethereum provider found')
          alert('Please install Core wallet extension to continue')
          setLoading(false)
          setSelectedPlan(null)
          return
        }

        console.log('Requesting wallet connection...')
        
        // Connect wallet
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        console.log('Accounts received:', accounts)
        
        if (!accounts || accounts.length === 0) {
          alert('No wallet connected. Please connect your Core wallet.')
          setLoading(false)
          setSelectedPlan(null)
          return
        }

        const userWallet = accounts[0]
        setWalletAddress(userWallet)
        
        console.log('Wallet connected:', userWallet)

        // Determine plan pricing text
        const planPricing = plan.id === 'basic' ? 'Free' : plan.price + (plan.priceUnit || '')

        // Create sign message
        const message = `ZerOn requests you to sign the following message

Active Wallet: ${userWallet}

Plan: ${plan.name} (${planPricing})
Domains: ${plan.domains}
User ID: ${userId}

Sign in with Ethereum to confirm your plan selection.
Issued At: ${new Date().toISOString()}
Expiration Time: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}`

        console.log('Requesting signature for message:', message)

        // Convert message to hex format for personal_sign
        const hexMessage = '0x' + Array.from(new TextEncoder().encode(message))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')

        console.log('Hex message:', hexMessage)

        // Request signature
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [hexMessage, userWallet]
        })
        
        console.log('Signature received:', signature)

        if (!signature) {
          alert('Signature required to proceed')
          setLoading(false)
          setSelectedPlan(null)
          return
        }

        console.log('Storing data in Firebase...')

        // Store plan selection and signature in Firebase
        const userRef = doc(db, 'users', userId)
        
        await setDoc(userRef, {
          walletAddress: userWallet,
          signature: signature,
          signedMessage: message,
          signedAt: new Date().toISOString(),
          plan: {
            type: plan.id,
            name: plan.name,
            domains: plan.domains,
            domainsUsed: 0,
            selectedAt: new Date().toISOString(),
            status: 'active'
          }
        }, { merge: true })
        
        console.log('Data stored successfully!')

        // Navigate to dashboard
        setTimeout(() => {
          console.log('Redirecting to dashboard...')
          navigate(`/dashboard?id=${userId}`)
        }, 1000)
        
      } else {
        // For Enterprise plan (later implementation)
        alert('Enterprise plan will be available soon!')
        setLoading(false)
        setSelectedPlan(null)
      }
      
    } catch (error) {
      console.error('Error selecting plan:', error)
      
      if (error.code === 4001) {
        alert('Signature rejected. Please approve the signature to continue.')
      } else if (error.code === -32002) {
        alert('Please check your Core wallet. A connection request is already pending.')
      } else {
        alert('Failed to select plan. Please try again.')
      }
      
      setLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="plan-selection-container">
      <div className="plans-container">
        {/* Header */}
        <motion.div 
          className="plans-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Plans and Pricing</h1>
          <p>
            Choose a plan that matches your requirements. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div className="plan-card-header">
                  <h3 className="plan-card-name">{plan.name}</h3>
                  <div className="plan-card-price">
                    <span className="price-value">{plan.price}</span>
                    {plan.priceUnit && <span className="price-period">{plan.priceUnit}</span>}
                  </div>
                  <p className="plan-card-description">{plan.description}</p>
                  <button
                    className="plan-learn-more"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loading}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <span className="btn-loading">
                        <span className="spinner"></span>
                        Connecting...
                      </span>
                    ) : (
                      <>
                        {(plan.id === 'basic' || plan.id === 'pro') && <Wallet size={16} />}
                        {(plan.id === 'basic' || plan.id === 'pro') ? 'Connect & Choose' : 'Choose this plan'}
                      </>
                    )}
                  </button>
                </div>

                <div className="plan-card-features">
                  {plan.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`feature-row ${feature.included ? 'included' : 'excluded'}`}
                    >
                      {feature.included ? (
                        <Check size={16} className="feature-check included" />
                      ) : (
                        <X size={16} className="feature-check excluded" />
                      )}
                      <span className="feature-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PlanSelection
