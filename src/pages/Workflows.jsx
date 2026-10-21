import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowsClockwise,
  CheckCircle,
  PlayCircle,
  ShieldCheck,
  Brain,
  Storefront,
  SquaresFour,
  GlobeHemisphereEast,
  User,
  CaretRight
} from '@phosphor-icons/react';
import Container from '../components/Container';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CallToAction from '../components/CallToAction';
import { workflows } from '../data/workflows';

export default function Workflows() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('workflow-a');
  const activeWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  return (
    <>
      <PageHero
        badge="Operational Scenarios & Architecture in Action"
        title="End-to-End Government Workflows"
        lead="Discover how the proposed AD-SDI platform capabilities collaborate in daily operations to solve real challenges for Abu Dhabi government entities."
        breadcrumbItems={[{ label: 'Operational Workflows' }]}
      />

      {/* 1. Workflow Selector Strip */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '12px'
          }}>
            {workflows.map((wf) => {
              const isSelected = wf.id === selectedWorkflowId;
              return (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => setSelectedWorkflowId(wf.id)}
                  style={{
                    background: isSelected ? 'var(--navy-900)' : 'var(--surface)',
                    color: isSelected ? '#fff' : 'var(--navy-900)',
                    border: isSelected ? '1px solid var(--navy-900)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-subtle)',
                    borderLeft: `4px solid ${wf.capabilityColor}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: isSelected ? 'var(--gold-400)' : wf.capabilityColor,
                      textTransform: 'uppercase'
                    }}>
                      {wf.code}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                      5 Stages
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.94rem', display: 'block', marginBottom: '2px' }}>
                    {wf.title}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                    {wf.primaryCapability}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 2. Active Workflow Detailed Walkthrough */}
      <section className="section">
        <Container>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px', marginBottom: '28px' }}>
              <div>
                <span className="badge" style={{ backgroundColor: `${activeWorkflow.capabilityColor}15`, color: activeWorkflow.capabilityColor, marginBottom: '8px' }}>
                  {activeWorkflow.code} · {activeWorkflow.primaryCapability}
                </span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--navy-900)', margin: '4px 0 8px 0' }}>
                  {activeWorkflow.title}
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {activeWorkflow.subtitle}
                </p>
              </div>

              <div style={{ background: 'var(--canvas)', borderRadius: 'var(--radius-md)', padding: '14px 18px', maxWidth: '380px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-900)', letterSpacing: '0.05em' }}>
                  Target Operational Outcome:
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                  {activeWorkflow.outcome}
                </p>
              </div>
            </div>

            {/* Stakeholder Need Box */}
            <div style={{
              padding: '16px 20px',
              background: 'rgba(31, 95, 173, 0.06)',
              borderLeft: `4px solid ${activeWorkflow.capabilityColor}`,
              borderRadius: 'var(--radius-sm)',
              marginBottom: '32px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <User size={20} color={activeWorkflow.capabilityColor} weight="bold" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--navy-900)' }}>Stakeholder Operational Requirement:</strong>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                  {activeWorkflow.userNeed}
                </p>
              </div>
            </div>

            {/* Stage-by-Stage Steps */}
            <SectionHeading
              badge="Stage Progression"
              badgeVariant="navy"
              title="Step-by-Step Architecture Execution"
              subtitle="How data flows across platform modules, governance gates, and user personas."
              align="left"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeWorkflow.stages.map((stage) => (
                <div
                  key={stage.step}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    padding: '20px',
                    background: 'var(--canvas)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: activeWorkflow.capabilityColor,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    flexShrink: 0
                  }}>
                    {stage.step}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--navy-900)' }}>
                        {stage.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                          {stage.module}
                        </span>
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          {stage.badge}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Simulate Your Department’s Operational Workflow"
        lead="Our enterprise architects can map your agency’s specific spatial data sharing, review, or AI inspection requirements into a tailored workflow blueprint."
        primaryBtnText="Schedule Operational Workshop"
        primaryBtnLink="/contact"
      />
    </>
  );
}
