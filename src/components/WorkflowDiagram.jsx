import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Lightbulb, CheckSquare } from '@phosphor-icons/react';
import { workflows } from '../data/workflows';

export default function WorkflowDiagram({ defaultWorkflowId = 'workflow-a' }) {
  const [activeId, setActiveId] = useState(defaultWorkflowId);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentWorkflow = workflows.find((w) => w.id === activeId) || workflows[0];
  const activeStage = currentWorkflow.stages[activeStepIndex] || currentWorkflow.stages[0];

  const handleTabChange = (id) => {
    setActiveId(id);
    setActiveStepIndex(0);
  };

  return (
    <div className="workflow-diagram-wrap">
      {/* Workflow Tabs */}
      <div className="workflow-tab-bar" role="tablist">
        {workflows.map((wf) => (
          <button
            key={wf.id}
            type="button"
            role="tab"
            aria-selected={activeId === wf.id}
            className={`workflow-tab-btn ${activeId === wf.id ? 'active' : ''}`}
            onClick={() => handleTabChange(wf.id)}
          >
            <span>{wf.code}: {wf.title}</span>
          </button>
        ))}
      </div>

      {/* Main Workflow Stage Card */}
      <div className="workflow-stage-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <span
              className="badge"
              style={{ backgroundColor: `${currentWorkflow.capabilityColor}15`, color: currentWorkflow.capabilityColor }}
            >
              {currentWorkflow.code}
            </span>
            <h3 style={{ marginTop: '8px', fontSize: '1.4rem' }}>{currentWorkflow.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              {currentWorkflow.subtitle}
            </p>
          </div>
          <Link
            to="/workflows"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--blue-600)' }}
          >
            All Workflows <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* User Need Narrative */}
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <Lightbulb size={24} color="#E07B24" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '0.85rem', color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stakeholder Scenario:
            </strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {currentWorkflow.userNeed}
            </p>
          </div>
        </div>

        {/* Interactive Steps Grid */}
        <div className="workflow-stage-grid">
          {currentWorkflow.stages.map((stage, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={idx}
                className={`workflow-stage-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
                style={{
                  borderColor: isSelected ? currentWorkflow.capabilityColor : 'var(--border)',
                  backgroundColor: isSelected ? 'var(--surface)' : 'var(--canvas)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: currentWorkflow.capabilityColor }}>
                    STEP 0{stage.step}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.05)', color: 'var(--text-secondary)' }}>
                    {stage.badge}
                  </span>
                </div>
                <h5 style={{ color: 'var(--navy-900)', fontSize: '0.92rem', marginBottom: '4px' }}>
                  {stage.title}
                </h5>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {stage.module}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div style={{ marginTop: '20px', padding: '20px', borderRadius: 'var(--radius-md)', background: `${currentWorkflow.capabilityColor}08`, border: `1px solid ${currentWorkflow.capabilityColor}25` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, color: currentWorkflow.capabilityColor, fontSize: '0.85rem' }}>
              CURRENT FOCUS: STEP 0{activeStage.step} — {activeStage.title}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {activeStage.description}
          </p>
        </div>

        {/* Outcome Box */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start', background: '#E8F7F0', border: '1px solid rgba(30, 158, 106, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
          <CheckCircle size={22} color="#1E9E6A" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '0.85rem', color: '#126342', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Demonstrated Outcome:
            </strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.92rem', color: '#144B34' }}>
              {currentWorkflow.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
