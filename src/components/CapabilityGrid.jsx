import React from 'react';
import CapabilityCard from './CapabilityCard';

export default function CapabilityGrid({ capabilities = [], twoCol = false }) {
  const gridClass = twoCol ? 'capability-grid capability-grid-2col' : 'capability-grid';

  return (
    <div className={gridClass}>
      {capabilities.map((cap) => (
        <CapabilityCard key={cap.id} capability={cap} />
      ))}
    </div>
  );
}
