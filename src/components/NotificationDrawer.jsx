import React from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle, Warning, Info, Bell, ArrowRight } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function NotificationDrawer() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-[9000] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2545]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel (480px, Level 2 shadow, per brief) */}
      <div className="relative w-full max-w-[480px] bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#E3E8EF] animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-[#E3E8EF] flex items-center justify-between bg-[#F5F7FA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0B2545] flex items-center justify-center text-white">
              <Bell size={20} weight="fill" color="#FFC20E" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#14213D] flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFC20E] text-[#0B2545]">
                    {unreadCount} new
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#5B6B7F]">Platform security, QA, and workflow alerts</p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-2 text-[#5B6B7F] hover:text-[#14213D] hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close notifications"
          >
            <X size={20} />
          </button>
        </div>

        {/* Actions bar */}
        <div className="px-6 py-3 bg-white border-b border-[#E3E8EF] flex justify-between items-center text-xs">
          <span className="text-[#5B6B7F]">{notifications.length} total events</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-[#1F5FAD] hover:text-[#0B2545] font-medium hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => {
            let Icon = Info;
            let iconBg = 'bg-blue-50 text-[#1F5FAD]';
            if (item.type === 'success') {
              Icon = CheckCircle;
              iconBg = 'bg-emerald-50 text-[#1E9E6A]';
            } else if (item.type === 'warning') {
              Icon = Warning;
              iconBg = 'bg-amber-50 text-[#E8A317]';
            }

            return (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-4 rounded-xl border transition-all duration-200 flex gap-3 relative ${
                  item.read
                    ? 'bg-white border-[#E3E8EF] opacity-80 hover:opacity-100'
                    : 'bg-[#F9FBFD] border-[#7A9CC6]/40 shadow-sm'
                }`}
              >
                {!item.read && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FFC20E]" />
                )}
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${iconBg}`}>
                  <Icon size={18} weight="fill" />
                </div>
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#14213D] truncate">{item.title}</h4>
                    <span className="text-[11px] text-[#5B6B7F] shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#5B6B7F] mt-1 leading-relaxed">{item.message}</p>
                  {item.link && (
                    <Link
                      to={item.link}
                      onClick={() => setIsNotificationDrawerOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F5FAD] hover:text-[#0B2545] mt-2 group"
                    >
                      View in workspace
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3E8EF] bg-[#F5F7FA] text-center">
          <p className="text-[11px] text-[#5B6B7F]">
            Sovereign Audit Log · Synced with Abu Dhabi Government Cloud
          </p>
        </div>
      </div>
    </div>
  );
}
