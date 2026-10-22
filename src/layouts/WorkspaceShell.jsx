import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  MagnifyingGlass,
  Bell,
  Question,
  CaretLeft,
  CaretRight,
  Database,
  MapTrifold,
  Storefront,
  Sparkle,
  Cube,
  PlugsConnected,
  CheckSquare,
  Pulse,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Gauge,
  ChatCircleDots
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import ToastContainer from '../components/ToastContainer';
import NotificationDrawer from '../components/NotificationDrawer';
import GlobalSearchModal from '../components/GlobalSearchModal';
import PersonaSwitcherModal from '../components/PersonaSwitcherModal';

export default function WorkspaceShell() {
  const {
    user,
    notifications,
    lang,
    toggleLang,
    sidebarCollapsed,
    toggleSidebar,
    setIsSearchModalOpen,
    setIsNotificationDrawerOpen,
    setIsPersonaModalOpen
  } = useApp();

  const location = useLocation();
  const pathname = location.pathname;

  // Dark screens per brief: S10 Digital Twin and S11 Command Centre
  const isDarkScreen = pathname.startsWith('/digital-twin') || pathname.startsWith('/command-centre');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navGroups = [
    {
      group: 'DISCOVER',
      items: [
        { to: '/workspace/catalogue', label: 'Catalogue', icon: Database },
        { to: '/map-viewer', label: 'Map Viewer', icon: MapTrifold },
        { to: '/workspace/marketplace', label: 'Marketplace', icon: Storefront }
      ]
    },
    {
      group: 'BUILD',
      items: [
        { to: '/geoai-studio', label: 'GeoAI Studio', icon: Sparkle },
        { to: '/geoai-assistant', label: 'GeoAI Assistant', icon: ChatCircleDots },
        { to: '/digital-twin', label: 'Digital Twin', icon: Cube },
        { to: '/workspace/services', label: 'APIs & Services', icon: PlugsConnected }
      ]
    },
    {
      group: 'GOVERN',
      items: [
        { to: '/publishing', label: 'Publishing & Approvals', icon: CheckSquare },
        { to: '/quality-sla', label: 'Quality & SLA', icon: Pulse },
        { to: '/security-access', label: 'Security & Access', icon: ShieldCheck },
        { to: '/workspace/governance', label: 'Policies & Standards', icon: BookOpen }
      ]
    },
    {
      group: 'ENABLE',
      items: [
        { to: '/geomaturity', label: 'GeoMaturity & Training', icon: GraduationCap }
      ]
    },
    {
      group: 'PROGRAMME',
      items: [
        { to: '/command-centre', label: 'Command Centre', icon: Gauge }
      ]
    }
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased ${
        isDarkScreen ? 'dark-screen bg-[#0A1628] text-white' : 'bg-[#F5F7FA] text-[#14213D]'
      }`}
    >
      {/* 4.2 Top Bar — Workspace Shell (64px, Navy 900 #0B2545) */}
      <header className="h-16 bg-[#0B2545] border-b border-[#13315C] sticky top-0 z-40 px-4 flex items-center justify-between gap-4 text-white">
        {/* Left: DGE Logo white version + divider + Wordmark */}
        <div className="flex items-center gap-3.5 shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/assets/dge_logo_white.png"
              alt="Abu Dhabi Government Enablement"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
          <Link to="/command-centre" className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white tracking-tight">AD-SDI Portal</span>
            <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-full bg-[#13315C] text-slate-300 font-medium border border-white/10">
              Workspace
            </span>
          </Link>
        </div>

        {/* Center: Global Search Field (480px, Navy-700 fill per brief) */}
        <div className="hidden lg:flex flex-1 max-w-[480px]">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full h-10 bg-[#13315C] hover:bg-[#1C4378] text-left px-3 rounded-lg border border-white/10 flex items-center justify-between text-xs text-slate-300 transition-colors"
          >
            <span className="flex items-center gap-2 truncate">
              <MagnifyingGlass size={16} className="text-[#FFC20E]" weight="bold" />
              <span>Search datasets, services, maps, models...</span>
            </span>
            <kbd className="font-mono text-[10px] bg-[#0B2545] px-1.5 py-0.5 rounded text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Group: Public link, Help, Notifications, Lang, User Persona Block */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Public Portal Link */}
          <Link
            to="/"
            className="hidden sm:inline-flex items-center text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
          >
            Public Site ↗
          </Link>

          {/* Help */}
          <button
            onClick={() => alert('AD-SDI Operational Help Desk: Contact dge.support@adsdi.ae or dial 800-AD-SDI')}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Help & Documentation"
          >
            <Question size={18} />
          </button>

          {/* Notification bell with gold badge "3" per brief */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Notifications"
          >
            <Bell size={18} weight="bold" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#FFC20E] text-[#0B2545] text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Language toggle: EN | ع per brief */}
          <button
            onClick={toggleLang}
            className="px-2 py-1 text-xs font-semibold text-slate-300 hover:text-white rounded hover:bg-white/5 transition-colors"
          >
            {lang === 'en' ? 'EN | ع' : 'ع | EN'}
          </button>

          {/* User Persona Block: 32px avatar + Fatima A. + DMT Data Steward per brief */}
          <button
            onClick={() => setIsPersonaModalOpen(true)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/10 transition-colors text-left"
            title="Switch Simulated Account"
          >
            <div
              className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.initials}
            </div>
            <div className="hidden sm:block leading-tight pr-1">
              <div className="text-xs font-semibold text-white truncate max-w-[120px]">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-300 truncate max-w-[120px]">
                {user.entityShort} · {user.role}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Body with Side Navigation + Workspace Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 4.3 Side Navigation Pane (240px wide, or 72px collapsed) */}
        <aside
          className={`shrink-0 transition-all duration-300 border-r flex flex-col justify-between z-30 ${
            sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'
          } ${
            isDarkScreen
              ? 'bg-[#13233D] border-white/10 text-white'
              : 'bg-white border-[#E3E8EF] text-[#14213D]'
          }`}
        >
          {/* Top navigation groups */}
          <div className="p-3 overflow-y-auto space-y-6 flex-1">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-1">
                {!sidebarCollapsed && (
                  <div
                    className={`px-3 text-[11px] font-semibold tracking-wider uppercase mb-1.5 ${
                      isDarkScreen ? 'text-slate-400' : 'text-[#7A9CC6]'
                    }`}
                  >
                    {grp.group}
                  </div>
                )}
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all relative ${
                          isActive
                            ? isDarkScreen
                              ? 'bg-white/10 text-white font-semibold'
                              : 'bg-[#EEF3FA] text-[#0B2545] font-semibold'
                            : isDarkScreen
                            ? 'text-slate-300 hover:text-white hover:bg-white/5'
                            : 'text-[#5B6B7F] hover:text-[#0B2545] hover:bg-[#F5F7FA]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#FFC20E] rounded-r" />
                          )}
                          <Icon
                            size={18}
                            weight={isActive ? 'fill' : 'regular'}
                            className={`shrink-0 ${
                              isActive ? 'text-[#1F5FAD]' : 'text-current'
                            }`}
                          />
                          {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom of sidebar: environment pill, version, collapse toggle */}
          <div
            className={`p-3 border-t text-[11px] space-y-2 ${
              isDarkScreen ? 'border-white/10 text-slate-400' : 'border-[#E3E8EF] text-[#5B6B7F]'
            }`}
          >
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Production · UAE hosting</span>
                </div>
                <div className="flex items-center justify-between px-2 text-[10px]">
                  <span>Version v2.3</span>
                  <button
                    onClick={toggleSidebar}
                    className="flex items-center gap-1 text-slate-400 hover:text-current font-medium"
                  >
                    <span>‹ Collapse</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Production · UAE hosting" />
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-current"
                  title="Expand Sidebar"
                >
                  <CaretRight size={16} />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div className="flex-1 p-4 lg:p-8 max-w-[1440px] w-full mx-auto">
            <Outlet />
          </div>

          {/* Micro line at bottom-right per brief Section 1.4: 11px, 60% opacity */}
          <div
            className={`px-8 py-2.5 text-right text-[11px] opacity-60 select-none border-t ${
              isDarkScreen ? 'border-white/5 text-slate-400' : 'border-[#E3E8EF] text-[#5B6B7F]'
            }`}
          >
            Illustrative data — conceptual design · Abu Dhabi Spatial Data Infrastructure (AD-SDI)
          </div>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <PersonaSwitcherModal />
      <ToastContainer />
    </div>
  );
}
