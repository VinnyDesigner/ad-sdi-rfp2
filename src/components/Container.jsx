import React from 'react';

export default function Container({ children, className = '', wide = false, narrow = false }) {
  const widthClass = wide ? 'container-wide' : narrow ? 'container-narrow' : '';
  return (
    <div className={`container ${widthClass} ${className}`}>
      {children}
    </div>
  );
}
