import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sliders, Eye, Sparkle, ShieldCheck, ArrowsLeftRight } from '@phosphor-icons/react';

export default function ImageComparison({
  beforeImage = '/assets/geoai_before.jpg',
  afterImage = '/assets/geoai_after.jpg',
  beforeLabel = 'March 2024 · Satellite Baseline',
  afterLabel = 'November 2026 · AI Change Detection',
  locationLabel = 'Abu Dhabi Coastal Sector · 24° 28\' 45" N, 54° 23\' 10" E'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'side-by-side' | 'toggle'
  const [toggleActive, setToggleActive] = useState('after');
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="editorial-comparison-wrapper">
      {/* Top Controls & Metadata Bar */}
      <div className="comparison-toolbar">
        <div className="comparison-meta">
          <span className="comparison-coord-badge">
            <span className="coord-dot"></span>
            {locationLabel}
          </span>
          <span className="comparison-tag">Resolution: 0.3m Nadir Ortho</span>
        </div>

        <div className="comparison-view-toggles" role="group" aria-label="Comparison View Mode">
          <button
            type="button"
            className={`comp-toggle-btn ${viewMode === 'slider' ? 'active' : ''}`}
            onClick={() => setViewMode('slider')}
          >
            <ArrowsLeftRight size={14} weight="bold" />
            Interactive Split
          </button>
          <button
            type="button"
            className={`comp-toggle-btn ${viewMode === 'side-by-side' ? 'active' : ''}`}
            onClick={() => setViewMode('side-by-side')}
          >
            <Eye size={14} weight="bold" />
            Side-by-Side
          </button>
          <button
            type="button"
            className={`comp-toggle-btn ${viewMode === 'toggle' ? 'active' : ''}`}
            onClick={() => setViewMode('toggle')}
          >
            <Sparkle size={14} weight="bold" />
            Instant Switch
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'slider' && (
        <div
          ref={containerRef}
          className="slider-viewport"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Base Layer: AFTER (Change Detection) */}
          <div className="slider-layer after-layer">
            <img src={afterImage} alt="Abu Dhabi development after AI change detection" />
            <div className="layer-tag after-tag">
              <span className="pill-dot success"></span>
              {afterLabel}
            </div>

            {/* Simulated Vector Spatial Detection Overlays */}
            <div className="spatial-annotation-card annot-1" style={{ top: '22%', left: '26%' }}>
              <span className="annot-pulse"></span>
              <div className="annot-tooltip">
                <strong>+24 Building Footprints</strong>
                <span>Model MR-B-007 · Confidence 94.2%</span>
              </div>
            </div>

            <div className="spatial-annotation-card annot-2" style={{ top: '48%', right: '16%' }}>
              <span className="annot-pulse"></span>
              <div className="annot-tooltip">
                <strong>New Marine Jetty & Basin</strong>
                <span>Coastline Change · 12,400 m²</span>
              </div>
            </div>

            <div className="spatial-annotation-card annot-3" style={{ bottom: '24%', left: '38%' }}>
              <span className="annot-pulse"></span>
              <div className="annot-tooltip">
                <strong>Paved Arterial Corridor</strong>
                <span>DMT Road Cadastre Synced</span>
              </div>
            </div>
          </div>

          {/* Top Layer: BEFORE (Clipped by slider position) */}
          <div
            className="slider-layer before-layer"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src={beforeImage} alt="Abu Dhabi coastal sector baseline prior to development" />
            <div className="layer-tag before-tag">
              <span className="pill-dot neutral"></span>
              {beforeLabel}
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="slider-divider-line"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-handle-pill" aria-label="Drag to compare before and after">
              <ArrowsLeftRight size={18} weight="bold" />
            </div>
          </div>
        </div>
      )}

      {viewMode === 'side-by-side' && (
        <div className="side-by-side-viewport">
          <div className="side-image-pane">
            <div className="side-pane-header">
              <span className="pill-dot neutral"></span>
              <strong>{beforeLabel}</strong>
            </div>
            <img src={beforeImage} alt="Baseline Satellite Imagery" />
          </div>
          <div className="side-image-pane">
            <div className="side-pane-header">
              <span className="pill-dot success"></span>
              <strong>{afterLabel}</strong>
            </div>
            <img src={afterImage} alt="AI Change Detection Imagery" />
          </div>
        </div>
      )}

      {viewMode === 'toggle' && (
        <div className="toggle-viewport">
          <div className="toggle-switcher-pills">
            <button
              type="button"
              className={`toggle-tab-btn ${toggleActive === 'before' ? 'active' : ''}`}
              onClick={() => setToggleActive('before')}
            >
              Baseline Survey (2024)
            </button>
            <button
              type="button"
              className={`toggle-tab-btn ${toggleActive === 'after' ? 'active' : ''}`}
              onClick={() => setToggleActive('after')}
            >
              AI Detected Changes (2026)
            </button>
          </div>
          <div className="toggle-image-container">
            <img
              src={toggleActive === 'before' ? beforeImage : afterImage}
              alt={toggleActive === 'before' ? beforeLabel : afterLabel}
            />
          </div>
        </div>
      )}

      {/* Editorial Caption & Governance Notice */}
      <div className="comparison-caption-footer">
        <p className="caption-text">
          <strong>GeoAI Automated Delta Analysis:</strong> Supervised feature extraction compares high-resolution orthoimagery against the sovereign DMT cadastre, highlighting unauthorized boundary shifts, newly completed foundations, and environmental alterations.
        </p>
        <span className="disclaimer-badge">
          <ShieldCheck size={14} weight="bold" color="var(--navy-700)" />
          Conceptual Demonstration · Supervised Human Analyst Review Enforced
        </span>
      </div>
    </div>
  );
}
