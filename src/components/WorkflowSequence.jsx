import React, { useState } from 'react';
import {
  MagnifyingGlass,
  ShieldCheck,
  Cpu,
  UserCheck,
  ShareNetwork,
  ArrowRight,
  CheckCircle
} from '@phosphor-icons/react';

export default function WorkflowSequence() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discover Trusted Data',
      action: 'Clearinghouse Catalog Search',
      icon: MagnifyingGlass,
      color: '#1F5FAD',
      entities: 'DMT / EAD / SCAD',
      description: 'Search 2,480 catalogued spatial datasets with validated ISO 19115 metadata, authoritative coordinate references, and coverage boundaries.',
      output: 'Validated layer reference & OGC endpoint'
    },
    {
      num: '02',
      title: 'Evaluate Quality & Access',
      action: 'Automated Gateway & DSA Check',
      icon: ShieldCheck,
      color: '#0E9F8E',
      entities: 'Custodians & DGE',
      description: 'Audit topological integrity and compliance against the 6-point Quality Gateway. Confirm bilateral Data Sharing Agreement (DSA) entitlements.',
      output: 'Audit clearance & authorized token'
    },
    {
      num: '03',
      title: 'Perform Spatial Analysis',
      action: 'GeoAI & 3D Simulation',
      icon: Cpu,
      color: '#7B4FD6',
      entities: 'Municipal Analysts & Planners',
      description: 'Execute automated change detection, run 4D flood or urban growth simulations, and intersect multi-agency utility and zoning layers.',
      output: 'Spatial delta vectors & analytical masks'
    },
    {
      num: '04',
      title: 'Review Findings',
      action: 'Supervised Human Verification',
      icon: UserCheck,
      color: '#E07B24',
      entities: 'Responsible Subject Experts',
      description: 'Certified government analysts inspect AI inference outputs, confirm confidence scores, and approve work orders prior to municipal enforcement.',
      output: 'Audited spatial work package'
    },
    {
      num: '05',
      title: 'Share & Reuse Outputs',
      action: 'Marketplace & Open Federation',
      icon: ShareNetwork,
      color: '#5DAA3A',
      entities: 'Cross-Government & Civic Partners',
      description: 'Publish vetted thematic layers to the sovereign marketplace for inter-agency reuse, or expose non-sensitive summaries via open developer APIs.',
      output: 'Published service & downstream APIs'
    }
  ];

  return (
    <div className="workflow-sequence-editorial">
      {/* Step Pills Navigation Bar */}
      <div className="workflow-steps-track" role="tablist" aria-label="End-to-End Workflow Stages">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.num}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`wf-step-pill ${isActive ? 'active' : ''}`}
              style={{ '--step-color': step.color }}
              onClick={() => setActiveStep(idx)}
            >
              <div className="wf-step-num">{step.num}</div>
              <div className="wf-step-pill-body">
                <span className="wf-step-title">{step.title}</span>
                <span className="wf-step-action">{step.action}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="wf-connector-arrow" aria-hidden="true">
                  <ArrowRight size={14} weight="bold" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="workflow-active-display" style={{ '--current-color': steps[activeStep].color }}>
        <div className="display-accent-strip"></div>
        <div className="display-grid">
          <div className="display-main-col">
            <div className="display-badge-row">
              <span className="display-step-counter">Stage {steps[activeStep].num} of 05</span>
              <span className="display-entity-tag">Lead Custodians: {steps[activeStep].entities}</span>
            </div>
            <h3 className="display-heading">{steps[activeStep].title}</h3>
            <p className="display-desc">{steps[activeStep].description}</p>
            <div className="display-output-box">
              <CheckCircle size={18} weight="fill" color={steps[activeStep].color} />
              <span>
                <strong>Stage Deliverable:</strong> {steps[activeStep].output}
              </span>
            </div>
          </div>

          <div className="display-side-col">
            <div className="side-metric-box">
              <span className="side-label">Operational Framework</span>
              <span className="side-val">Zero-Trust Federation</span>
              <p className="side-note">
                Full end-to-end provenance logged in immutable audit records adhering to UAE Data Protection Law and DGE governance.
              </p>
            </div>
            <div className="step-nav-buttons">
              <button
                type="button"
                className="step-btn prev"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                Previous Stage
              </button>
              <button
                type="button"
                className="step-btn next"
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
              >
                Next Stage
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
