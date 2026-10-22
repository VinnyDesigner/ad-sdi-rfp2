import React from 'react';
import { X, CheckCircle, UserSwitch, ShieldCheck } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function PersonaSwitcherModal() {
  const {
    user,
    currentPersonaKey,
    switchPersona,
    PERSONAS,
    isPersonaModalOpen,
    setIsPersonaModalOpen
  } = useApp();

  if (!isPersonaModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9600] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsPersonaModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E3E8EF] z-10 animate-fade-in">
        <div className="p-6 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-white flex items-center justify-center">
              <UserSwitch size={22} weight="fill" color="#FFC20E" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14213D]">Simulated Stakeholder Account</h3>
              <p className="text-xs text-[#5B6B7F]">Switch roles to test different governance and workspace permissions</p>
            </div>
          </div>
          <button
            onClick={() => setIsPersonaModalOpen(false)}
            className="p-1.5 text-[#5B6B7F] hover:text-[#14213D] rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {Object.entries(PERSONAS).map(([key, persona]) => {
            const isSelected = key === currentPersonaKey;
            return (
              <button
                key={key}
                onClick={() => {
                  switchPersona(key);
                  setIsPersonaModalOpen(false);
                }}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#1F5FAD] bg-[#EEF3FA] ring-2 ring-[#1F5FAD]/20'
                    : 'border-[#E3E8EF] hover:border-[#7A9CC6] hover:bg-[#F9FBFD]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: persona.avatarColor }}
                  >
                    {persona.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#14213D]">{persona.name}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#0B2545] border border-slate-200">
                        {persona.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#1F5FAD] font-medium">{persona.role}</div>
                    <div className="text-[11px] text-[#5B6B7F]">{persona.entity}</div>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle size={22} weight="fill" className="text-[#1F5FAD] shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-[#F5F7FA] border-t border-[#E3E8EF] flex items-center justify-between text-xs text-[#5B6B7F]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} weight="fill" className="text-[#1E9E6A]" />
            UAE Sovereign RBAC Simulated
          </span>
          <button
            onClick={() => setIsPersonaModalOpen(false)}
            className="text-xs font-semibold text-[#1F5FAD] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
