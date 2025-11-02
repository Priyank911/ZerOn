import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Terminal, Shield, Lock, Wifi, Activity } from 'lucide-react'
import * as faceapi from 'face-api.js'
import { 
  generateFaceVector, 
  storeFaceVector, 
  checkExistingFaceVector 
} from '../utils/faceVerification'
import VerificationPopup from './VerificationPopup'
import './FaceScan.css'

const FaceScan = () => {
  const [terminalLines, setTerminalLines] = useState([])
  const [scanningProgress, setScanningProgress] = useState(0)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  
  // Face verification states
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [blinkCount, setBlinkCount] = useState(0)
  const [eyesClosed, setEyesClosed] = useState(false)
  const [lastBlinkTime, setLastBlinkTime] = useState(0)
  const [headVerification, setHeadVerification] = useState({ left: false, right: false })
  const headVerificationRef = useRef({ left: false, right: false })
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [message, setMessage] = useState('Loading face detection models...')
  const blinkCooldown = 1000
  const detectionIntervalRef = useRef(null)
  
  // Track messages to avoid duplicates
  const messagesShownRef = useRef({
    blinkComplete: false,
    headPoseStarted: false,
    headLeftVerified: false,
    headRightVerified: false
  })
  
  // Popup state
  const [showPopup, setShowPopup] = useState(false)
  const [popupResult, setPopupResult] = useState(null)
  
  // Error handling and reset
  const [hasError, setHasError] = useState(false)

  // Reset all states for fresh scan
  const resetScan = () => {
    setBlinkCount(0)
    setEyesClosed(false)
    setLastBlinkTime(0)
    setHeadVerification({ left: false, right: false })
    headVerificationRef.current = { left: false, right: false }
    setVerificationComplete(false)
    setScanningProgress(0)
    setTerminalLines([])
    setHasError(false)
    messagesShownRef.current = {
      blinkComplete: false,
      headPoseStarted: false,
      headLeftVerified: false,
      headRightVerified: false
    }
    setMessage('Please blink twice (0/2)')
    addTerminalLine('> System reset - Starting new scan...')
  }

  // Hacking code lines to display
  const hackingCode = [
    '> Initializing face detection protocol...',
    '> Loading neural network models...',
    '> Establishing secure connection...',
    '> Face API models loaded successfully',
    '> Starting real-time face tracking...',
    '> Analyzing facial landmarks (68 points)',
    '> Calculating Eye Aspect Ratio (EAR)...',
    '> Monitoring blink detection...',
    '> Tracking head pose estimation...',
    '> Computing face descriptor vectors...',
    '> Running liveness detection checks...',
    '> Verifying head rotation angles...',
    '> Generating 128-dimensional face embedding...',
    '> Querying Firebase database...',
    '> Comparing face vectors with cosine similarity...',
    '> Analyzing facial recognition results...',
    '> Verification process complete!',
  ]

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setMessage('Loading face detection models...')
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ])
        setModelsLoaded(true)
        setMessage('Please blink twice (0/2)')
        addTerminalLine('> Face detection models loaded successfully')
      } catch (error) {
        console.error('Error loading models:', error)
        setMessage('Error loading face detection models')
        setHasError(true)
        addTerminalLine('> ERROR: Failed to load face detection models')
        addTerminalLine('> System will reset in 3 seconds...')
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    }

    loadModels()

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }, [])

  // Initialize webcam
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 720 },
            height: { ideal: 560 },
            facingMode: 'user' 
          } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(err => console.error('Error playing video:', err))
        }
      } catch (err) {
        console.error('Camera access denied:', err)
        setMessage('Error: Camera access denied')
        setHasError(true)
        addTerminalLine('> ERROR: Camera access denied')
        addTerminalLine('> Please allow camera permissions')
        addTerminalLine('> System will reset in 3 seconds...')
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Face detection logic
  useEffect(() => {
    if (!modelsLoaded || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    const handleVideoPlay = () => {
      canvas.width = 720
      canvas.height = 560
    }

    video.addEventListener('play', handleVideoPlay)

    const detectFaces = async () => {
      if (!video || !canvas || video.readyState !== 4) return

      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()

        const resizedDetections = faceapi.resizeResults(detections, {
          width: 720,
          height: 560
        })

        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)

        if (detections && detections.length > 0) {
          const landmarks = detections[0].landmarks
          const leftEye = landmarks.getLeftEye()
          const rightEye = landmarks.getRightEye()

          // Calculate Eye Aspect Ratio (EAR)
          const leftEAR = calculateEAR(leftEye)
          const rightEAR = calculateEAR(rightEye)
          const averageEAR = (leftEAR + rightEAR) / 2.0

          const isBlinking = averageEAR < 0.280
          const currentTime = Date.now()

          // Blink detection
          if (isBlinking && !eyesClosed && currentTime - lastBlinkTime > blinkCooldown) {
            setEyesClosed(true)
            setLastBlinkTime(currentTime)
            setBlinkCount(prevCount => {
              const newCount = Math.min(prevCount + 1, 2)
              if (newCount === 2 && !messagesShownRef.current.blinkComplete) {
                messagesShownRef.current.blinkComplete = true
                setMessage('Blink verification complete! Now turn your head left')
                addTerminalLine('> Blink verification complete ✓')
                addTerminalLine('> Initiating head pose verification...')
              } else if (newCount < 2) {
                setMessage(`Please blink twice (${newCount}/2)`)
                addTerminalLine(`> Blink detected (${newCount}/2)`)
              }
              return newCount
            })
          } else if (!isBlinking && eyesClosed) {
            setEyesClosed(false)
          }

          // Head movement detection
          if (blinkCount === 2 && !verificationComplete) {
            const leftEyeCenter = {
              x: leftEye.reduce((sum, point) => sum + point.x, 0) / leftEye.length,
              y: leftEye.reduce((sum, point) => sum + point.y, 0) / leftEye.length
            }
            const rightEyeCenter = {
              x: rightEye.reduce((sum, point) => sum + point.x, 0) / rightEye.length,
              y: rightEye.reduce((sum, point) => sum + point.y, 0) / rightEye.length
            }

            const eyeAngle = Math.atan2(rightEyeCenter.y - leftEyeCenter.y, rightEyeCenter.x - leftEyeCenter.x)
            const headTilt = Math.sin(eyeAngle)

            if (!headVerificationRef.current.left && headTilt < -0.10 && !messagesShownRef.current.headLeftVerified) {
              messagesShownRef.current.headLeftVerified = true
              headVerificationRef.current.left = true
              setHeadVerification(prev => ({ ...prev, left: true }))
              setMessage('Great! Now turn your head right')
              addTerminalLine('> Head left verified ✓')
            }

            if (headVerificationRef.current.left && !headVerificationRef.current.right && headTilt > 0.10 && !messagesShownRef.current.headRightVerified) {
              messagesShownRef.current.headRightVerified = true
              headVerificationRef.current.right = true
              setHeadVerification(prev => ({ ...prev, right: true }))
              setMessage('Verification complete! Checking database...')
              setVerificationComplete(true)
              addTerminalLine('> Head right verified ✓')
              addTerminalLine('> Generating face descriptor...')
              handleVerificationComplete()
            }
          }

          // Update progress
          const progress = calculateProgress()
          setScanningProgress(progress)
        }
      } catch (error) {
        console.error('Error in face detection:', error)
      }
    }

    detectionIntervalRef.current = setInterval(detectFaces, 100)

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
      video.removeEventListener('play', handleVideoPlay)
    }
  }, [modelsLoaded, eyesClosed, lastBlinkTime, blinkCount, verificationComplete])

  // Calculate Eye Aspect Ratio
  const calculateEAR = (eye) => {
    try {
      const p2_p6 = euclideanDistance(eye[1], eye[5])
      const p3_p5 = euclideanDistance(eye[2], eye[4])
      const p1_p4 = euclideanDistance(eye[0], eye[3])
      
      if (p1_p4 === 0) return 0.35
      
      const ear = (p2_p6 + p3_p5) / (2.0 * p1_p4)
      return Math.min(Math.max(ear, 0.1), 0.45)
    } catch (error) {
      return 0.35
    }
  }

  const euclideanDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + 
      Math.pow(point2.y - point1.y, 2)
    )
  }

  // Calculate overall progress
  const calculateProgress = () => {
    if (!headVerification.left && !headVerification.right && blinkCount < 2) {
      return Math.min(blinkCount * 25, 50)
    }
    if (blinkCount === 2 && !headVerification.left) return 50
    if (headVerification.left && !headVerification.right) return 75
    if (headVerification.left && headVerification.right) return 100
    return 0
  }

  // Handle verification complete
  const handleVerificationComplete = async () => {
    try {
      addTerminalLine('> Computing face embedding vectors...')
      
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()

      if (!detections || detections.length === 0) {
        throw new Error('No face detected')
      }

      const faceVector = generateFaceVector(detections[0])
      addTerminalLine('> Face vector generated (128 dimensions)')
      addTerminalLine('> Querying Firebase database...')

      // ✅ STEP 1: Check if face already exists in Firebase
      const existingFace = await checkExistingFaceVector(faceVector)

      if (existingFace && existingFace.uuid) {
        // ✅ EXISTING USER - Face found in Firebase with UUID
        const similarityPercent = Math.round(existingFace.similarity * 100)
        addTerminalLine(`> ✓ MATCH FOUND! Similarity: ${similarityPercent}%`)
        addTerminalLine(`> User UUID: ${existingFace.uuid}`)
        addTerminalLine('> Checking user profile completeness...')

        // Import utilities
        const { redirectWithUUID } = await import('../utils/uuid')
        const { getUserProfile } = await import('../utils/faceVerification')

        // ✅ CLEAR OLD SESSION FIRST (Important for new scan)
        localStorage.removeItem('userId')
        localStorage.removeItem('sessionId')
        addTerminalLine('> Cleared previous session data')

        // ✅ STEP 2: Check if user has complete profile data in Firebase
        let isComplete = false
        
        try {
          // Check Firebase first
          const userResult = await getUserProfile(existingFace.uuid)
          
          if (userResult.success && userResult.user) {
            // Check if all required fields are present
            isComplete = userResult.user.profile &&
              userResult.user.profile.fullName &&
              userResult.user.profile.email &&
              userResult.user.profile.organization &&
              (userResult.user.profile.role || userResult.user.profile.phone) // At least one more field
            
            if (isComplete) {
              addTerminalLine('> ✓ Profile complete in Firebase!')
            } else {
              addTerminalLine('> ⚠ Profile incomplete in Firebase')
            }
          } else {
            addTerminalLine('> ⚠ No user profile found in Firebase')
          }
        } catch (fbError) {
          console.log('Firebase check failed, trying API:', fbError)
          addTerminalLine('> Firebase unavailable, checking via API...')
          
          // Fallback to API check
          try {
            const response = await fetch(`/api/user/${existingFace.uuid}/check-complete`)
            const data = await response.json()
            
            isComplete = data.user && 
              data.user.profile &&
              data.user.profile.fullName &&
              data.user.profile.email &&
              data.user.profile.organization
              
          } catch (apiError) {
            console.log('API also not available')
            addTerminalLine('> API also not available')
          }
        }

        if (isComplete) {
          // ✅ COMPLETE DATA - Create NEW session and redirect to dashboard
          addTerminalLine('> ✓ All required fields present!')
          addTerminalLine('> Creating new session for this user...')
          
          // Store NEW session in localStorage with unique session ID
          const newSessionId = 'session-' + existingFace.uuid + '-' + Date.now()
          localStorage.setItem('userId', existingFace.uuid)
          localStorage.setItem('sessionId', newSessionId)
          localStorage.setItem('sessionTimestamp', Date.now().toString())
          
          addTerminalLine(`> ✓ New session created: ${newSessionId.substring(0, 20)}...`)
          addTerminalLine('> Redirecting to dashboard...')
          
          setTimeout(() => {
            redirectWithUUID('/dashboard', existingFace.uuid)
          }, 1000)
        } else {
          // ✅ INCOMPLETE DATA - Create NEW session and redirect to identity page
          addTerminalLine('> Missing required fields')
          addTerminalLine('> Creating new session...')
          
          const newSessionId = 'session-' + existingFace.uuid + '-' + Date.now()
          localStorage.setItem('userId', existingFace.uuid)
          localStorage.setItem('sessionId', newSessionId)
          localStorage.setItem('sessionTimestamp', Date.now().toString())
          
          addTerminalLine('> ✓ New session created')
          addTerminalLine('> Redirecting to identity page to complete profile...')
          
          setTimeout(() => {
            redirectWithUUID('/identity', existingFace.uuid)
          }, 1000)
        }
        
      } else {
        // ✅ NEW USER - Face NOT found in Firebase
        addTerminalLine('> No matching face in database')
        addTerminalLine('> Status: NEW USER DETECTED')
        addTerminalLine('> Clearing any previous session data...')
        
        // ✅ CLEAR OLD SESSION FIRST (Important for new user)
        localStorage.removeItem('userId')
        localStorage.removeItem('sessionId')
        localStorage.removeItem('sessionTimestamp')
        
        addTerminalLine('> Generating secure UUID for new user...')
        
        // Import utilities
        const { generateUserId, redirectWithUUID } = await import('../utils/uuid')
        const { storeUserProfile } = await import('../utils/faceVerification')
        const newUserId = generateUserId()
        
        addTerminalLine(`> UUID generated: ${newUserId}`)
        addTerminalLine('> Storing face vector to Firebase...')
        
        // ✅ STEP 3: Store NEW face vector in Firebase with NEW UUID
        const storeResult = await storeFaceVector(faceVector, newUserId)
        
        if (storeResult.success) {
          addTerminalLine('> ✓ Face vector stored in Firebase!')
          addTerminalLine(`> ✓ UUID: ${storeResult.uuid}`)
          addTerminalLine('> Creating user profile document...')
          
          // ✅ STEP 4: Create basic user profile in Firebase for NEW user
          try {
            const profileResult = await storeUserProfile(newUserId, {
              // Empty profile to be filled later
              profile: {
                fullName: '',
                email: '',
                phone: '',
                organization: '',
                role: '',
                location: ''
              },
              account: {
                status: 'pending',
                plan: 'basic',
                createdAt: new Date().toISOString(),
                credits: 10
              }
            })
            
            if (profileResult.success) {
              addTerminalLine('> ✓ User profile created in Firebase')
            } else {
              addTerminalLine('> ⚠ User profile creation failed')
            }
          } catch (fbError) {
            console.log('Firebase user profile creation failed:', fbError)
            addTerminalLine('> ⚠ User profile creation failed - will create on identity page')
          }
          
          // ✅ Create NEW session for NEW user
          addTerminalLine('> Creating new session for new user...')
          const newSessionId = 'session-' + newUserId + '-' + Date.now()
          localStorage.setItem('userId', newUserId)
          localStorage.setItem('sessionId', newSessionId)
          localStorage.setItem('sessionTimestamp', Date.now().toString())
          
          addTerminalLine(`> ✓ New session created: ${newSessionId.substring(0, 20)}...`)
          addTerminalLine('> Redirecting to identity page to complete profile...')
          
          setTimeout(() => {
            redirectWithUUID('/identity', newUserId)
          }, 1500)
        } else {
          addTerminalLine('> ⚠ Firebase unavailable')
          addTerminalLine('> Proceeding with UUID anyway...')
          
          // Still create session even if Firebase fails
          const newSessionId = 'session-' + newUserId + '-' + Date.now()
          localStorage.setItem('userId', newUserId)
          localStorage.setItem('sessionId', newSessionId)
          localStorage.setItem('sessionTimestamp', Date.now().toString())
          
          setTimeout(() => {
            redirectWithUUID('/identity', newUserId)
          }, 1500)
        }
      }
      
    } catch (error) {
      console.error('Verification error:', error)
      addTerminalLine(`> ERROR: ${error.message}`)
      addTerminalLine('> System will reset in 3 seconds...')
      
      setHasError(true)
      setPopupResult({
        type: 'error',
        message: `Verification failed: ${error.message}. System will reset automatically.`
      })
      setShowPopup(true)
      
      // Auto-reset after 3 seconds
      setTimeout(() => {
        setShowPopup(false)
        resetScan()
      }, 3000)
    }
  }

  // Add terminal line
  const addTerminalLine = (line) => {
    setTerminalLines(prev => [...prev, line])
  }

  // Typing animation for initial terminal lines
  useEffect(() => {
    let currentLineIndex = 0
    let currentCharIndex = 0
    let currentLine = ''

    const typeInterval = setInterval(() => {
      if (currentLineIndex < Math.min(5, hackingCode.length)) {
        const fullLine = hackingCode[currentLineIndex]
        
        if (currentCharIndex < fullLine.length) {
          currentLine += fullLine[currentCharIndex]
          currentCharIndex++
          
          setTerminalLines(prev => {
            const newLines = [...prev]
            newLines[currentLineIndex] = currentLine
            return newLines
          })
        } else {
          currentLineIndex++
          currentCharIndex = 0
          currentLine = ''
        }
      } else {
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <div className="face-scan-container">
      <motion.div 
        className="face-scan-box"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="scan-header">
          <div className="scan-title">
            <Shield className="scan-icon" />
            <h2>Security Scan In Progress</h2>
          </div>
          <div className="scan-status">
            <Activity className="status-icon pulsing" />
            <span>Live</span>
          </div>
        </div>

        {/* Main Content: Camera + Terminal */}
        <div className="scan-content">
          {/* Left: Camera Screen */}
          <div className="camera-section">
            <div className="camera-container">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="camera-feed"
                width="720"
                height="560"
              />
              <canvas 
                ref={canvasRef}
                className="camera-canvas"
                width="720"
                height="560"
              />
              <div className="camera-overlay">
                <div className="scan-frame">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                </div>
                <div className="scan-line"></div>
              </div>
              <div className="camera-info">
                <Camera size={16} />
                <span>{message}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="scan-progress">
              <div className="progress-label">
                <span>Scanning Progress</span>
                <span className="progress-percent">{scanningProgress}%</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-bar-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${scanningProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Right: Terminal/Code Display */}
          <div className="terminal-section">
            <div className="terminal-header">
              <Terminal size={16} />
              <span>Security Terminal</span>
              <div className="terminal-controls">
                <span className="control-dot red"></span>
                <span className="control-dot yellow"></span>
                <span className="control-dot green"></span>
              </div>
            </div>
            <div className="terminal-body">
              {terminalLines.map((line, index) => (
                <div key={index} className="terminal-line">
                  <span className="line-prompt">$</span>
                  <span className="line-text">{line}</span>
                  {index === terminalLines.length - 1 && (
                    <span className="cursor-blink">_</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="scan-footer">
          <div className="footer-item">
            <Lock size={14} />
            <span>Encrypted Connection</span>
          </div>
          <div className="footer-item">
            <Wifi size={14} />
            <span>Secure Channel</span>
          </div>
          <div className="footer-item">
            <Shield size={14} />
            <span>Protected Scan</span>
          </div>
        </div>
      </motion.div>

      {/* Verification Popup */}
      <VerificationPopup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        result={popupResult}
        onRetry={() => {
          setShowPopup(false)
          resetScan()
        }}
      />
    </div>
  )
}

export default FaceScan
