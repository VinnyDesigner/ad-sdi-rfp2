import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  MagnifyingGlass,
  Bell,
  User,
  List,
  X,
  ShieldCheck,
  House,
  Database,
  MapTrifold,
  Storefront,
  FileText,
  Code
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import ToastContainer from '../components/ToastContainer';
import NotificationDrawer from '../components/NotificationDrawer';
import GlobalSearchModal from '../components/GlobalSearchModal';
import PersonaSwitcherModal from '../components/PersonaSwitcherModal';
import Footer from '../components/Footer';

export default function PublicShell() {
  const {
    user,
    notifications,
    lang,
    setLang,
    toggleLang,
    setIsSearchModalOpen,
    setIsNotificationDrawerOpen,
    setIsPersonaModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { to: '/', label: 'Home', labelAr: 'الرئيسية' },
    { to: '/catalogue', label: 'Data & Catalogue', labelAr: 'البيانات والفهرس' },
    { to: '/maps-services', label: 'Maps & Services', labelAr: 'الخرائط والخدمات' },
    { to: '/marketplace', label: 'Marketplace', labelAr: 'سوق البيانات' },
    { to: '/open-data', label: 'Open Data', labelAr: 'البيانات المفتوحة' },
    { to: '/developers', label: 'Developers', labelAr: 'المطورون' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#14213D] font-sans antialiased">
      {/* Public Top Bar (72px, per brief S01 & Section 4.5) */}
      <header className="h-[72px] bg-white border-b border-[#E3E8EF] sticky top-0 z-50 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between gap-3 lg:gap-4">
          {/* Left: DGE Government Logo (Aspect Ratio Preserved, Brand Text Removed) */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="Department of Government Enablement — Home"
            >
              <img
                src="/assets/dge_logo.png"
                alt="Abu Dhabi Government Enablement"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Main Public Navigation (Single-line Flexbox, No-Wrap) */}
          <nav
            className="hidden xl:flex items-center flex-nowrap gap-1 2xl:gap-2 mx-1"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-2.5 2xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative whitespace-nowrap shrink-0 flex items-center ${
                    isActive
                      ? 'text-[#0B2545] font-semibold'
                      : 'text-[#5B6B7F] hover:text-[#0B2545] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="whitespace-nowrap">{lang === 'ar' ? link.labelAr : link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 2xl:left-3.5 2xl:right-3.5 h-[2.5px] bg-[#FFC20E] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Group: Search, Notifications, EN | AR, Workspace PRO, User Avatar */}
          <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-2.5 shrink-0">
            {/* Global Search Button (Shortcut badge removed, icon and function preserved) */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 rounded-lg text-[#5B6B7F] hover:text-[#0B2545] hover:bg-[#F5F7FA] border border-transparent hover:border-[#E3E8EF] transition-all flex items-center justify-center shrink-0 cursor-pointer"
              title="Global Search"
              aria-label="Global Search"
            >
              <MagnifyingGlass size={19} weight="bold" />
            </button>

            {/* Notification Bell with Badge */}
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 rounded-lg text-[#5B6B7F] hover:text-[#0B2545] hover:bg-[#F5F7FA] border border-transparent hover:border-[#E3E8EF] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={19} weight="bold" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FFC20E] text-[#0B2545] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Compact Language Selector: EN | AR */}
            <div
              className="inline-flex items-center h-8 px-1.5 py-0.5 rounded-lg border border-[#E3E8EF] bg-[#F8FAFC] text-xs font-semibold shrink-0 select-none"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'text-[#0B2545] font-bold bg-white shadow-2xs'
                    : 'text-[#5B6B7F] hover:text-[#0B2545]'
                }`}
                title="English"
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span className="text-[#CBD5E1] mx-0.5 text-xs select-none" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  lang === 'ar'
                    ? 'text-[#0B2545] font-bold bg-white shadow-2xs'
                    : 'text-[#5B6B7F] hover:text-[#0B2545]'
                }`}
                title="العربية (Arabic)"
                aria-pressed={lang === 'ar'}
              >
                AR
              </button>
            </div>

            {/* Workspace Link & Persona Avatar */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 border-l border-[#E3E8EF] shrink-0">
              <Link
                to="/command-centre"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold bg-[#0B2545] text-white hover:bg-[#13315C] transition-colors shadow-xs shrink-0"
              >
                <span>Workspace</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FFC20E] text-[#0B2545] font-bold leading-none">
                  PRO
                </span>
              </Link>

              {/* Persona Avatar */}
              <button
                type="button"
                onClick={() => setIsPersonaModalOpen(true)}
                className="flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#1F5FAD]/25 transition-all shrink-0 cursor-pointer"
                title={`Active User: ${user.name} (${user.role}) - Click to switch persona`}
                aria-label="Switch User Persona"
              >
                <div
                  className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.initials}
                </div>
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-[#5B6B7F] hover:text-[#0B2545] hover:bg-[#F5F7FA] xl:hidden flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-[#E3E8EF] shadow-xl p-4 space-y-2 z-50">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEF3FA] text-[#0B2545] font-semibold'
                      : 'text-[#14213D] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <span>{lang === 'ar' ? link.labelAr : link.label}</span>
              </NavLink>
            ))}
            <div className="pt-3 border-t border-[#E3E8EF] flex flex-col gap-2">
              <Link
                to="/command-centre"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#0B2545] text-white hover:bg-[#13315C] transition-colors"
              >
                Enter Government Workspace (PRO)
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        {isHomePage ? (
          <Outlet />
        ) : (
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Outlet />
          </div>
        )}
      </main>

      {/* Footer: Home page uses the full rich footer; other public pages use the slim sovereign footer per brief */}
      {isHomePage ? (
        <Footer />
      ) : (
        <footer className="h-14 bg-[#0B2545] text-white border-t border-[#13315C] px-6 text-xs flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">
              © 2026 Department of Government Enablement (DGE)
            </span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">
              100% UAE Sovereign Infrastructure & ISO 19115 Aligned
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link to="/open-data" className="hover:text-white transition-colors">
              Open Data License
            </Link>
            <Link to="/developers" className="hover:text-white transition-colors">
              APIs
            </Link>
            <Link to="/command-centre" className="hover:text-[#FFC20E] transition-colors">
              Operational Workspace
            </Link>
            <span className="text-[11px] text-slate-400 opacity-70">
              Illustrative data — conceptual design
            </span>
          </div>
        </footer>
      )}

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <PersonaSwitcherModal />
      <ToastContainer />
    </div>
  );
}
