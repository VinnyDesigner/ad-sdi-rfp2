import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Globe,
  Buildings,
  User,
  Eye,
  EyeSlash,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { switchPersona, addToast, lang, toggleLang } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('fatima.a@dmt.gov.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSsoLogin = (personaKey = 'fatima') => {
    setLoading(true);
    setTimeout(() => {
      switchPersona(personaKey);
      addToast(
        'Government SSO Authenticated',
        'Signed in successfully with Abu Dhabi Government Single Sign-On credentials.',
        'success'
      );
      navigate('/command-centre');
    }, 400);
  };

  const handlePartnerLogin = () => {
    setLoading(true);
    setTimeout(() => {
      switchPersona('omar');
      addToast(
        'Partner Authenticated',
        'Signed in with Masdar Urban Spatial Tech commercial credentials.',
        'success'
      );
      navigate('/marketplace/entitlements');
    }, 400);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    handleSsoLogin('fatima');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-[#14213D] font-sans">
      {/* Left Image & Trust Panel (820px, per brief S00) */}
      <div className="relative lg:w-[58%] xl:w-[60%] min-h-[420px] lg:min-h-screen bg-[#0B2545] p-8 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Background image & gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('/assets/hero_abudhabi_aerial.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/95 via-[#0B2545]/85 to-[#0B2545]/60" />

        {/* Top-Left: DGE Logo white version (48px tall) */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/">
            <img
              src="/assets/dge_logo_white.png"
              alt="Abu Dhabi Government Enablement"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="lg:hidden text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10"
          >
            ← Back to Portal
          </Link>
        </div>

        {/* Middle-Left Content */}
        <div className="relative z-10 max-w-xl my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium mb-6 backdrop-blur-sm border border-white/15">
            <ShieldCheck size={16} weight="fill" className="text-[#FFC20E]" />
            <span>UAE Sovereign Geospatial Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Abu Dhabi’s spatial data.{' '}
            <span className="text-[#FFC20E]">Trusted. Connected.</span>
          </h1>

          <p className="text-base lg:text-lg text-slate-200 leading-relaxed max-w-lg mb-8">
            One secure platform to discover, share and use authoritative geospatial data,
            OGC web services, and AI models across government and approved partners.
          </p>

          {/* 48px Gold accent line */}
          <div className="w-12 h-1 bg-[#FFC20E] rounded-full mb-10" />

          {/* Trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/15 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#FFC20E]" />
              </div>
              <div className="text-xs font-medium">UAE data residency guaranteed</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Lock size={20} className="text-[#FFC20E]" />
              </div>
              <div className="text-xs font-medium">Role-based secure access</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Globe size={20} className="text-[#FFC20E]" />
              </div>
              <div className="text-xs font-medium">Bilingual English & العربية</div>
            </div>
          </div>
        </div>

        {/* Bottom-left */}
        <div className="relative z-10 text-xs text-slate-400">
          Department of Government Enablement · Sovereign Platform v2.3
        </div>
      </div>

      {/* Right Panel: Sign-In Form (620px, per brief S00) */}
      <div className="flex-1 lg:w-[42%] xl:w-[40%] bg-white p-8 lg:p-14 flex flex-col justify-between overflow-y-auto">
        {/* Top-Right: Language toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E3E8EF]">
          {/* Subtle 6-module color bar signature */}
          <div className="flex items-center gap-1">
            <span className="w-4 h-1 rounded-full bg-[#1F5FAD]" title="Clearinghouse" />
            <span className="w-4 h-1 rounded-full bg-[#7B4FD6]" title="GeoAI" />
            <span className="w-4 h-1 rounded-full bg-[#0E9F8E]" title="Marketplace" />
            <span className="w-4 h-1 rounded-full bg-[#E07B24]" title="Capacity" />
            <span className="w-4 h-1 rounded-full bg-[#2BA6DE]" title="Digital Twin" />
            <span className="w-4 h-1 rounded-full bg-[#5DAA3A]" title="Open Data" />
          </div>

          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-[#0B2545] hover:bg-slate-200"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        {/* Sign In Body */}
        <div className="max-w-[420px] w-full mx-auto py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0B2545]">Sign in</h2>
            <p className="text-sm text-[#5B6B7F] mt-1">
              Access the Abu Dhabi Spatial Data Infrastructure workspace
            </p>
          </div>

          {/* Primary SSO Button */}
          <button
            onClick={() => handleSsoLogin('fatima')}
            disabled={loading}
            className="w-full h-12 bg-[#0B2545] hover:bg-[#13315C] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-sm mb-3 group"
          >
            <Buildings size={20} weight="fill" className="text-[#FFC20E]" />
            <span>Continue with Government account (SSO)</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary Partner Button */}
          <button
            onClick={handlePartnerLogin}
            disabled={loading}
            className="w-full h-12 bg-white hover:bg-[#F5F7FA] text-[#0B2545] border border-[#E3E8EF] hover:border-[#7A9CC6] rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-colors mb-6"
          >
            <User size={20} weight="bold" className="text-[#1F5FAD]" />
            <span>Partner or public account</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E3E8EF]" />
            </div>
            <span className="relative px-3 bg-white text-xs text-[#5B6B7F]">
              or sign in with email
            </span>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                Government Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[#E3E8EF] focus:border-[#1F5FAD] focus:ring-2 focus:ring-[#1F5FAD]/20 outline-none text-sm text-[#14213D] transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-3.5 pr-10 rounded-lg border border-[#E3E8EF] focus:border-[#1F5FAD] focus:ring-2 focus:ring-[#FFC20E] outline-none text-sm text-[#14213D] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B7F] hover:text-[#14213D]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1F5FAD] focus:ring-[#1F5FAD]"
                />
                <span className="text-[#5B6B7F]">Remember this device</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact your DMT/DGE IT directory administrator to reset your sovereign SSO passkey.'); }} className="text-[#1F5FAD] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#1F5FAD] hover:bg-[#164b8a] text-white rounded-lg font-semibold text-sm transition-colors shadow-xs"
            >
              {loading ? 'Authenticating...' : 'Sign in to Workspace'}
            </button>
          </form>

          {/* MFA Info note */}
          <div className="mt-6 flex items-start gap-2.5 p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-[#5B6B7F]">
            <ShieldCheck size={18} weight="fill" className="text-[#1F5FAD] shrink-0 mt-0.5" />
            <span>
              Multi-factor authentication (MFA) is required for privileged government data stewards and partner accounts.
            </span>
          </div>
        </div>

        {/* Bottom of right panel */}
        <div className="pt-6 border-t border-[#E3E8EF] flex items-center justify-between text-xs text-[#5B6B7F]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#0B2545] font-medium">All services operational</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/open-data" className="hover:underline">Open Data</Link>
            <Link to="/developers" className="hover:underline">Developers</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
