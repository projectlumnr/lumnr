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
  PenLine, 
  Clock, 
  Search, 
  MoreHorizontal,
  Settings,
  Share2,
  Download,
  Copy,
  Twitter,
  ExternalLink,
  Info,
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
  Star
} from 'lucide-react';

// ==========================================
// COMPONENT: Home / Landing Page (Agency Brutalism)
// ==========================================
const HomePage = ({ theme, onStart, toggleTheme, setModalContent }) => {
  const isDark = theme === 'dark';
  const borderClass = isDark ? 'border-[#f4f4f0]' : 'border-[#0f0f0f]';
  const textClass = isDark ? 'text-[#f4f4f0]' : 'text-[#0f0f0f]';
  const bgClass = isDark ? 'bg-[#0f0f0f]' : 'bg-[#f4f4f0]';
  const brutalShadow = isDark ? 'brutal-shadow-dark' : 'brutal-shadow-light';
  const textOutline = isDark ? 'text-outline-brutal-dark' : 'text-outline-brutal-light';

  return (
    <div className={`flex-1 w-full h-full flex flex-col overflow-x-hidden overflow-y-auto relative selection:bg-pink-500 selection:text-white ${bgClass} ${textClass}`}>
      
      {/* Animated Brutalist Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-20 z-0">
         <div className="absolute top-32 left-10 md:left-20 animate-spin-slow">
            <Star size={120} fill="currentColor" />
         </div>
         <div className="absolute bottom-40 right-10 md:right-32 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
            <Star size={240} fill="currentColor" />
         </div>
      </div>

      {/* Griflan-style Navbar */}
      <nav className={`w-full p-6 md:p-8 flex justify-between items-center z-50 absolute top-0 left-0 border-b-4 ${borderClass} ${bgClass}`}>
        <div className="font-black text-2xl md:text-3xl tracking-tighter flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-pink-500' : 'bg-pink-500'}`}></div>
          LUMNR<span className="text-pink-500">.</span>
        </div>
        <button onClick={toggleTheme} className={`p-3 md:p-4 rounded-full border-4 transition-all duration-300 ${borderClass} ${brutalShadow} ${isDark ? 'bg-yellow-400 text-black' : 'bg-yellow-400 text-black'}`}>
          {theme === 'dark' ? <Sun size={24} strokeWidth={3} /> : <Moon size={24} strokeWidth={3} />}
        </button>
      </nav>

      {/* Massive Editorial Hero */}
      <main className="pt-24 md:pt-32 z-10 w-full flex flex-col justify-center min-h-[90vh]">
        <section className="px-6 md:px-10 py-10 md:py-20 flex flex-col items-center text-center">
          
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <h1 className="animate-reveal opacity-0 text-[18vw] leading-[0.85] font-black tracking-tighter uppercase m-0 p-0 origin-bottom-left" style={{ animationFillMode: 'forwards' }}>
                We Make
              </h1>
            </div>
            <div className="overflow-hidden flex items-center justify-center gap-4 md:gap-8 mt-2 md:mt-4">
              <h1 className={`animate-reveal opacity-0 text-[18vw] leading-[0.85] font-black tracking-tighter uppercase m-0 p-0 ${textOutline} origin-bottom-left`} style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
                Loud
              </h1>
              <h1 className="animate-reveal opacity-0 text-[18vw] leading-[0.85] font-black tracking-tighter uppercase m-0 p-0 origin-bottom-left" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                Ideas
              </h1>
            </div>
          </div>

          <div className="mt-16 md:mt-24 max-w-3xl z-20 animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <p className={`text-xl md:text-3xl font-bold uppercase leading-tight p-6 md:p-10 border-4 transform -rotate-2 ${borderClass} ${brutalShadow} ${isDark ? 'bg-violet-600 text-white' : 'bg-violet-400 text-black'}`}>
              a minimalist digital workspace designed to remove distractions and let your ideas shine.
            </p>
          </div>
          
          <div className="mt-20 md:mt-24 z-20 animate-fade-in opacity-0" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <button 
              onClick={onStart}
              className={`group relative flex items-center justify-center px-10 py-6 md:px-16 md:py-8 rounded-full font-black tracking-[0.15em] uppercase text-xl md:text-3xl transition-all duration-300 border-4 overflow-hidden shrink-0 ${borderClass} ${brutalShadow} ${isDark ? 'bg-pink-600 text-white' : 'bg-pink-400 text-black'}`}
            >
              <span className="relative z-10 flex items-center gap-4 transition-transform duration-300 group-hover:scale-105">
                Start Writing
                <PenLine size={36} strokeWidth={3} className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Fixed Infinite Marquee */}
      <section className={`w-full py-5 md:py-8 overflow-hidden flex border-y-4 my-10 transform -rotate-2 scale-105 z-20 shadow-2xl ${borderClass} ${isDark ? 'bg-lime-500 text-black' : 'bg-lime-400 text-black'}`}>
        <div className="animate-marquee-brutal flex w-max shrink-0">
          {/* Duplicate blocks exactly 4 times for a flawless infinite loop */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center text-4xl md:text-6xl font-black uppercase tracking-widest shrink-0">
              <span className="mx-6 md:mx-10">NO DISTRACTIONS</span><Star className="mx-2" size={40} fill="currentColor" />
              <span className="mx-6 md:mx-10">PURE FOCUS</span><Star className="mx-2" size={40} fill="currentColor" />
              <span className="mx-6 md:mx-10">LOCAL STORAGE</span><Star className="mx-2" size={40} fill="currentColor" />
              <span className="mx-6 md:mx-10">YOUR DATA</span><Star className="mx-2" size={40} fill="currentColor" />
            </div>
          ))}
        </div>
      </section>

      {/* Big Block FAQs (Agency Brutalism) */}
      <section className="w-full px-6 md:px-10 py-24 md:py-32 z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b-4 pb-6 md:pb-10 border-current">
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
              Good to<br/>know.
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className={`col-span-1 md:col-span-2 p-8 md:p-12 border-4 ${borderClass} ${brutalShadow} ${isDark ? 'bg-[#f4f4f0] text-black' : 'bg-white text-black'}`}>
            <h4 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Local only.</h4>
            <p className="text-xl md:text-3xl font-bold leading-tight">Everything is stored securely in your browser's local storage. Zero servers, zero tracking.</p>
          </div>
          <div className={`p-8 md:p-12 border-4 ${borderClass} ${brutalShadow} ${isDark ? 'bg-orange-500 text-black' : 'bg-orange-400 text-black'}`}>
            <h4 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Auto-save.</h4>
            <p className="text-xl md:text-2xl font-bold leading-tight">Lumnr continuously saves your progress and quietly creates backup snapshots every 5 minutes.</p>
          </div>
          <div className={`p-8 md:p-12 border-4 ${borderClass} ${brutalShadow} ${isDark ? 'bg-violet-500 text-black' : 'bg-violet-400 text-black'}`}>
            <h4 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Cache care.</h4>
            <p className="text-xl md:text-2xl font-bold leading-tight">Clearing your browser cache will delete notes. Use the "Export" feature to back up your work.</p>
          </div>
        </div>
      </section>

      {/* Brutalist Footer */}
      <footer className={`w-full border-t-4 pt-20 overflow-hidden relative z-10 ${borderClass} ${bgClass}`}>
        <div className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
          <div className={`border-4 p-8 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10 transform rotate-1 ${borderClass} ${brutalShadow} ${isDark ? 'bg-pink-600 text-white' : 'bg-pink-400 text-black'}`}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-center md:text-left">
              Let's build<br/>something<br/>wild.
            </h2>
            <button 
              onClick={onStart}
              className={`border-4 font-black text-2xl md:text-4xl px-8 py-6 uppercase transition-colors flex items-center gap-4 group ${borderClass} ${brutalShadow} ${isDark ? 'bg-[#f4f4f0] text-[#0f0f0f] hover:bg-violet-500 hover:text-white' : 'bg-[#0f0f0f] text-[#f4f4f0] hover:bg-violet-500 hover:text-white'}`}
            >
              <PenLine className="group-hover:scale-110 transition-transform" size={40} />
              Start Writing
            </button>
          </div>
        </div>

        <div className={`w-full border-y-4 py-4 flex overflow-hidden ${borderClass} ${isDark ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-black'}`}>
           <div className="animate-marquee-brutal flex w-max shrink-0 text-[12vw] font-black uppercase leading-none tracking-tighter">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <span className="mx-8">LUMNR STUDIO</span>
                  <span className="mx-8 text-outline-brutal-light">LUMNR STUDIO</span>
                </div>
              ))}
           </div>
        </div>

        <div className="px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 font-bold uppercase tracking-wide">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <button onClick={() => setModalContent('privacy')} className="hover:opacity-50 transition-opacity">Privacy</button>
            <button onClick={() => setModalContent('terms')} className="hover:opacity-50 transition-opacity">Terms</button>
            <a href="https://ko-fi.com/lumnr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
              <Coffee size={20} /> Support
            </a>
          </div>
          <div className="flex items-center gap-3 text-lg md:text-xl font-black">
              <span className="opacity-50">© {new Date().getFullYear()}</span> AAYAAM
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// COMPONENT: Reusable Modal Wrapper
// ==========================================
const Modal = ({ title, children, onClose, theme }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-6 animate-in">
    <div className={`${theme === 'dark' ? 'bg-[#1c1917] border-stone-800' : 'bg-[#faf8f5] border-stone-200'} border w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl`}>
      <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-stone-800' : 'border-stone-200/60'}`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>{title}</h2>
        <button onClick={onClose} className={`text-stone-400 hover:text-violet-500 transition-colors p-2 rounded-full ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'}`}>
          <X size={16} />
        </button>
      </div>
      <div className={`p-8 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'} text-sm leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-hide`}>
        {children}
      </div>
    </div>
  </div>
);

// ==========================================
// COMPONENT: Pop-up Modals Content
// ==========================================
const ContentModals = ({ modalContent, setModalContent, theme, activeNote, updateNote }) => {
  if (!modalContent) return null;
  const title = modalContent === 'about' ? "About lumnr" : modalContent === 'privacy' ? "Privacy Policy" : modalContent === 'terms' ? "Terms of Service" : modalContent === 'history' ? "Version History" : "";

  return (
    <Modal title={title} onClose={() => setModalContent(null)} theme={theme}>
      {modalContent === 'about' && (
        <div className="flex flex-col">
          <p className="mb-4">lumnr is a minimalist digital workspace designed to remove distractions and let your ideas shine.</p>
          <p className="mb-6">Built with a focus on speed and simplicity, it provides a clean slate for your daily thoughts, journals, or code snippets.</p>
          <a 
            href="https://ko-fi.com/lumnr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all shadow-sm ${theme === 'dark' ? 'bg-violet-500 text-white hover:bg-violet-400' : 'bg-violet-100 text-violet-900 hover:bg-violet-200'}`}
          >
            <Coffee size={16} /> Support the Project
          </a>
          <div className="flex items-center justify-center gap-1.5 opacity-60 text-[10px] uppercase tracking-widest mt-8 font-bold">
            <span>Made with</span>
            <Heart size={12} className="text-violet-400 fill-current" />
            <span>by Aayaam</span>
          </div>
        </div>
      )}
      {modalContent === 'privacy' && (
        <div className="flex flex-col space-y-6">
          <p className={`font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>Your data stays strictly with you.</p>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Local Storage</h3>
            <p>lumnr is a client-side application. All your notes, settings, and version histories are saved directly in your device's browser memory. We do not operate servers, and your data never leaves your device.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Data Collection</h3>
            <p>We do not track your typing, employ analytics, use tracking cookies, or sell your information. We have absolutely zero access to the content you create.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Security</h3>
            <p>Because your data is stored locally, the privacy and security of your notes depend entirely on the physical and digital security of your own device.</p>
          </div>
        </div>
      )}
      {modalContent === 'terms' && (
        <div className="flex flex-col space-y-6">
          <p className={`font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>By using lumnr, you agree to the following conditions.</p>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Data Loss & Backups</h3>
            <p>As lumnr relies entirely on browser local storage, clearing your browser cache, using strict incognito modes, or switching devices will result in permanent data loss unless you manually export your documents. You are solely responsible for maintaining your own backups.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>"As Is" Service</h3>
            <p>The software is provided "as is", without warranty of any kind, express or implied. We do not guarantee continuous availability or error-free operation.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Limitation of Liability</h3>
            <p>Under no circumstances shall the creators of lumnr be held liable for any data loss, damages, or issues arising from the use or inability to use this application.</p>
          </div>
        </div>
      )}
      {modalContent === 'history' && (
        <div className="flex flex-col gap-4">
          <p className="mb-2 text-xs opacity-80">Restore previous versions of this document. Versions are saved automatically.</p>
          {(!activeNote?.history || activeNote.history.length === 0) ? (
            <div className="text-center py-10 opacity-50 bg-stone-100 dark:bg-stone-800/50 rounded-2xl">No previous versions found.</div>
          ) : (
            activeNote.history.map((ver, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${theme === 'dark' ? 'border-stone-800 bg-stone-800/50 hover:bg-stone-800' : 'border-stone-200 bg-white hover:bg-stone-50 shadow-sm'}`}>
                <div className="flex flex-col">
                  <span className={`font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>{new Date(ver.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span className="text-xs opacity-60 truncate max-w-[200px] mt-0.5">{ver.title || 'Untitled'}</span>
                </div>
                <button 
                  onClick={() => {
                    updateNote(activeNote.id, { title: ver.title, content: ver.content });
                    setModalContent(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'bg-stone-700 hover:bg-violet-400 hover:text-stone-900 text-stone-200' : 'bg-stone-100 text-stone-700 hover:bg-violet-100 hover:text-violet-900'}`}
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
  return (
    <div className="flex-1 w-full px-5 sm:px-8 lg:px-16 pt-8 sm:pt-12 lg:pt-20 flex flex-col">
      {activeNote ? (
        <div className={`flex-1 flex flex-col space-y-6 sm:space-y-10 animate-in ${activeNote.deletedAt ? 'opacity-50 pointer-events-none' : ''}`}>
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
            placeholder="Untitled"
            disabled={!!activeNote.deletedAt}
            className={`w-full bg-transparent text-4xl sm:text-5xl font-bold tracking-tight focus:outline-none ${theme === 'dark' ? 'text-stone-100 placeholder:text-stone-700' : 'text-stone-800 placeholder:text-stone-300'}`}
          />
          <textarea
            id="note-textarea"
            value={activeNote.content}
            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
            placeholder="Write your thoughts..."
            disabled={!!activeNote.deletedAt}
            className={`w-full flex-1 bg-transparent text-lg sm:text-xl leading-relaxed focus:outline-none resize-none pb-12 lg:pb-20 scrollbar-hide ${theme === 'dark' ? 'text-stone-300 placeholder:text-stone-700' : 'text-stone-700 placeholder:text-stone-400'}`}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-stone-400 space-y-6">
          <div className={`p-6 rounded-full ${theme === 'dark' ? 'bg-stone-800/50' : 'bg-stone-100'}`}>
            <PenLine size={40} strokeWidth={1.5} className={theme === 'dark' ? 'text-stone-600' : 'text-stone-300'} />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold">Select a document to begin</p>
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
  moreMenuRef, moreMenuOpen, setMoreMenuOpen, setModalContent,
  onGoHome
}) => {
  return (
    <header className={`h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 z-10 ${theme === 'dark' ? 'bg-[#1c1917]/80 border-b border-stone-800 backdrop-blur-md' : 'bg-[#faf8f5]/80 border-b border-stone-200/60 backdrop-blur-md'}`}>
      <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap overflow-x-auto scrollbar-hide pr-2">
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <Clock size={12} strokeWidth={2} />
          {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
        </span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden sm:block ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
        <span className="hidden sm:inline flex-shrink-0">{wordCount} words</span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden md:block ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
        <span className="hidden md:inline flex-shrink-0">{charCount} characters</span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden lg:block ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
        <span className="hidden lg:inline flex-shrink-0">{readingTime} min read</span>
        <div className={`w-[1px] h-3 flex-shrink-0 ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
        <span className={`transition-opacity duration-500 flex-shrink-0 ${isSaving ? 'opacity-100 text-violet-400' : 'opacity-50'}`}>
          {isSaving ? 'Saving...' : 'Saved'}
        </span>
        {activeNote?.deletedAt && (
          <>
            <div className={`w-[1px] h-3 flex-shrink-0 ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-300'}`}></div>
            <span className="text-rose-400 flex-shrink-0">Archived Document</span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pl-2">
        <button onClick={onGoHome} className={`p-2 rounded-full transition-colors flex items-center ${theme === 'dark' ? 'text-stone-400 hover:text-violet-300 hover:bg-stone-800' : 'text-stone-500 hover:text-violet-600 hover:bg-stone-100'}`} title="Go Home">
          <Home size={16} strokeWidth={2.5} />
        </button>

        {!activeNote?.deletedAt && (
          <>
            <div className="relative" ref={shareMenuRef}>
              <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all px-4 py-2 rounded-full shadow-sm ${theme === 'dark' ? 'text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700' : 'text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200'}`}>
                <Share2 size={12} strokeWidth={2.5} /> Share
              </button>
              {shareMenuOpen && (
                <div className={`absolute right-0 top-12 w-48 border rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                  <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                    <Download size={14} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider border-b transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white border-stone-800' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700 border-stone-100'}`}>
                    <Copy size={14} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                    <Twitter size={14} /> X (Twitter)
                  </button>
                  <button onClick={() => shareToSocial('whatsapp')} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                    <ExternalLink size={14} /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="relative" ref={moreMenuRef}>
          <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`p-2 rounded-full transition-colors flex items-center ${theme === 'dark' ? 'text-stone-400 hover:text-violet-300 hover:bg-stone-800' : 'text-stone-500 hover:text-violet-600 hover:bg-stone-100'}`}>
            <MoreHorizontal size={18} strokeWidth={2.5} />
          </button>
          {moreMenuOpen && (
            <div className={`absolute right-0 top-12 w-48 border rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
              <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                <Info size={14} /> About
              </button>
              <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                <ShieldCheck size={14} /> Privacy
              </button>
              <button onClick={() => { setModalContent('terms'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                <FileText size={14} /> Terms
              </button>
            </div>
          )}
        </div>
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
    if (!isActive) return theme === 'dark' ? 'hover:bg-stone-800/50 text-stone-400' : 'hover:bg-stone-100 text-stone-500';
    return theme === 'dark' 
      ? 'bg-violet-900/30 text-violet-200 border border-violet-800/50' 
      : 'bg-violet-50 text-violet-900 border border-violet-200/60 shadow-sm';
  };

  return (
    <aside className={`${sidebarOpen ? 'w-[85vw] sm:w-80' : 'w-0'} absolute md:relative z-40 h-full transition-[width] duration-500 ease-in-out border-r flex flex-col overflow-hidden ${sidebarClasses} ${sidebarOpen ? 'shadow-2xl md:shadow-none' : ''}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-stone-800' : 'bg-violet-100'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${theme === 'dark' ? 'text-violet-300' : 'text-violet-600'}`}>
              <rect x="17" y="3" width="4" height="4" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={`font-black tracking-tight text-xl ${theme === 'dark' ? 'text-stone-100' : 'text-stone-800'}`}>lumnr</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={createNote} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-stone-800 text-stone-400 hover:text-violet-300' : 'hover:bg-violet-100 text-stone-500 hover:text-violet-600'}`}>
            <Plus size={18} strokeWidth={2.5} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className={`md:hidden p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-stone-800 text-stone-400 hover:text-violet-300' : 'hover:bg-violet-100 text-stone-500 hover:text-violet-600'}`}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-5 mb-6 space-y-4">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`} size={16} />
          <input 
            type="text"
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none transition-colors ${inputClasses}`}
          />
        </div>
        
        <div className={`flex gap-1.5 p-1.5 rounded-2xl ${theme === 'dark' ? 'bg-stone-900/50' : 'bg-stone-100/80'}`}>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${!showTrash && !showPinned ? (theme === 'dark' ? 'bg-stone-800 text-stone-100 shadow-sm' : 'bg-white text-stone-800 shadow-sm') : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
          >
            <PenLine size={14} /> Notes
          </button>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(true); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${!showTrash && showPinned ? (theme === 'dark' ? 'bg-stone-800 text-stone-100 shadow-sm' : 'bg-white text-stone-800 shadow-sm') : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
          >
            <Pin size={14} /> Pinned
          </button>
          <button 
            onClick={() => { setShowTrash(true); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all ${showTrash ? (theme === 'dark' ? 'bg-stone-800 text-stone-100 shadow-sm' : 'bg-white text-stone-800 shadow-sm') : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
          >
            <Trash size={14} /> Trash
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1.5 scrollbar-hide">
        {filteredNotes.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 text-stone-400 opacity-60">
            {showTrash ? <Trash size={24} /> : (showPinned ? <Pin size={24} /> : <PenLine size={24} />)}
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {showTrash ? "Trash is empty" : (showPinned ? "No pinned notes" : "No notes found")}
            </span>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => {
                setActiveNoteId(note.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`group flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent ${getAccentClass(activeNoteId === note.id)}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {note.pinned && <Pin size={12} className={`flex-shrink-0 fill-current ${activeNoteId === note.id ? '' : 'text-stone-400'}`} />}
                  <span className={`text-[15px] font-bold truncate ${activeNoteId === note.id ? '' : (theme === 'dark' ? 'text-stone-300' : 'text-stone-700')}`}>
                    {note.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {showTrash ? (
                    <>
                      <button onClick={(e) => restoreNote(note.id, e)} className="p-1.5 text-stone-400 hover:text-violet-500 transition-colors" title="Restore">
                        <RotateCcw size={14} />
                      </button>
                      <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors" title="Delete Permanently">
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={(e) => togglePin(note.id, e)} className={`p-1.5 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-current' : 'text-violet-400') : 'text-stone-400 hover:text-violet-500'}`}>
                        {note.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                      </button>
                      <button onClick={(e) => moveNoteToTrash(note.id, e)} className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors">
                        <Trash size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <span className={`text-[11px] line-clamp-1 truncate uppercase tracking-widest font-bold ${activeNoteId === note.id ? 'opacity-70' : 'text-stone-400'}`}>
                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={`p-5 border-t text-[10px] font-bold text-stone-400 uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-stone-800' : 'border-stone-200/60'}`}>
        <span>{notes.filter(n => !n.deletedAt).length} Docs</span>
        <div ref={settingsRef}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:text-violet-200 hover:bg-stone-800' : 'hover:text-violet-600 hover:bg-violet-50'}`}>
            <Settings size={16} strokeWidth={2} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-14 right-4 w-56 border rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
              <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button onClick={() => { setModalContent('history'); setSettingsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-violet-50 hover:text-violet-700'}`}>
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
      deletedAt: null
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
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('lumnr_theme') || 'dark';
  });
  
  const [showHome, setShowHome] = useState(true); // New state for Home Page
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const shareMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
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
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) setMoreMenuOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(event.target)) setSettingsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      updatedAt: Date.now(),
      pinned: false,
      deletedAt: null
    };
    setNotes(prev => {
      const updated = [newNote, ...prev];
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.updatedAt - a.updatedAt;
      });
    });
    setActiveNoteId(newNote.id);
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
    ? 'bg-[#1c1917] text-stone-100 selection:bg-violet-900/40 selection:text-violet-100' 
    : 'bg-[#faf8f5] text-stone-900 selection:bg-violet-200 selection:text-stone-900';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#1c1917]/90 border-stone-800 backdrop-blur-2xl'
    : 'bg-[#faf8f5]/90 border-stone-200/60 backdrop-blur-2xl';

  const inputClasses = theme === 'dark'
    ? 'bg-stone-800/50 border border-stone-700/50 text-stone-200 focus:border-violet-500/50 placeholder:text-stone-500'
    : 'bg-white border border-stone-200/60 text-stone-800 focus:border-violet-300 placeholder:text-stone-400 shadow-sm';

  return (
    <div className={`flex h-screen font-sans theme-transition ${themeClasses}`}>
      
      {showHome ? (
        <HomePage 
          theme={theme} 
          onStart={() => setShowHome(false)} 
          toggleTheme={toggleTheme} 
          setModalContent={setModalContent}
        />
      ) : (
        <>
          {/* 1. Mobile Overlay Background */}
          {sidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-30" 
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
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-1.5 border border-l-0 rounded-r-xl transition-all duration-500 shadow-sm ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-400 hover:text-violet-300 hover:bg-stone-700' : 'bg-white border-stone-200 text-stone-500 hover:text-violet-600 hover:bg-violet-50'}`}
            >
              <ChevronRight size={18} />
            </button>

            <Header 
              theme={theme} activeNote={activeNote} wordCount={wordCount} charCount={charCount}
              readingTime={readingTime} isSaving={isSaving} 
              shareMenuRef={shareMenuRef} shareMenuOpen={shareMenuOpen} setShareMenuOpen={setShareMenuOpen}
              downloadNote={downloadNote} copyToClipboard={copyToClipboard} shareToSocial={shareToSocial}
              moreMenuRef={moreMenuRef} moreMenuOpen={moreMenuOpen} setMoreMenuOpen={setMoreMenuOpen}
              setModalContent={setModalContent}
              onGoHome={() => setShowHome(true)}
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
        /* Added from index.css */
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        
        body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #faf8f5; }
        .theme-transition * { transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), fill 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .theme-transition { transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }

        /* BRUTALIST & AGENCY STYLES */
        .brutal-shadow-light {
          box-shadow: 8px 8px 0px 0px #0f0f0f;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .brutal-shadow-light:hover {
          box-shadow: 12px 12px 0px 0px #0f0f0f;
          transform: translate(-4px, -4px);
        }
        .brutal-shadow-dark {
          box-shadow: 8px 8px 0px 0px #f4f4f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .brutal-shadow-dark:hover {
          box-shadow: 12px 12px 0px 0px #f4f4f0;
          transform: translate(-4px, -4px);
        }

        .text-outline-brutal-light {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: #0f0f0f;
        }
        .text-outline-brutal-dark {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: #f4f4f0;
        }
        @media (min-width: 768px) {
          .text-outline-brutal-light, .text-outline-brutal-dark {
            -webkit-text-stroke-width: 4px;
          }
        }
        
        /* Griflan-style Text Reveals & Animations */
        @keyframes reveal {
          0% { transform: translateY(120%) rotate(4deg); opacity: 0; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes marquee-brutal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-brutal {
          animation: marquee-brutal 15s linear infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
