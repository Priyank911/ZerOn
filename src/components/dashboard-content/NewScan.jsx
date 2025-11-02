import React from 'react'
import { BarChart3, Shield } from 'lucide-react'

const NewScan = () => {
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
    </div>
  )
}

export default NewScan