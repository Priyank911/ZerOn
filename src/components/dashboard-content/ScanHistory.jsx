import React from 'react'
import { Filter, Download } from 'lucide-react'

const ScanHistory = () => {
  return (
    <div className="scan-history-container-dash">
      <div className="section-header-dash">
        <div className="section-header-content-dash">
          <h2 className="section-title-dash">Security Archives</h2>
          <p className="section-subtitle-dash">Review past scans and security analysis reports</p>
        </div>
        <div className="header-actions-dash">
          <button className="action-btn-dash secondary-dash">
            <Filter size={18} />
            Filter Results
          </button>
          <button className="action-btn-dash">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScanHistory