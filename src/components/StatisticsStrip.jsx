import React from 'react';
import { Database, Buildings, PlugsConnected, ShieldCheck } from '@phosphor-icons/react';
import Container from './Container';

const stats = [
  {
    icon: Database,
    value: '2,480',
    title: 'Datasets',
    detail: 'Across 64 government entities'
  },
  {
    icon: Buildings,
    value: '64',
    title: 'Contributing Entities',
    detail: 'Government custodians & authorities'
  },
  {
    icon: PlugsConnected,
    value: '1,150',
    title: 'OGC Web Services',
    detail: 'WMS, WFS, WMTS & APIs'
  },
  {
    icon: ShieldCheck,
    value: '99.9%',
    title: 'Platform Availability',
    detail: '24/7 sovereign uptime SLA'
  }
];

export default function StatisticsStrip() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 mb-8 sm:mb-12" aria-label="Platform Statistics">
      <Container wide>
        <div className="bg-white rounded-2xl border border-[#E3E8EF] shadow-md p-5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E3E8EF]">
            {stats.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 ${
                    idx === 0
                      ? 'lg:pr-6'
                      : idx === stats.length - 1
                      ? 'pt-4 sm:pt-0 lg:pl-6'
                      : 'pt-4 sm:pt-0 lg:px-6'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#1F5FAD] shrink-0 shadow-xs">
                    <IconComp size={22} weight="bold" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight leading-none">
                      {item.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#14213D] tracking-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#5B6B7F] font-normal leading-tight">
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
