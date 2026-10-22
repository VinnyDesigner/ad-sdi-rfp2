import React from 'react';
import { CheckCircle, Info, Warning, XCircle, X } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md w-full">
      {toasts.map((toast) => {
        let Icon = CheckCircle;
        let iconColor = '#1E9E6A';
        let borderColor = '#1E9E6A';

        if (toast.type === 'warning') {
          Icon = Warning;
          iconColor = '#E8A317';
          borderColor = '#E8A317';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          iconColor = '#D64545';
          borderColor = '#D64545';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#2F80ED';
          borderColor = '#2F80ED';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#0B2545] text-white p-4 rounded-xl shadow-2xl flex items-start gap-3 border-l-4 transition-all duration-300 animate-slide-up"
            style={{ borderLeftColor: borderColor }}
            role="alert"
          >
            <Icon size={22} weight="fill" color={iconColor} className="shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white tracking-wide">{toast.title}</div>
              {toast.message && (
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
