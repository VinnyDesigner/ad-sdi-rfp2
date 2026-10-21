import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Sliders,
  Sparkle,
  Eye,
  ShieldCheck,
  Robot,
  ChatCircleText,
  Clock,
  Gauge,
  LockKey
} from '@phosphor-icons/react';
import Container from '../../components/Container';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import CallToAction from '../../components/CallToAction';
import ImageComparison from '../../components/ImageComparison';
import { capabilities } from '../../data/capabilities';

export default function GeoAI() {
  const capData = capabilities.find((c) => c.id === 'geoai');

  const modelSpecs = [
    { label: 'Model Registry ID', value: 'MR-B-007 (Building Change Detection v3.2)' },
    { label: 'Evaluation Metrics', value: 'Precision: 0.93 | Recall: 0.89 | F1-Score: 0.91' },
    { label: 'Training Baseline', value: '14,200 verified UAE aerial & satellite samples' },
    { label: 'Model Drift Status', value: 'Stable (Continuous ground-truth re-benchmarking)' },
    { label: 'Inference Speed', value: '4 min 12 s across 15 km² high-density sector' },
    { label: 'Governance Rule', value: 'Mandatory human analyst verification before enforcement work orders' }
  ];

  return (
    <>
      <PageHero
        badge="Module B · #7B4FD6"
        title="GeoAI & Spatial Intelligence"
        lead="Transforming high-resolution aerial and satellite imagery into automated change detection, feature extraction, and conversational spatial intelligence with responsible human-in-the-loop governance."
        breadcrumbItems={[
          { label: 'Capabilities', to: '/capabilities' },
          { label: 'GeoAI & Spatial Intelligence' }
        ]}
      />

      {/* 1. Model Performance Banner */}
      <section className="section-sm section-alt">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-b)', display: 'block' }}>0.91</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Model F1-Score</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Precision 0.93 · Recall 0.89</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', display: 'block' }}>14,200</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Labelled Training Samples</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>UAE urban & desert terrain</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--mod-b)', display: 'block' }}>4 min 12 s</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Multi-Epoch Inference</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Full municipal sector scan</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', display: 'block' }}>100%</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)' }}>Human-in-the-Loop</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Mandatory analyst sign-off</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. GeoAI Studio: Automated Multi-Epoch Change Detection */}
      <section className="section">
        <Container>
          <div className="feature-split">
            <div>
              <SectionHeading
                badge="Computer Vision Pipeline"
                badgeVariant="purple"
                title="Automating Urban Change Detection"
                align="split"
              />
              <p>
                Monitoring municipal development across the vast geographic expanse of Abu Dhabi requires immense human surveying if conducted manually.
              </p>
              <p>
                The <strong>GeoAI Studio</strong> compares high-resolution optical captures over distinct epochs (e.g., T1 Jan 2027 vs T2 Aug 2027 at 0.5m resolution). Deep convolutional networks automatically detect new construction, demolitions, and structural expansions, calculating confidence scores and staging results for inspector verification.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/workflows" className="btn btn-secondary">
                  Review GeoAI Inspection Workflow <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Model Card & Triage Visual */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', margin: 0 }}>
                  Model Card: MR-B-007
                </h4>
                <span className="badge badge-success">Production Status</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ padding: '10px', background: 'rgba(123, 79, 214, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--mod-b)', display: 'block' }}>168</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>New Buildings</span>
                </div>
                <div style={{ padding: '10px', background: 'rgba(224, 123, 36, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--mod-d)', display: 'block' }}>21</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Demolitions</span>
                </div>
                <div style={{ padding: '10px', background: 'rgba(14, 159, 142, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--mod-c)', display: 'block' }}>25</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Extensions</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                {modelSpecs.map((spec, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{spec.label}:</span>
                    <strong style={{ color: 'var(--navy-900)', textAlign: 'right' }}>{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Comparison of Remote Sensing Epochs */}
          <div style={{ marginTop: '48px' }}>
            <SectionHeading
              badge="Multi-Epoch Comparison"
              badgeVariant="purple"
              title="Automated Delta Analysis Across Capture Epochs"
              subtitle="High-resolution satellite nadir view showing automated extraction of building footprints, roads, and earthworks across coastal Abu Dhabi."
              align="left"
            />

            <ImageComparison
              beforeImage="/assets/geoai_before.jpg"
              afterImage="/assets/geoai_after.jpg"
              beforeLabel="Epoch T1 (March 2024) · Pre-Development Baseline"
              afterLabel="Epoch T2 (November 2026) · AI Detected Footprints & Roads"
              locationLabel="Abu Dhabi Coastal Development Sector · 24° 28' 45″ N, 54° 23' 10″ E"
            />
          </div>
        </Container>
      </section>

      {/* 3. The Conversational GeoAI Assistant */}
      <section className="section section-alt">
        <Container>
          <div className="feature-split reverse">
            <div>
              <SectionHeading
                badge="Natural-Language Spatial Reasoning"
                badgeVariant="gold"
                title="Conversational GeoAI Assistant"
                align="split"
              />
              <p>
                Decision-makers rarely have the time to write complex SQL spatial queries or operate desktop GIS suites. The <strong>GeoAI Assistant</strong> allows non-technical officials to pose plain-language questions and receive verifiable geographic answers.
              </p>
              <p>
                Crucially, the Assistant incorporates <strong>"How I got this"</strong> explainability: breaking down its spatial operations step-by-step, referencing authoritative source datasets, respecting data classification boundaries, and appending explicit verification notices.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Transparent 5-step spatial reasoning audit trail</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Automated exclusion of restricted layers without clearance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="var(--success)" weight="bold" />
                  <span style={{ fontSize: '0.88rem' }}>Air-gapped sovereign inference with zero foreign API leakage</span>
                </div>
              </div>
            </div>

            {/* Chat Assistant Mockup from Design Brief S07 */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkle size={18} color="var(--mod-b)" weight="fill" />
                  <strong style={{ fontSize: '0.94rem', color: 'var(--navy-900)' }}>GeoAI Spatial Assistant</strong>
                </div>
                <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>Sovereign LLM</span>
              </div>

              {/* User Prompt */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <div style={{ background: 'var(--navy-900)', color: '#fff', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontSize: '0.84rem', maxWidth: '85%' }}>
                  Show schools within 500m of high-traffic roads in Al Ain and count them by district.
                </div>
              </div>

              {/* Assistant Response */}
              <div style={{ background: 'var(--canvas)', borderRadius: '12px 12px 12px 2px', padding: '14px', fontSize: '0.84rem' }}>
                <strong style={{ color: 'var(--navy-900)', display: 'block', marginBottom: '6px' }}>
                  47 schools in 9 districts are located within 500m of high-traffic corridors.
                </strong>

                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '10px', margin: '8px 0' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--navy-900)', textTransform: 'uppercase' }}>
                    How I got this (Spatial Pipeline):
                  </span>
                  <ol style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <li>Selected approved datasets: Schools (ADEK), Roads (DMT)</li>
                    <li>Constructed 500m geometric buffer along arterial corridors</li>
                    <li>Intersected school points with buffer geometry</li>
                    <li>Grouped results by municipal district polygon</li>
                  </ol>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>● Schools (ADEK)</span>
                  <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>● Roads (DMT)</span>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Districts (DMT)</span>
                </div>

                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '8px', fontStyle: 'italic' }}>
                  AI-generated spatial output. Verified against ISO 19115 metadata catalog.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Responsible AI & Guardrail Framework */}
      <section className="section">
        <Container>
          <SectionHeading
            badge="Responsible AI"
            badgeVariant="purple"
            title="Sovereign AI Ethics & Verification Guardrails"
            subtitle="Adhering to strict UAE national artificial intelligence directives to guarantee transparency, fairness, and accountability."
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <ShieldCheck size={26} color="var(--mod-b)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>Human-in-the-Loop Sign-Off</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                AI detections are treated as provisional alerts. No automated penalty or master cadastral update occurs without verification by a certified spatial analyst.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <LockKey size={26} color="var(--mod-b)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>Air-Gapped Sovereign Hosting</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                All neural weights, training samples, and prompt reasoning pipelines operate inside sovereign UAE data centers, ensuring zero exposure to international commercial clouds.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <Eye size={26} color="var(--mod-b)" weight="bold" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '8px' }}>Model Drift Auditing</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Every computer vision model undergoes quarterly retraining with new ground-truth samples to maintain high precision against shifting seasonal desert and coastal conditions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Explore a GeoAI Proof-of-Concept for Your Entity"
        lead="Our machine learning engineers can demonstrate automated change detection or feature extraction on your department’s high-resolution satellite imagery."
        primaryBtnText="Request GeoAI Demonstration"
        primaryBtnLink="/contact"
      />
    </>
  );
}
