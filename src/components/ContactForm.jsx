import React, { useState } from 'react';
import { PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    interest: 'Clearinghouse & Spatial Data Discovery',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.organization.trim()) errs.organization = 'Please provide your organization or government entity.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your official work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid work email address.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a message or requirements summary (minimum 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setReferenceId(`AD-SDI-BD-${Math.floor(100000 + Math.random() * 900000)}`);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="contact-form" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E8F7F0', color: '#1E9E6A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <CheckCircle size={36} weight="fill" />
        </div>
        <h3 style={{ color: 'var(--navy-900)', fontSize: '1.6rem', marginBottom: '12px' }}>
          Enquiry Received (Simulated)
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
          Thank you, <strong>{formData.name}</strong>. Your consultation enquiry regarding <strong>{formData.interest}</strong> has been logged for our solution architecture team.
        </p>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.85rem' }}>
          <div><strong>Entity:</strong> {formData.organization}</div>
          <div style={{ marginTop: '4px' }}><strong>Contact Email:</strong> {formData.email}</div>
          <div style={{ marginTop: '4px' }}><strong>Reference:</strong> {referenceId}</div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              organization: '',
              email: '',
              interest: 'Clearinghouse & Spatial Data Discovery',
              message: ''
            });
          }}
        >
          Submit Another Consultation Request
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="e.g., Eng. Tariq Al Mansoori"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="organization">
          Government Entity / Organization <span className="required">*</span>
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          className={`form-control ${errors.organization ? 'is-invalid' : ''}`}
          placeholder="e.g., Department of Municipalities and Transport"
          value={formData.organization}
          onChange={handleChange}
        />
        {errors.organization && <div className="form-error">{errors.organization}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Official Work Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="e.g., name@entity.gov.ae"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="interest">
          Primary Capability Area of Interest
        </label>
        <select
          id="interest"
          name="interest"
          className="form-control"
          value={formData.interest}
          onChange={handleChange}
        >
          <option value="Clearinghouse & Spatial Data Discovery">Module A: Clearinghouse & Portal</option>
          <option value="GeoAI & Spatial Intelligence">Module B: GeoAI & Spatial Intelligence</option>
          <option value="Marketplace & Product Entitlements">Module C: Marketplace & Entitlements</option>
          <option value="Capacity Building & GeoMaturity">Module D: Capacity Building & GeoMaturity</option>
          <option value="Digital Twin & 3D Simulation">Module E: Digital Twin & 3D Visualisation</option>
          <option value="Open Data & Developer APIs">Module F: Open Data & Civic Engagement</option>
          <option value="Whole-of-Government SDI Architecture">Complete Platform & Governance Strategy</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Specific Enquiries / Spatial Use Cases <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          placeholder="Describe your agency's geospatial datasets, current data exchange challenges, or target implementation timeline..."
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <div className="form-error">{errors.message}</div>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={isSubmitting}
      >
        <PaperPlaneTilt size={18} weight="bold" />
        {isSubmitting ? 'Transmitting Request...' : 'Submit Proposal Consultation Request'}
      </button>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '14px', marginBottom: 0 }}>
        Note: This is a stakeholder demonstration form simulating inquiry capture for proposal evaluation.
      </p>
    </form>
  );
}
