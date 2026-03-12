/* PROJECT: Lumnr (v1.2 - Stable)
  DESCRIPTION: Minimalist digital notebook with local persistence.
  TECH STACK: React, Tailwind CSS, Lucide Icons.
  STORAGE: Browser localStorage.
*/

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  PenLine, 
  Clock, 
  Search, 
  Settings,
  Share2, 
  Download,
  Copy,
  Twitter,
  ShieldCheck,
  FileText,
  X,
  Sun,
  Moon,
  Coffee,
  Heart,
  Pin,
  PinOff,
  RotateCcw,
  Trash,
  History,
  Home,
  Sparkles,
  Cloud,
  Star,
  Palette
} from 'lucide-react';

// ==========================================
// COMPONENT: Notebook Cover
// ==========================================
const NotebookCover = ({ color, pattern, title, onClick, isPinned }) => {
  const patterns = {
    stripes: 'pattern-stripes',
    dots: 'pattern-dots',
    floral: 'pattern-floral',
    none: ''
  };

  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col items-center transition-all duration-500 hover:-translate-y-3 active:scale-95 w-full"
    >
      {/* Book Body */}
      <div 
        className="relative w-full aspect-[3/4] rounded-r-2xl rounded-l-sm shadow-lg border border-black/5 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: color || '#ff9ebd' }}
      >
        {/* Animated Pattern Layer */}
        <div className={`absolute inset-0 opacity-30 ${patterns[pattern || 'none']}`}></div>
        
        {/* Spine Detail */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/10 border-r border-white/5"></div>
        
        {/* Pinned Indicator */}
        {isPinned && (
          <div className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm border border-black/5 animate-pop-in">
            <Pin size={10} className="text-[#ff6b8b] fill-current" strokeWidth={3} />
          </div>
        )}

        {/* Sticker Label */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[75%] aspect-[3/2] bg-white/90 backdrop-blur-sm rounded-md border border-black/5 flex items-center justify-center p-2 shadow-inner group-hover:bg-white transition-colors">
          <span className="text-[10px] font-black text-[#5d4037] line-clamp-3 text-center leading-tight">
            {title || 'Untitled'}
          </span>
        </div>

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
      </div>
      
      {/* Soft Shadow */}
      <div className="w-[80%] h-3 bg-black/10 blur-md rounded-full mt-2 group-hover:bg-black/20 transition-all group-hover:scale-110"></div>
    </button>
  );
};

// ==========================================
// COMPONENT: Home / Landing Page
// ==========================================
const HomePage = ({ theme, onStart, toggleTheme, setModalContent, notes, onSelectNote }) => {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-[#3b364c]' : 'bg-white';
  const iconColor = isDark ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]';
  const activeNotes = notes.filter(n => !n.deletedAt);

  return (
    <div className={`flex-1 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto relative font-['Quicksand',sans-serif] custom-pen-cursor ${isDark ? 'bg-[#2b2738]' : 'bg-[#fffcfd]'} ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'}`}>
      
      {/* Aesthetic Mimu Gridline Layer - Set to fixed to cover the entire scrollable area */}
      <div className={`fixed inset-0 z-0 opacity-30 pointer-events-none transform-gpu transition-all duration-700 ${isDark ? 'bg-grid-dark' : 'bg-grid-light'}`}></div>

      {/* Section 1: Hero & Top Bar */}
      <div className="relative w-full flex flex-col items-center z-10">
        {/* Floating Decors for Hero */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[10%] animate-float-mimu opacity-60 pointer-events-auto">
            <Cloud size={80} className="text-[#a6c9ff] transition-transform duration-500 hover:scale-125 hover:-rotate-12 cursor-pointer" fill="currentColor" />
          </div>
          <div className="absolute top-[45%] right-[12%] animate-bounce-slow opacity-80 pointer-events-auto" style={{ animationDelay: '1s' }}>
            <Star size={56} className="text-[#ffd700] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer" fill="currentColor" />
          </div>
          <div className="absolute top-[80%] left-[15%] animate-float-mimu opacity-70 pointer-events-auto" style={{ animationDelay: '2s' }}>
            <Sparkles size={64} className="text-[#c1f2d5] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer" />
          </div>
        </div>

        {/* Top Bar */}
        <div className="w-full p-6 md:p-8 flex justify-between items-center z-20 relative">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-[1.2rem] ${cardBg} shadow-sm border-2 ${isDark ? 'border-[#4a445d]' : 'border-[#ffe4e9]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6">
                <rect x="22" y="15" width="56" height="70" rx="8" fill="#ff9ebd"/>
                <rect x="22" y="15" width="12" height="70" rx="4" fill="#e07a9b"/>
                <rect x="45" y="30" width="20" height="12" rx="3" fill="#ffffff"/>
                <line x1="49" y1="36" x2="61" y2="36" stroke="#e07a9b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tight">lumnr</span>
          </div>
          <button 
            onClick={toggleTheme} 
            className={`p-3 rounded-full transition-transform hover:scale-110 active:scale-95 shadow-sm border-2 ${cardBg} ${isDark ? 'border-[#4a445d]' : 'border-[#ffe4e9]'}`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-[#ffd700]" /> : <Moon size={20} className="text-[#a6c9ff]" />}
          </button>
        </div>
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center max-w-3xl w-full text-center px-6 pt-12 pb-16 z-20 relative">
          <div>
             <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff9ebd] via-[#c1f2d5] to-[#a6c9ff]">
              lumnr.
            </h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 opacity-90">
            welcome to your digital sanctuary.
          </h2>
          <p className="text-lg md:text-xl font-bold max-w-xl mx-auto opacity-70 mb-12">
            a minimalist digital workspace designed to remove distractions and let your ideas shine.
          </p>
          <div>
            <button 
              onClick={onStart}
              className={`group px-12 py-5 rounded-full font-black text-xl flex items-center justify-center gap-3 transition-all duration-150 text-white ${isDark ? 'bg-[#ff8da1] shadow-[0_8px_0_#d86a80]' : 'bg-[#ff9ebd] shadow-[0_8px_0_#e07a9b]'} active:translate-y-[8px] active:shadow-none hover:brightness-105`}
            >
              <PenLine size={26} className="group-hover:rotate-12 transition-transform" /> 
              Start Writing
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Sanctuary Grid */}
      {activeNotes.length > 0 && (
        <div className="relative w-full flex flex-col items-center py-12 z-10">
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[10%] right-[10%] animate-bounce-slow opacity-50 pointer-events-auto" style={{ animationDelay: '0.5s' }}>
              <Heart size={48} className="text-[#ff9ebd] transition-transform duration-500 hover:scale-125 hover:-rotate-12 cursor-pointer" fill="currentColor" />
            </div>
            <div className="absolute top-[50%] left-[12%] animate-float-mimu opacity-40 pointer-events-auto" style={{ animationDelay: '1.5s' }}>
              <Cloud size={60} className="text-[#a6c9ff] transition-transform duration-500 hover:scale-125 hover:rotate-6 cursor-pointer" fill="currentColor" />
            </div>
            <div className="absolute bottom-[10%] right-[15%] animate-bounce-slow opacity-60 pointer-events-auto" style={{ animationDelay: '2.5s' }}>
              <Star size={40} className="text-[#ffd700] transition-transform duration-500 hover:scale-150 hover:-rotate-12 cursor-pointer" fill="currentColor" />
            </div>
          </div>
          <div className="w-full max-w-5xl px-6 flex flex-col items-center relative z-20">
            <h3 className="text-xl font-black mb-10 uppercase tracking-[0.25em] opacity-40">Your Sanctuary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-14 w-full">
              {activeNotes.map(note => (
                <NotebookCover 
                  key={note.id}
                  color={note.color}
                  pattern={note.cover}
                  title={note.title}
                  isPinned={note.pinned}
                  onClick={() => onSelectNote(note.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 3: FAQ Section with Multi-color Pastel Tiles */}
      <div className="relative w-full flex flex-col items-center py-24 z-10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[8%] animate-float-mimu opacity-50 pointer-events-auto" style={{ animationDelay: '0.8s' }}>
            <Sparkles size={50} className="text-[#c1f2d5] transition-transform duration-500 hover:scale-125 hover:rotate-45 cursor-pointer" />
          </div>
          <div className="absolute top-[45%] right-[8%] animate-bounce-slow opacity-45 pointer-events-auto" style={{ animationDelay: '3s' }}>
            <Heart size={40} className="text-[#ff9ebd] transition-transform duration-500 hover:scale-150 hover:-rotate-12 cursor-pointer" fill="currentColor" />
          </div>
          <div className="absolute bottom-[15%] left-[18%] animate-float-mimu opacity-35 pointer-events-auto" style={{ animationDelay: '1.2s' }}>
            <Cloud size={70} className="text-[#a6c9ff] transition-transform duration-500 hover:scale-110 hover:-rotate-6 cursor-pointer" fill="currentColor" />
          </div>
        </div>
        <div className="w-full max-w-5xl px-6 relative z-20">
          <h3 className="text-2xl font-black text-center mb-12 opacity-90">
            ✨ Good to know ✨
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Tile 1: Green */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:rotate-1 border-b-[6px] ${isDark ? 'bg-[#2d4239] border-[#1e2e27] text-[#c1f2d5]' : 'bg-[#e2f2d5] border-[#c9e5b8] shadow-sm'}`}>
              <h4 className="font-black text-2xl mb-4 flex items-center gap-3">
                <Cloud size={24} className={isDark ? 'text-[#c1f2d5]' : 'text-[#8cb369]'} /> Local only.
              </h4>
              <p className="font-bold opacity-90 text-lg leading-relaxed">Everything is stored securely in your browser's local storage. Zero servers, zero tracking. Just you and your thoughts.</p>
            </div>
            
            {/* Tile 2: Blue */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:-rotate-1 border-b-[6px] ${isDark ? 'bg-[#2d3b42] border-[#1e272e] text-[#a6c9ff]' : 'bg-[#d5e8f2] border-[#b8d7e5] shadow-sm'}`}>
              <h4 className="font-black text-2xl mb-4 flex items-center gap-3">
                <Star size={24} className={isDark ? 'text-[#a6c9ff]' : 'text-[#5fa8d3]'} /> Auto-save.
              </h4>
              <p className="font-bold opacity-90 text-lg leading-relaxed">Yes! Lumnr automatically saves your progress as you type, and quietly creates a backup snapshot every 5 minutes.</p>
            </div>
            
            {/* Tile 3: Yellow/Peach */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:rotate-1 border-b-[6px] ${isDark ? 'bg-[#423d2d] border-[#2e2b1e] text-[#f2ecd5]' : 'bg-[#f2ecd5] border-[#e5dec1] shadow-sm'}`}>
              <h4 className="font-black text-2xl mb-4 flex items-center gap-3">
                <Trash2 size={24} className={isDark ? 'text-[#f2ecd5]' : 'text-[#bcac75]'} /> Cache care.
              </h4>
              <p className="font-bold opacity-90 text-lg leading-relaxed">Clearing your browser cache will delete local documents. Use the "Export" feature to keep physical backups of important work.</p>
            </div>
            
            {/* Tile 4: Purple */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:rotate-1 border-b-[6px] ${isDark ? 'bg-[#3b2d42] border-[#271e2e] text-[#e2d5f2]' : 'bg-[#e2d5f2] border-[#d0c1e5] shadow-sm'}`}>
              <h4 className="font-black text-2xl mb-4 flex items-center gap-3">
                <History size={24} className={isDark ? 'text-[#e2d5f2]' : 'text-[#a388c9]'} /> Versions.
              </h4>
              <p className="font-bold opacity-90 text-lg leading-relaxed">Mistakes happen! Access previous versions of your document at any time from the settings gear in your editor.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Supporters Corner & Footer */}
      <div className="relative w-full flex flex-col items-center pb-16 z-10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] right-[20%] animate-bounce-slow opacity-70 pointer-events-auto" style={{ animationDelay: '2s' }}>
            <Star size={48} className="text-[#ffd700] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer" fill="currentColor" />
          </div>
          <div className="absolute top-[40%] left-[10%] animate-float-mimu opacity-60 pointer-events-auto" style={{ animationDelay: '0.5s' }}>
            <Sparkles size={40} className="text-[#c1f2d5] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer" />
          </div>
          <div className="absolute bottom-[30%] right-[25%] animate-bounce-slow opacity-50 pointer-events-auto" style={{ animationDelay: '1.5s' }}>
            <Heart size={56} className="text-[#ff9ebd] transition-transform duration-500 hover:scale-110 hover:-rotate-12 cursor-pointer" fill="currentColor" />
          </div>
        </div>

        {/* Supporters Corner */}
        <div className={`w-full max-w-4xl px-6 pb-24 relative z-20`}>
          <div className={`relative p-8 md:p-10 rounded-[3rem] border-4 transition-all ${isDark ? 'bg-[#3b364c] border-[#ff8da1] shadow-[0_10px_0_#d86a80]' : 'bg-white border-[#ff9ebd] shadow-[0_12px_0_#e07a9b]'}`}>
            
            {/* Floating Sticker Label */}
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest border-4 shadow-sm animate-bounce-slow ${isDark ? 'bg-[#ff8da1] border-[#d86a80] text-white' : 'bg-[#ff9ebd] border-[#e07a9b] text-white'}`}>
               🌸 Supporters corner
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <p className="text-xl md:text-2xl font-black mb-3">Support Lumnr ✨</p>
                <p className="font-bold opacity-75 text-base leading-relaxed">
                  This is an individual project and it means a lot if you could support us on your will. Every act of kindness helps keep the project alive and blooming.
                  <a href="https://ko-fi.com/lumnr" target="_blank" rel="noopener noreferrer" className={`inline-block ml-1 align-text-bottom transition-transform hover:scale-110 active:scale-95 ${isDark ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`} title="Buy me a coffee!">
                    <Coffee size={20} strokeWidth={2.5} />
                  </a>
                </p>
              </div>

              <div className={`flex-shrink-0 w-full md:w-auto p-6 rounded-[2rem] border-2 ${isDark ? 'bg-[#2b2738] border-[#4a445d]' : 'bg-[#fff5f7] border-[#ffe4e9]'}`}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 text-center">Recent Supporter</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className={`px-4 py-2 rounded-xl font-black text-base border-2 shadow-sm transform hover:scale-105 transition-transform ${isDark ? 'bg-[#3b364c] border-[#ff8da1] text-[#fce4ec]' : 'bg-white border-[#ff9ebd] text-[#ff6b8b]'}`}>
                    Tia Rose 🌸
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-6 py-16 flex flex-col items-center justify-center gap-8 font-black opacity-80 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-10">
            <button onClick={() => setModalContent('about')} className="hover:opacity-60 transition-all hover:-translate-y-1">About</button>
            <button onClick={() => setModalContent('privacy')} className="hover:opacity-60 transition-all hover:-translate-y-1">Privacy</button>
            <button onClick={() => setModalContent('terms')} className="hover:opacity-60 transition-all hover:-translate-y-1">Terms</button>
            <a href="https://ko-fi.com/lumnr" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:opacity-60 transition-all hover:-translate-y-1 ${iconColor}`}>
              <Coffee size={20} /> Support
            </a>
          </div>
          <div className="flex items-center gap-3 mt-4 text-xl">
            crafted with <Heart size={24} className="text-[#ff6b8b] fill-current animate-soft-blink" /> by Aayaam
          </div>
        </footer>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: Reusable Modal Wrapper
// ==========================================
const Modal = ({ title, children, onClose, theme }) => {
  const isDark = theme === 'dark';
  // Aesthetic flyer-like style: soft rounded corners, elegant shadow, subtle borders
  const flyerStyle = `border-2 ${isDark ? 'border-[#4a445d] shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'border-[#ffe4e9] shadow-[0_20px_50px_-15px_rgba(255,107,139,0.3)]'} rounded-[2rem]`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Soothing backdrop blur */}
      <div 
        className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 animate-in ${isDark ? 'bg-[#2b2738]/60' : 'bg-[#fffcfd]/60'}`}
        onClick={onClose}
      ></div>
      {/* Flyer Card */}
      <div className={`relative z-10 ${isDark ? 'bg-[#3b364c]' : 'bg-[#fffcfd]'} w-full max-w-lg overflow-hidden animate-pop-in ${flyerStyle}`}>
        <div className={`flex items-center justify-between p-6 border-b-2 ${isDark ? 'border-[#4a445d]' : 'border-[#ffe4e9]'}`}>
          <h2 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'}`}>{title}</h2>
          <button onClick={onClose} className={`p-2.5 rounded-full transition-transform hover:scale-110 active:scale-95 ${isDark ? 'bg-[#4a445d] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-[#fff0f5] text-[#ff6b8b] hover:text-[#5d4037]'}`}>
            <X size={18} strokeWidth={3} />
          </button>
        </div>
        <div className={`p-10 ${isDark ? 'text-[#e6d5eb]' : 'text-[#795548]'} text-base font-bold leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-hide`}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: Pop-up Modals Content
// ==========================================
const ContentModals = ({ modalContent, setModalContent, theme, activeNote, updateNote }) => {
  if (!modalContent) return null;
  const title = modalContent === 'about' ? "About lumnr" : modalContent === 'privacy' ? "Privacy Policy" : modalContent === 'terms' ? "Terms of Service" : modalContent === 'history' ? "Version History" : "";
  const isDark = theme === 'dark';

  return (
    <Modal title={title} onClose={() => setModalContent(null)} theme={theme}>
      {modalContent === 'about' && (
        <div className="flex flex-col items-center text-center py-4 animate-in">
          <h3 className={`text-3xl font-black mb-4 tracking-tight ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'}`}>lumnr <span className="text-lg opacity-50 font-bold ml-1">v1.2</span></h3>
          
          <p className="text-lg font-bold opacity-80 leading-relaxed mb-8 max-w-sm">
            A minimal digital sanctuary designed to quiet the noise. Built for speed, privacy, and the absolute joy of beautiful writing.
          </p>

          <div className={`w-full max-w-xs p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 ${isDark ? 'bg-[#2b2738] border-[#4a445d]' : 'bg-[#fffcfd] border-[#ffe4e9]'}`}>
            <ShieldCheck size={24} className={isDark ? 'text-[#c1f2d5]' : 'text-[#8cb369]'} />
            <span className="text-[11px] font-black uppercase tracking-widest opacity-70">100% Local & Private</span>
          </div>
        </div>
      )}
      
      {modalContent === 'privacy' && (
        <div className="flex flex-col items-center space-y-8 py-2">
          <div className="relative">
            <div className={`p-6 rounded-[2rem] border-4 shadow-sm animate-float-mimu ${isDark ? 'bg-[#ff8da1]/10 border-[#ff8da1]/20' : 'bg-[#ff9ebd]/10 border-[#ff9ebd]/20'}`}>
              <ShieldCheck size={64} className={isDark ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 animate-bounce-slow">
              <Sparkles size={28} className="text-[#ffd700]" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className={`font-black text-3xl mb-2 ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'} animate-fade-up`}>
              Privacy Magic ✨
            </h3>
            <p className="font-bold opacity-70 text-base animate-fade-up delay-100">Your thoughts are yours alone.</p>
          </div>

          <div className="grid gap-4 w-full">
            <div className={`p-5 rounded-[2rem] border-2 transform rotate-1 animate-fade-up delay-200 ${isDark ? 'bg-[#2d4239] border-[#1e2e27] text-[#c1f2d5]' : 'bg-[#e2f2d5] border-[#c9e5b8]'}`}>
               <h4 className="font-black flex items-center gap-2 mb-1 text-lg"><Cloud size={18}/> No Servers</h4>
               <p className="text-sm opacity-80 font-bold leading-relaxed">Lumnr doesn't have a database. Everything you write stays safely on your device.</p>
            </div>
            <div className={`p-5 rounded-[2rem] border-2 transform -rotate-1 animate-fade-up delay-300 ${isDark ? 'bg-[#2d3b42] border-[#1e272e] text-[#a6c9ff]' : 'bg-[#d5e8f2] border-[#b8d7e5]'}`}>
               <h4 className="font-black flex items-center gap-2 mb-1 text-lg"><Sparkles size={18}/> No Cookies</h4>
               <p className="text-sm opacity-80 font-bold leading-relaxed">We don't track your behavior, use analytics, or sell your data. Pure, simple focus.</p>
            </div>
          </div>

          <div className="w-full text-center opacity-40 animate-fade-up delay-400">
             <p className="text-xs font-black uppercase tracking-[0.2em]">Verified Privacy Focus</p>
          </div>
        </div>
      )}

      {modalContent === 'terms' && (
        <div className="flex flex-col items-center space-y-8 py-2">
          <div className="relative">
            <div className={`p-6 rounded-[2rem] border-4 shadow-sm animate-float-mimu ${isDark ? 'bg-[#a6c9ff]/10 border-[#a6c9ff]/20' : 'bg-[#87cefa]/10 border-[#87cefa]/20'}`}>
              <FileText size={64} className={isDark ? 'text-[#a6c9ff]' : 'text-[#87cefa]'} strokeWidth={2.5} />
            </div>
            <div className="absolute -top-2 -left-2 animate-bounce-slow">
              <Star size={28} className="text-[#ffd700] fill-current" />
            </div>
          </div>

          <div className="text-center">
            <h3 className={`font-black text-3xl mb-2 ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'} animate-fade-up`}>
              Friendly Rules 📜
            </h3>
            <p className="font-bold opacity-70 text-base animate-fade-up delay-100">Simple ways to keep your notes safe.</p>
          </div>

          <div className="grid gap-4 w-full">
            <div className={`p-5 rounded-[2rem] border-2 transform -rotate-1 animate-fade-up delay-200 ${isDark ? 'bg-[#423d2d] border-[#2e2b1e] text-[#f2ecd5]' : 'bg-[#f2ecd5] border-[#e5dec1]'}`}>
               <h4 className="font-black flex items-center gap-2 mb-1 text-lg"><Trash2 size={18}/> Cache Risk</h4>
               <p className="text-sm opacity-80 font-bold leading-relaxed">Since data is local, clearing browser history deletes notes! Back up using Export often.</p>
            </div>
            <div className={`p-5 rounded-[2rem] border-2 transform rotate-1 animate-fade-up delay-300 ${isDark ? 'bg-[#3b2d42] border-[#271e2e] text-[#e2d5f2]' : 'bg-[#e2d5f2] border-[#d0c1e5]'}`}>
               <h4 className="font-black flex items-center gap-2 mb-1 text-lg"><ShieldCheck size={18}/> Provided "As Is"</h4>
               <p className="text-sm opacity-80 font-bold leading-relaxed">We built this with love, but you are the guardian of your words. We aren't liable for data loss.</p>
            </div>
          </div>

          <div className="w-full text-center opacity-40 animate-fade-up delay-400">
             <p className="text-xs font-black uppercase tracking-[0.2em]">Simple & Transparent</p>
          </div>
        </div>
      )}

      {modalContent === 'history' && (
        <div className="flex flex-col gap-3">
          <p className="mb-4 text-sm font-black text-center opacity-70">Restore previous versions of this document.</p>
          {(!activeNote?.history || activeNote.history.length === 0) ? (
            <div className={`text-center py-12 font-bold opacity-50 rounded-[2.5rem] ${isDark ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>No previous versions found ✨</div>
          ) : (
            activeNote.history.map((ver, idx) => (
              <div key={idx} className={`flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all ${isDark ? 'border-[#4a445d] bg-[#2b2738] hover:bg-[#3b364c]' : 'border-[#ffe4e9] bg-white hover:bg-[#fff0f5]'}`}>
                <div className="flex flex-col">
                  <span className={`font-black text-lg ${isDark ? 'text-[#fce4ec]' : 'text-[#5d4037]'}`}>{new Date(ver.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span className="text-sm font-bold opacity-60 truncate max-w-[180px] mt-0.5">{ver.title || 'Untitled'}</span>
                </div>
                <button 
                  onClick={() => {
                    updateNote(activeNote.id, { title: ver.title, content: ver.content });
                    setModalContent(null);
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isDark ? 'bg-[#4a445d] hover:bg-[#ff8da1] hover:text-white' : 'bg-[#fff0f5] border-2 border-[#ffe4e9] hover:bg-[#ff9ebd] hover:border-[#ff9ebd] hover:text-white shadow-sm'}`}
                >
                  Restore
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};

// ==========================================
// COMPONENT: Main Editor Area
// ==========================================
const Editor = ({ activeNote, updateNote, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="flex-1 w-full px-5 sm:px-12 lg:px-24 pt-8 sm:pt-12 lg:pt-16 flex flex-col">
      {activeNote ? (
        <div className={`flex-1 flex flex-col space-y-4 sm:space-y-6 animate-in ${activeNote.deletedAt ? 'opacity-50 pointer-events-none' : ''}`}>
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
            placeholder="Untitled"
            disabled={!!activeNote.deletedAt}
            className={`w-full bg-transparent text-3xl sm:text-4xl font-black tracking-tight focus:outline-none ${isDark ? 'text-[#fce4ec] placeholder:text-[#4a445d]' : 'text-[#5d4037] placeholder:text-[#ffe4e9]'}`}
          />
          <textarea
            id="note-textarea"
            value={activeNote.content}
            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
            placeholder="Write your thoughts..."
            disabled={!!activeNote.deletedAt}
            className={`w-full flex-1 bg-transparent text-base sm:text-lg font-bold leading-relaxed focus:outline-none resize-none pb-12 lg:pb-20 scrollbar-hide ${isDark ? 'text-[#e6d5eb] placeholder:text-[#4a445d]' : 'text-[#795548] placeholder:text-[#ffe4e9]'}`}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-60">
          <div className={`p-8 rounded-[2rem] shadow-sm border-2 animate-float-mimu ${isDark ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffe4e9]'}`}>
            <Sparkles size={64} className={isDark ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'} />
          </div>
          <p className={`text-sm font-black tracking-widest uppercase animate-pulse ${isDark ? 'text-[#e6d5eb]' : 'text-[#5d4037]'}`}>Select a document to begin ✨</p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// COMPONENT: Top Header
// ==========================================
const Header = ({ 
  theme, activeNote, wordCount, charCount, readingTime, isSaving, 
  shareMenuRef, shareMenuOpen, setShareMenuOpen, 
  downloadNote, copyToClipboard, shareToSocial, 
  onGoHome, updateNote
}) => {
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);
  const styleMenuRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (styleMenuRef.current && !styleMenuRef.current.contains(event.target)) setStyleMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`h-14 flex-shrink-0 border-b-2 flex items-center justify-between px-4 sm:px-6 z-[35] ${isDark ? 'border-[#4a445d] bg-[#2b2738]/80 backdrop-blur-md' : 'border-[#ffe4e9] bg-[#fffcfd]/80 backdrop-blur-md'}`}>
      <div className={`flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-x-auto scrollbar-hide pr-2 ${isDark ? 'text-[#9e96b3]' : 'text-[#a1887f]'}`}>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <Clock size={14} strokeWidth={2.5} />
          {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
        </span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden sm:block ${isDark ? 'bg-[#4a445d]' : 'bg-[#ffe4e9]'}`}></div>
        <span className="hidden sm:inline flex-shrink-0">{wordCount} words</span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden md:block ${isDark ? 'bg-[#4a445d]' : 'bg-[#ffe4e9]'}`}></div>
        <span className="hidden md:inline flex-shrink-0">{charCount} characters</span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden lg:block ${isDark ? 'bg-[#4a445d]' : 'bg-[#ffe4e9]'}`}></div>
        <span className={`transition-opacity duration-500 flex-shrink-0 ${isSaving ? `opacity-100 ${isDark ? 'text-[#ff8da1]' : 'text-[#ff6b8b]'}` : 'opacity-40'}`}>
          {isSaving ? 'Saving ✨' : 'Saved'}
        </span>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 pl-2">
        <button onClick={onGoHome} className={`p-2.5 rounded-full transition-all active:scale-90 flex items-center border-2 ${isDark ? 'text-[#ffb7c5] hover:text-[#fce4ec] border-[#4a445d] hover:bg-[#4a445d]' : 'text-[#ff6b8b] hover:text-[#5d4037] border-[#ffe4e9] hover:bg-white shadow-sm'}`} title="Go Home">
          <Home size={16} strokeWidth={2.5} />
        </button>

        {activeNote && !activeNote.deletedAt && (
          <>
            {/* Style Menu Button */}
            <div className="relative" ref={styleMenuRef}>
              <button 
                onClick={(e) => { e.stopPropagation(); setStyleMenuOpen(!styleMenuOpen); }} 
                className={`p-2.5 rounded-full transition-all active:scale-90 flex items-center border-2 ${isDark ? 'text-[#ffb7c5] hover:text-[#fce4ec] border-[#4a445d] hover:bg-[#4a445d]' : 'text-[#ff6b8b] hover:text-[#5d4037] border-[#ffe4e9] hover:bg-white shadow-sm'}`}
                title="Notebook Cover"
              >
                <Palette size={16} strokeWidth={2.5} />
              </button>
              {styleMenuOpen && (
                <div className={`absolute right-0 top-11 w-64 border-2 rounded-[2rem] shadow-xl p-4 z-50 animate-in ${isDark ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffe4e9]'}`}>
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 ml-2 text-left">Cover Pattern</h4>
                  <div className="flex gap-2 mb-5">
                    {['none', 'stripes', 'dots', 'floral'].map(p => (
                      <button key={p} onClick={() => updateNote(activeNote.id, { cover: p })} className={`flex-1 aspect-square rounded-xl border-2 transition-all hover:scale-105 ${activeNote.cover === p ? 'border-[#ff9ebd]' : 'border-black/5'} overflow-hidden relative`}>
                        {p !== 'none' && <div className={`absolute inset-0 opacity-40 pattern-${p}`}></div>}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/10 text-[8px] font-black uppercase">{p === 'none' ? 'Plain' : ''}</div>
                      </button>
                    ))}
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 ml-2 text-left">Sanctuary Color</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {['#ff9ebd', '#c1f2d5', '#a6c9ff', '#f2ecd5', '#e2d5f2', '#ffc4b2', '#ffd700', '#d86a80', '#5fa8d3', '#8cb369'].map(c => (
                      <button key={c} onClick={() => updateNote(activeNote.id, { color: c })} className={`w-full aspect-square rounded-full border-2 transition-transform hover:scale-110 ${activeNote.color === c ? 'border-[#5d4037]' : 'border-transparent'}`} style={{ backgroundColor: c }}></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={shareMenuRef}>
              <button onClick={(e) => { e.stopPropagation(); setShareMenuOpen(!shareMenuOpen); }} className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all px-4 py-1.5 rounded-full active:scale-95 border-2 shadow-sm ${isDark ? 'text-[#fce4ec] bg-[#3b364c] border-[#4a445d] hover:bg-[#4a445d]' : 'text-[#5d4037] bg-white border-[#ffe4e9] hover:bg-[#fff0f5]'}`}>
                <Share2 size={13} strokeWidth={2.5} /> Share
              </button>
              {shareMenuOpen && (
                <div className={`absolute right-0 top-11 w-48 border-2 rounded-[1.5rem] shadow-xl py-2 z-50 animate-in ${isDark ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffe4e9]'}`}>
                  <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-5 py-2.5 text-xs font-black transition-colors ${isDark ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#5d4037] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                    <Download size={14} strokeWidth={2.5} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-5 py-2.5 text-xs font-black border-b-2 transition-colors ${isDark ? 'text-[#fce4ec] hover:bg-[#4a445d] border-[#4a445d]' : 'text-[#5d4037] hover:bg-[#fff0f5] hover:text-[#ff6b8b] border-[#ffe4e9]'}`}>
                    <Copy size={14} strokeWidth={2.5} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-5 py-2.5 text-xs font-black transition-colors ${isDark ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#5d4037] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                    <Twitter size={14} strokeWidth={2.5} /> Twitter
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

// ==========================================
// COMPONENT: Navigation Sidebar
// ==========================================
const Sidebar = ({
  sidebarOpen, setSidebarOpen, theme, sidebarClasses, inputClasses,
  createNote, searchQuery, setSearchQuery, showTrash, setShowTrash, showPinned, setShowPinned,
  filteredNotes, activeNoteId, setActiveNoteId, restoreNote,
  permanentlyDeleteNote, togglePin, moveNoteToTrash, notes,
  settingsRef, settingsOpen, setSettingsOpen, toggleTheme, setModalContent
}) => {
  const getAccentClass = (isActive) => {
    if (!isActive) return theme === 'dark' ? 'hover:bg-[#2b2738]/80 text-[#9e96b3]' : 'hover:bg-[#fff5f7]/80 text-[#a1887f]';
    return theme === 'dark' 
      ? 'bg-[#2b2738] text-[#fce4ec] border-2 border-[#4a445d] shadow-sm' 
      : 'bg-white text-[#5d4037] border-2 border-[#ffe4e9] shadow-sm';
  };

  return (
    <aside className={`${sidebarOpen ? 'w-[80vw] sm:w-72' : 'w-0'} absolute md:relative z-40 h-full transition-[width] duration-500 ease-in-out flex flex-col overflow-hidden ${sidebarClasses} ${sidebarOpen ? 'shadow-2xl md:shadow-none' : ''}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-xl ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#5d4037]'}`}>lumnr</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={createNote} className={`p-1.5 rounded-full transition-transform active:scale-90 border-2 ${theme === 'dark' ? 'bg-[#2b2738] border-[#4a445d] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-white border-[#ffe4e9] text-[#ff6b8b] hover:text-[#5d4037] shadow-sm'}`}>
            <Plus size={16} strokeWidth={2.5} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className={`p-1.5 rounded-full transition-transform active:scale-90 border-2 ${theme === 'dark' ? 'bg-[#2b2738] border-[#4a445d] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-white border-[#ffe4e9] text-[#ff6b8b] hover:text-[#5d4037] shadow-sm'}`}>
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-4 mb-4 space-y-4">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#ffccd5]'}`} size={16} strokeWidth={2.5} />
          <input 
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full rounded-xl py-2 pl-10 pr-4 text-sm font-bold focus:outline-none transition-colors border-2 ${inputClasses}`}
          />
        </div>
        
        <div className={`flex gap-1 p-1 rounded-xl border-2 ${theme === 'dark' ? 'bg-[#2b2738] border-[#4a445d]' : 'bg-[#fff5f7] border-[#ffe4e9]'}`}>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all ${!showTrash && !showPinned ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] border-2 border-[#ffe4e9] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#ff6b8b]')}`}
          >
            <PenLine size={12} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(true); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all ${!showTrash && showPinned ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] border-2 border-[#ffe4e9] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#ff6b8b]')}`}
          >
            <Pin size={12} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => { setShowTrash(true); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all ${showTrash ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] border-2 border-[#ffe4e9] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#ff6b8b]')}`}
          >
            <Trash size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-2 scrollbar-hide">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            onClick={() => {
              setActiveNoteId(note.id);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`group flex flex-col p-3 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-transparent ${getAccentClass(activeNoteId === note.id)}`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-2.5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0" style={{ backgroundColor: note.color || '#ff9ebd' }}></div>
                {note.pinned && <Pin size={10} strokeWidth={3} className="flex-shrink-0 text-[#ffb7c5] fill-current" />}
                <span className={`text-sm font-black truncate ${activeNoteId === note.id ? '' : (theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#5d4037]')}`}>
                  {note.title || 'Untitled'}
                </span>
              </div>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {showTrash ? (
                  <>
                    <button onClick={(e) => restoreNote(note.id, e)} className={`p-1 transition-colors text-[#5fa8d3]`} title="Restore">
                      <RotateCcw size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className={`p-1 transition-colors text-[#ff6b8b]`} title="Delete Permanently">
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => togglePin(note.id, e)} className={`p-1 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-[#ff9ebd]' : 'text-[#ff9ebd]') : 'text-[#ffccd5] hover:text-[#ff9ebd]'}`}>
                      {note.pinned ? <PinOff size={16} strokeWidth={2.5} /> : <Pin size={16} strokeWidth={2.5} />}
                    </button>
                    <button onClick={(e) => moveNoteToTrash(note.id, e)} className={`p-1 transition-colors text-[#ffccd5] hover:text-[#ff6b8b]`}>
                      <Trash size={16} strokeWidth={2.5} />
                    </button>
                  </>
                )}
              </div>
            </div>
            <span className={`text-[9px] line-clamp-1 truncate uppercase tracking-widest font-black ${activeNoteId === note.id ? 'opacity-80' : (theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#a1887f]')}`}>
              {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>

      <div className={`p-4 border-t-2 text-[10px] font-black uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-[#4a445d] text-[#9e96b3]' : 'border-[#ffe4e9] text-[#a1887f]'}`}>
        <span>{notes.filter(n => !n.deletedAt).length} Docs</span>
        <div ref={settingsRef}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-2 rounded-full transition-transform active:scale-90 border-2 ${theme === 'dark' ? 'border-[#4a445d] hover:bg-[#2b2738] hover:text-[#fce4ec]' : 'border-[#ffe4e9] hover:bg-white hover:text-[#ff6b8b] hover:shadow-sm'}`}>
            <Settings size={16} strokeWidth={2.5} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-14 right-4 w-48 border-2 rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffe4e9]'}`}>
              <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#5d4037] hover:bg-[#fff5f7] hover:text-[#ff6b8b]'}`}>
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button onClick={() => { setModalContent('history'); setSettingsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#5d4037] hover:bg-[#fff5f7] hover:text-[#ff6b8b]'}`}>
                <History size={14} /> Version History
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// ==========================================
// COMPONENT: MAIN APPLICATION
// ==========================================
const App = () => {
  // Initialize state with safety checks
  const [notes, setNotes] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('lumnr_notes');
    let parsed = saved ? JSON.parse(saved) : [{
      id: '1',
      title: 'Welcome to lumnr',
      content: 'lumnr is a minimal digital notebook designed for focus.\n\nEverything you write is saved locally in your browser. Start typing to begin your journey.',
      updatedAt: Date.now(),
      pinned: false,
      deletedAt: null,
      color: '#ff9ebd',
      cover: 'stripes'
    }];

    // Auto-purge notes older than 30 days from trash
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return parsed.filter(note => {
      if (!note.deletedAt) return true;
      return (now - note.deletedAt) < thirtyDaysInMs;
    }).sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
  });

  const [activeNoteId, setActiveNoteId] = useState(notes.find(n => !n.deletedAt)?.id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrash, setShowTrash] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('lumnr_theme') || 'light';
  });
  
  const [showHome, setShowHome] = useState(true); // New state for Home Page
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const shareMenuRef = useRef(null);
  const settingsRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId);

  // Persistence
  useEffect(() => {
    localStorage.setItem('lumnr_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('lumnr_theme', theme);
  }, [theme]);

  // Click Outside Handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) setShareMenuOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(event.target)) setSettingsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const createNote = () => {
    const colors = ['#ff9ebd', '#c1f2d5', '#a6c9ff', '#f2ecd5', '#e2d5f2', '#ffc4b2'];
    const patterns = ['stripes', 'dots', 'floral', 'none'];
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      updatedAt: Date.now(),
      pinned: false,
      deletedAt: null,
      color: colors[Math.floor(Math.random() * colors.length)],
      cover: patterns[Math.floor(Math.random() * patterns.length)]
    };
    setNotes(prev => {
      const updated = [newNote, ...prev];
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
    });
    setActiveNoteId(newNote.id);
    setShowHome(false);
    setShowTrash(false);
    setShowPinned(false);
  };

  const updateNote = (id, fields) => {
    setNotes(prev => {
      const updated = prev.map(note => {
        if (note.id === id) {
          const updatedNote = { ...note, ...fields, updatedAt: Date.now() };
          if (fields.content !== undefined || fields.title !== undefined) {
            const history = note.history || [];
            const lastVersion = history[0];
            if (!lastVersion || (Date.now() - lastVersion.timestamp > 300000)) {
              updatedNote.history = [{
                timestamp: Date.now(),
                title: note.title,
                content: note.content
              }, ...history].slice(0, 50);
            } else {
              updatedNote.history = history;
            }
          }
          return updatedNote;
        }
        return note;
      });
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
    });

    setIsSaving(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => setIsSaving(false), 1000);
  };

  const togglePin = (id, e) => {
    e.stopPropagation();
    setNotes(prev => {
      const updated = prev.map(note => 
        note.id === id ? { ...note, pinned: !note.pinned } : note
      );
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
    });
  };

  const moveNoteToTrash = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, deletedAt: Date.now(), pinned: false } : note
    ));
    if (activeNoteId === id) {
      const nextNote = notes.find(n => n.id !== id && !n.deletedAt);
      setActiveNoteId(nextNote ? nextNote.id : null);
    }
  };

  const restoreNote = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, deletedAt: null } : note
    ));
    setActiveNoteId(id);
  };

  const permanentlyDeleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id) {
      setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const downloadNote = () => {
    if (!activeNote) return;
    const element = document.createElement("a");
    const file = new Blob([`${activeNote.title}\n\n${activeNote.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${activeNote.title || 'untitled'}.txt`;
    document.body.appendChild(element);
    element.click();
    setShareMenuOpen(false);
  };

  const copyToClipboard = () => {
    if (!activeNote) return;
    const text = `${activeNote.title}\n\n${activeNote.content}`;
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setShareMenuOpen(false);
  };

  const shareToSocial = (platform) => {
    if (!activeNote) return;
    const text = encodeURIComponent(`Check out my note: ${activeNote.title}`);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}`
    };
    window.open(urls[platform], '_blank');
    setShareMenuOpen(false);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = showTrash ? !!n.deletedAt : (showPinned ? (!n.deletedAt && n.pinned) : !n.deletedAt);
    return matchesSearch && matchesSection;
  });

  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const themeClasses = theme === 'dark' 
    ? 'bg-[#2b2738] text-[#fce4ec] selection:bg-[#ff8da1] selection:text-[#fff]' 
    : 'bg-[#fffcfd] text-[#5d4037] selection:bg-[#ffb7c5] selection:text-[#5d4037]';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#3b364c]/95 border-[#4a445d] border-r-2 backdrop-blur-xl'
    : 'bg-white/95 border-[#ffe4e9] border-r-4 backdrop-blur-xl';

  const inputClasses = theme === 'dark'
    ? 'bg-[#2b2738] border-2 border-[#4a445d] text-[#fce4ec] focus:border-[#ff8da1] placeholder:text-[#9e96b3] shadow-inner'
    : 'bg-white border-2 border-[#ffe4e9] text-[#5d4037] focus:border-[#ff9ebd] placeholder:text-[#ffccd5] shadow-inner';

  return (
    <div className={`flex h-screen font-sans theme-transition font-['Quicksand',sans-serif] ${themeClasses}`}>
      
      {showHome ? (
        <HomePage 
          theme={theme} 
          onStart={createNote} 
          toggleTheme={toggleTheme} 
          setModalContent={setModalContent}
          notes={notes}
          onSelectNote={(id) => { setActiveNoteId(id); setShowHome(false); }}
        />
      ) : (
        <>
          {/* 1. Mobile Overlay Background */}
          {sidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-30" 
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* 2. Sidebar Component */}
          <Sidebar 
            sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} theme={theme}
            sidebarClasses={sidebarClasses} inputClasses={inputClasses}
            createNote={createNote} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            showTrash={showTrash} setShowTrash={setShowTrash} showPinned={showPinned} setShowPinned={setShowPinned}
            filteredNotes={filteredNotes} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} 
            restoreNote={restoreNote} permanentlyDeleteNote={permanentlyDeleteNote} 
            togglePin={togglePin} moveNoteToTrash={moveNoteToTrash}
            notes={notes} settingsRef={settingsRef} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}
            toggleTheme={toggleTheme} setModalContent={setModalContent}
          />

          {/* 3. Main Interface */}
          <main className="flex-1 flex flex-col relative">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-1.5 border-y-4 border-r-4 rounded-r-[1.5rem] transition-transform active:scale-90 shadow-sm ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d] text-[#ffb7c5]' : 'bg-white border-[#ffe4e9] text-[#ff6b8b]'}`}
            >
              <ChevronRight size={18} strokeWidth={4} />
            </button>

            <Header 
              theme={theme} activeNote={activeNote} wordCount={wordCount} charCount={charCount}
              readingTime={readingTime} isSaving={isSaving} 
              shareMenuRef={shareMenuRef} shareMenuOpen={shareMenuOpen} setShareMenuOpen={setShareMenuOpen}
              downloadNote={downloadNote} copyToClipboard={copyToClipboard} shareToSocial={shareToSocial}
              onGoHome={() => setShowHome(true)}
              updateNote={updateNote}
            />

            <Editor 
              activeNote={activeNote} updateNote={updateNote} 
              theme={theme} 
            />
          </main>

        </>
      )}

      {/* 4. Popups Component */}
      <ContentModals 
        modalContent={modalContent} setModalContent={setModalContent} 
        theme={theme} activeNote={activeNote} updateNote={updateNote} 
      />

      {/* Global CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
        
        body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #fffcfd; overflow: hidden; }
        .theme-transition * { transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .theme-transition { transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Notebook Patterns */
        .pattern-stripes {
          background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px);
          animation: drift 20s linear infinite;
        }
        .pattern-dots {
          background-image: radial-gradient(rgba(255,255,255,0.4) 20%, transparent 20%);
          background-size: 15px 15px;
          animation: pulse-dots 4s ease-in-out infinite;
        }
        .pattern-floral {
          background-image: radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 2.5px, transparent 0);
          background-size: 20px 20px;
          animation: sway 6s ease-in-out infinite;
        }

        @keyframes drift { from { background-position: 0 0; } to { background-position: 100% 100%; } }
        @keyframes pulse-dots { 0%, 100% { background-size: 15px 15px; } 50% { background-size: 18px 18px; } }
        @keyframes sway { 0%, 100% { transform: scale(1) skewX(0deg); } 50% { transform: scale(1.03) skewX(1deg); } }

        /* Custom Pen Cursor for Home Page */
        .custom-pen-cursor {
          cursor: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23ff6b8b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'%3E%3C/path%3E%3C/svg%3E") 3 29, auto;
        }
        /* Ensure interactive elements keep standard pointer on home page */
        .custom-pen-cursor button, .custom-pen-cursor a {
          cursor: pointer;
        }

        /* Mimu Aesthetic Background Gridlines with smooth transitions */
        .bg-grid-light {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, #ffe4e9 1px, transparent 1px),
                            linear-gradient(to bottom, #ffe4e9 1px, transparent 1px);
        }
        .bg-grid-dark {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, #3b364c 1px, transparent 1px),
                            linear-gradient(to bottom, #3b364c 1px, transparent 1px);
        }

        /* Smooth Entrance Animations with hardware acceleration */
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(4px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; will-change: opacity, transform; }
        
        @keyframes fadeInUpShort {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-short { animation: fadeInUpShort 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: opacity, transform; }
        
        @keyframes popIn { 
          0% { opacity: 0; transform: scale(0.85) translateY(20px); } 
          100% { opacity: 1; transform: scale(1) translateY(0); } 
        }
        .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: opacity, transform, scale; }

        .delay-75 { animation-delay: 75ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }

        /* Mimu Floating Animations */
        @keyframes float-mimu {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        .animate-float-mimu { animation: float-mimu 8s ease-in-out infinite; }
        
        @keyframes bounce-mimu {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-bounce-slow { animation: bounce-mimu 5s ease-in-out infinite; }

        @keyframes softBlink {
          0%, 85%, 100% { opacity: 1; }
          92.5% { opacity: 0.3; }
        }
        .animate-soft-blink { animation: softBlink 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
