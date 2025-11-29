import React, { useState } from 'react'

export default function Reports({ reports, onSubmitReport }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reportType: 'issue',
    title: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const reportTypes = [
    { value: 'issue', label: '⚠️ Issue' },
    { value: 'irregularity', label: '🚨 Irregularity' },
    { value: 'observation', label: '📝 Observation' },
    { value: 'suggestion', label: '💡 Suggestion' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim() && formData.description.trim()) {
      onSubmitReport(formData)
      setFormData({
        name: '',
        email: '',
        reportType: 'issue',
        title: '',
        description: '',
      })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      reportType: 'issue',
      title: '',
      description: '',
    })
  }

  const getReportTypeLabel = (type) => {
    return reportTypes.find(r => r.value === type)?.label || type
  }

  return (
    <div className="reports-container">
      <div className="report-form-section">
        <h2>Submit a Report</h2>
        <p className="form-description">Help us monitor the election by reporting any issues, irregularities, or observations</p>
        {submitted && (
          <div className="success-message">
            ✓ Report submitted successfully! Thank you for your contribution.
          </div>
        )}
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Report Type *</label>
            <select name="reportType" value={formData.reportType} onChange={handleChange} required>
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Name (Optional)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of the report"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the issue"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">Submit Report</button>
            <button type="button" className="clear-button" onClick={handleClear}>Clear Form</button>
          </div>
        </form>
      </div>

      <div className="reports-list-section">
        <h3>Submitted Reports ({reports.length})</h3>
        {reports.length > 0 ? (
          <div className="reports-list">
            {reports.map((report, idx) => (
              <div key={idx} className={`report-item ${report.reportType}`}>
                <div className="report-header">
                  <div>
                    <span className="report-type-badge">
                      {getReportTypeLabel(report.reportType)}
                    </span>
                    <h4 className="report-title">{report.title}</h4>
                  </div>
                  <span className="report-timestamp">{report.timestamp}</span>
                </div>
                <p className="report-description">{report.description}</p>
                <div className="report-meta">
                  {report.name && <span className="meta-item"><span className="meta-label">By:</span> {report.name}</span>}
                  {report.email && <span className="meta-item"><span className="meta-label">Email:</span> {report.email}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reports">
            <p>No reports submitted yet.</p>
            <p>Be the first to report an issue or observation!</p>
          </div>
        )}
      </div>
    </div>
  )
}
