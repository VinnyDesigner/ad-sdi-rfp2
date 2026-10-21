import React from 'react';

/**
 * SectionHeading Component
 * 
 * Implements 4 strict alignment patterns:
 * - Pattern A: align="center" -> Eyebrow, Title, and Subtitle all share the exact same center line.
 * - Pattern B: align="left" -> Eyebrow, Title, Subtitle all start at the exact same left margin.
 * - Pattern C: align="split" -> For multi-column / text-column layouts, constrained to the text column.
 * - Pattern D: action={...} -> Renders a flex row with heading group on left and action CTA on right.
 */
export default function SectionHeading({
  eyebrow,
  badge,
  badgeVariant = 'default',
  badgeColor,
  title,
  subtitle,
  align = 'center',
  action,
  maxWidth,
  className = ''
}) {
  const isLeft = align === 'left' || align === 'split';
  const alignClass = isLeft ? 'section-heading-left' : 'section-heading-center';

  // Badge/eyebrow content
  const badgeContent = badge || eyebrow;

  // Determine badge class or inline style
  let badgeClass = 'eyebrow-badge';
  if (badgeVariant && badgeVariant !== 'default') {
    badgeClass += ` badge-${badgeVariant}`;
  }

  const badgeStyle = badgeColor ? { color: badgeColor, borderColor: badgeColor } : undefined;

  const headingContent = (
    <div
      className={`section-header-group ${alignClass} ${className}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {badgeContent && (
        <div className="section-eyebrow-row">
          <span className={badgeClass} style={badgeStyle}>
            {badgeContent}
          </span>
        </div>
      )}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );

  // Pattern D: Heading paired with an action in a flex row
  if (action) {
    return (
      <div className={`section-header-action-row ${className}`}>
        <div className="action-row-heading">
          {headingContent}
        </div>
        <div className="action-row-cta">
          {action}
        </div>
      </div>
    );
  }

  return headingContent;
}
