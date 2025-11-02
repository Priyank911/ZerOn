import React, { useState, useEffect } from 'react'
import { Filter, Download, ExternalLink, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

const ScanHistory = ({ userId }) => {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, completed, started

  useEffect(() => {
    const fetchScanHistory = async () => {
      if (!userId) return

      try {
        setLoading(true)
        const scanRef = doc(db, 'scanreturn', userId)
        const scanSnap = await getDoc(scanRef)

        if (scanSnap.exists()) {
          const scanData = scanSnap.data()
          const scanResults = scanData.scanResults || []
          
          // Fetch additional status info from scans collection for each scan
          const enrichedScans = await Promise.all(
            scanResults.map(async (scan) => {
              try {
                const scanDocRef = doc(db, 'scans', scan.scanId)
                const scanDocSnap = await getDoc(scanDocRef)
                
                if (scanDocSnap.exists()) {
                  const scanDetails = scanDocSnap.data()
                  return {
                    ...scan,
                    status: scanDetails.status || scan.status,
                    progress: scanDetails.progress || scan.progress,
                    hasResults: scanDocSnap.exists()
                  }
                }
                return scan
              } catch (err) {
                console.error('Error fetching scan details:', err)
                return scan
              }
            })
          )
          
          const sortedScans = enrichedScans.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
          setScans(sortedScans)
          console.log('Scan history loaded:', sortedScans)
        } else {
          setScans([])
        }
      } catch (error) {
        console.error('Error fetching scan history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScanHistory()
    
    // Refresh scan status every 30 seconds
    const interval = setInterval(fetchScanHistory, 30000)
    return () => clearInterval(interval)
  }, [userId])

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={16} className="status-icon completed" />
      case 'started':
        return <Loader size={16} className="status-icon started" />
      default:
        return <AlertCircle size={16} className="status-icon pending" />
    }
  }

  const getStatusClass = (status) => {
    return status?.toLowerCase() || 'pending'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewResults = (scanId) => {
    // Fetch scan results from Firebase and display as JSON in new tab
    const fetchAndDisplayResults = async () => {
      try {
        const scanDocRef = doc(db, 'scans', scanId)
        const scanDoc = await getDoc(scanDocRef)
        
        if (scanDoc.exists()) {
          const scanData = scanDoc.data()
          
          // Sanitize / escape helpers
          const escapeHtml = (str) => {
            try {
              return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
            } catch (e) {
              return ''
            }
          }

          // Conservative HTML sanitizer (removes scripts, styles and on* attributes)
          const sanitizeHtml = (html) => {
            if (!html) return ''
            let s = String(html)
            // remove script and style blocks
            s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
            s = s.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
            // remove on* attributes (onclick, onerror, etc.)
            s = s.replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
            s = s.replace(/\son\w+\s*=\s*'[^']*'/gi, '')
            s = s.replace(/\son\w+\s*=\s*[^\s>]+/gi, '')
            // neutralize javascript: URIs
            s = s.replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi, '$1="#"')
            s = s.replace(/(href|src)\s*=\s*'javascript:[^']*'/gi, "$1='#'")
            return s
          }

          // Try to detect vulnerability arrays inside the scan data
          const vulnCandidates = scanData.vulnerabilities || scanData.vulns || scanData.issues || scanData.alerts || scanData.results
          const vulnerabilities = Array.isArray(vulnCandidates) ? vulnCandidates : null

          // Build content: if vulnerabilities exist, render them as alert blocks (escaped)
          const buildVulnHtml = (vulns) => {
            if (!vulns || !vulns.length) return ''
            return vulns.map((v) => {
              const title = escapeHtml(v.title || v.name || v.id || 'Vulnerability')
              const severity = escapeHtml((v.severity || v.level || 'info').toString())
              const desc = escapeHtml(v.description || v.summary || JSON.stringify(v, null, 2))
              return `
                <div class="vuln-card vuln-${severity.toLowerCase()}">
                  <div class="vuln-head"><strong>${title}</strong><span class="vuln-severity">${severity}</span></div>
                  <div class="vuln-body"><pre>${desc}</pre></div>
                </div>
              `
            }).join('\n')
          }

          // Create a new window and display safe output
          const newWindow = window.open('', '_blank')
          const safeJson = escapeHtml(JSON.stringify(scanData, null, 2))

          // If there's an HTML report field, sanitize it (do not inject raw)
          const rawHtmlReport = scanData.reportHtml || scanData.originalReport || scanData.rawReport || null
          const sanitizedReport = rawHtmlReport ? sanitizeHtml(rawHtmlReport) : null

          const vulnHtml = buildVulnHtml(vulnerabilities)

          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Scan Results - ${scanId}</title>
                <meta charset="utf-8" />
                <style>
                  body { background: #1e1e1e; color: #d4d4d4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; margin: 0; }
                  .container { max-width: 1100px; margin: 0 auto; }
                  h1 { color: #00ff88; margin-bottom: 12px; }
                  .section { margin-bottom: 18px; }
                  .vuln-card { background: #2a2a2d; border: 1px solid rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; margin-bottom: 10px; }
                  .vuln-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
                  .vuln-severity { font-size: 12px; padding: 4px 8px; border-radius: 999px; background: rgba(255,255,255,0.04); }
                  .vuln-card.vuln-critical .vuln-severity { background: rgba(255,50,50,0.12); color: #ff7b7b }
                  .vuln-card.vuln-high .vuln-severity { background: rgba(255,120,50,0.08); color: #ffb36b }
                  .vuln-card.vuln-medium .vuln-severity { background: rgba(255,200,50,0.06); color: #ffd88c }
                  .vuln-card.vuln-low .vuln-severity { background: rgba(50,200,255,0.04); color: #8be7ff }
                  pre { background: #252526; padding: 12px; border-radius: 6px; overflow: auto; font-size: 13px; line-height: 1.5; }
                  .sanitized-report { background: #111; padding: 12px; border-radius: 6px; border: 1px dashed rgba(255,255,255,0.03); }
                  .note { color: #9aa4ad; font-size: 13px }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Scan Results</h1>

                  <div class="section">
                    <div class="note">Summary (safe view):</div>
                    <pre>${safeJson}</pre>
                  </div>

                  ${vulnHtml ? (`<div class="section"><h2 style="color:#ffd86b">Vulnerabilities</h2>${vulnHtml}</div>`) : ''}

                  ${sanitizedReport ? (`<div class="section"><h2 style="color:#99ddff">Sanitized Original Report</h2><div class="sanitized-report">${sanitizedReport}</div></div>`) : ''}

                  ${(!vulnHtml && !sanitizedReport) ? `<div class="section"><div class="note">No vulnerability list or HTML report detected — showing JSON only.</div></div>` : ''}
                </div>
              </body>
            </html>
          `)
          newWindow.document.close()
        } else {
          alert('Scan results not found')
        }
      } catch (error) {
        console.error('Error fetching scan results:', error)
        alert('Failed to fetch scan results')
      }
    }
    
    fetchAndDisplayResults()
  }

  const filteredScans = scans.filter(scan => {
    if (filter === 'all') return true
    return scan.status?.toLowerCase() === filter
  })

  return (
    <div className="scan-history-container-dash">
      <div className="section-header-dash">
        <div className="section-header-content-dash">
          <h2 className="section-title-dash">Security Archives</h2>
          <p className="section-subtitle-dash">Review past scans and security analysis reports</p>
        </div>
        <div className="header-actions-dash">
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Scans</option>
            <option value="completed">Completed</option>
            <option value="started">In Progress</option>
          </select>
          <button className="action-btn-dash">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Scan History List */}
      <div className="scan-history-section">
        {loading ? (
          <div className="loading-state">
            <Loader size={24} className="spinner-icon" />
            <p>Loading scan history...</p>
          </div>
        ) : filteredScans.length === 0 ? (
          <div className="empty-state">
            <AlertCircle size={48} />
            <h3>No scans found</h3>
            <p>Start scanning domains to see your history here</p>
          </div>
        ) : (
          <div className="scan-history-list">
            {filteredScans.map((scan, index) => (
              <div key={scan.scanId || index} className="scan-history-item">
                <div className="scan-item-header">
                  <div className="scan-info-group">
                    <h4 className="scan-domain">{scan.domain}</h4>
                    <div className="scan-meta">
                      <Clock size={14} />
                      <span>{formatDate(scan.createdAt)}</span>
                    </div>
                  </div>
                  <div className="scan-status-group">
                    <div className={`scan-status ${getStatusClass(scan.status)}`}>
                      {getStatusIcon(scan.status)}
                      <span>{scan.status || 'Pending'}</span>
                    </div>
                    <span className="scan-plan-badge">{scan.plan || 'N/A'}</span>
                  </div>
                </div>

                <div className="scan-item-body">
                  <div className="scan-progress-info">
                    <span className="progress-label">Progress:</span>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${scan.progress || 0}%` }}
                      ></div>
                    </div>
                    <span className="progress-value">{scan.progress || 0}%</span>
                  </div>

                  {scan.status?.toLowerCase() === 'completed' && (
                    <button 
                      className="view-results-btn"
                      onClick={() => handleViewResults(scan.scanId)}
                    >
                      <ExternalLink size={16} />
                      View Full Results
                    </button>
                  )}
                </div>

                <div className="scan-item-footer">
                  <span className="scan-id">ID: {scan.scanId?.substring(0, 20)}...</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScanHistory