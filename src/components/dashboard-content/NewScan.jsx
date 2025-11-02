import React, { useState, useEffect } from 'react'
import { BarChart3, Shield, Send, Globe, AlertCircle } from 'lucide-react'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'

const NewScan = ({ userId }) => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [userPlan, setUserPlan] = useState(null)
  const [scans, setScans] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return
      
      try {
        // Fetch user plan data
        const userRef = doc(db, 'users', userId)
        const userSnap = await getDoc(userRef)
        
        if (userSnap.exists()) {
          const userData = userSnap.data()
          setUserPlan(userData.plan)
          console.log('User plan loaded:', userData.plan)
        }

        // Fetch scan results from scanreturn collection
        const scanRef = doc(db, 'scanreturn', userId)
        const scanSnap = await getDoc(scanRef)
        
        if (scanSnap.exists()) {
          const scanData = scanSnap.data()
          setScans(scanData.scanResults || [])
          console.log('Scan results loaded:', scanData.scanResults)
        } else {
          setScans([])
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    
    fetchUserData()
  }, [userId])

  const handleScan = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name')
      return
    }

    // Validate domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid domain name (e.g., example.com)')
      return
    }

    // Check plan limits
    if (!userPlan) {
      setError('No plan selected. Please select a plan first.')
      return
    }

    if (scans.length >= userPlan.domains) {
      setError(`You've reached your plan limit of ${userPlan.domains} domain(s). Please upgrade your plan.`)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Call your API to start the scan
      const response = await fetch('http://localhost:5000/api/scan/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain.toLowerCase(),
          plan: userPlan.type,
          userId: userId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to start scan')
      }

      const scanResult = await response.json()
      console.log('Scan started:', scanResult)

      // Create scan record
      const scanRecord = {
        scanId: scanResult.scanId,
        domain: scanResult.domain,
        plan: scanResult.plan,
        status: scanResult.status,
        progress: scanResult.progress || 0,
        createdAt: scanResult.createdAt,
        estimatedDuration: scanResult.estimatedDuration
      }

      // Store scan results in scanreturn collection (separate document per user)
      const scanRef = doc(db, 'scanreturn', userId)
      const scanSnap = await getDoc(scanRef)

      if (scanSnap.exists()) {
        // Update existing scan document
        await updateDoc(scanRef, {
          scanResults: arrayUnion(scanRecord)
        })
      } else {
        // Create new scan document
        await setDoc(scanRef, {
          userId: userId,
          scanResults: [scanRecord]
        })
      }

      // Update domain usage count in user document
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)
      const userData = userSnap.data()
      
      await updateDoc(userRef, {
        'plan.domainsUsed': (userData.plan?.domainsUsed || 0) + 1
      })

      // Update local state
      setScans([...scans, scanRecord])
      setDomain('')
      
      alert(`Scan started successfully for ${domain}!\nScan ID: ${scanResult.scanId}`)
      
    } catch (error) {
      console.error('Error initiating scan:', error)
      setError('Failed to initiate scan. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleScan()
    }
  }

  return (
    <div className="new-scan-container-dash">
      <div className="section-header-dash">
        <div className="section-header-content-dash">
          <h2 className="section-title-dash">Vulnerability Assessment</h2>
          <p className="section-subtitle-dash">Scan your domain for security vulnerabilities and threats</p>
        </div>
        <div className="header-actions-dash">
          <button className="action-btn-dash secondary-dash">
            <BarChart3 size={18} />
            View Reports
          </button>
          <button className="action-btn-dash">
            <Shield size={18} />
            Quick Scan
          </button>
        </div>
      </div>

      {/* Domain Input Section */}
      <div className="scan-input-section">
        <div className="scan-input-wrapper">

          <input
            type="text"
            placeholder="Enter domain name (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="domain-input"
          />
          <button 
            onClick={handleScan}
            disabled={loading || !domain.trim()}
            className="send-scan-btn"
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        
        {error && (
          <div className="scan-error">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {userPlan && (
          <div className="scan-info">
            <span className="plan-badge">{userPlan.name}</span>
            <span className="scan-limit">
              {scans.length} / {userPlan.domains} domains used
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewScan