import React, { useState } from 'react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="accordion-group">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              {isOpen ? (
                <CaretUp size={18} weight="bold" />
              ) : (
                <CaretDown size={18} weight="bold" />
              )}
            </button>
            {isOpen && (
              <div className="accordion-content">
                <p>{item.content}</p>
                {item.extra && <div className="accordion-extra">{item.extra}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
