import React from 'react';

export default function ProcessSteps({ steps = [] }) {
  return (
    <div className="process-steps-list">
      {steps.map((st, idx) => (
        <div key={idx} className="process-step-item">
          <div className="step-num-badge">{st.step || idx + 1}</div>
          <h4>{st.title}</h4>
          <p>{st.description || st.desc}</p>
        </div>
      ))}
    </div>
  );
}
