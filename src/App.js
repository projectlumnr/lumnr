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
  Sparkles,
  Cloud,
  Star
} from 'lucide-react';

// ==========================================
// COMPONENT: Home / Landing Page
// ==========================================
const HomePage = ({ theme, onStart, toggleTheme, setModalContent }) => {
  const isDark = theme === 'dark';
  
  // Mimu-inspired Soft Color Palette
  const bgWrapper = isDark ? 'bg-[#2b2738]' : 'bg-[#fff0f5]';
  const textMain = isDark ? 'text-[#fce4ec]' : 'text-[#6d4c41]';
  const cardBg = isDark ? 'bg-[#3b364c]' : 'bg-white';
  const btnBg = isDark ? 'bg-[#ff8da1]' : 'bg-[#ff9ebd]';
  const btnShadow = isDark ? 'shadow-[0_8px_0_#d86a80]' : 'shadow-[0_8px_0_#e07a9b]';
  const iconColor = isDark ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]';

  return (
    <div className={`flex-1 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto relative animate-in ${bgWrapper} ${textMain}`}>
      
      {/* Floating Background Decors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 lg:top-32 left-[10%] lg:left-[20%] animate-float-mimu opacity-60">
          <Cloud size={80} className={iconColor} fill="currentColor" />
        </div>
        <div className="absolute top-40 lg:top-52 right-[10%] lg:right-[20%] animate-bounce-slow opacity-80" style={{ animationDelay: '1s' }}>
          <Star size={56} className={isDark ? 'text-[#ffd700]' : 'text-[#ffdf00]'} fill="currentColor" />
        </div>
        <div className="absolute bottom-40 lg:bottom-64 left-[15%] lg:left-[25%] animate-float-mimu opacity-70" style={{ animationDelay: '2s' }}>
          <Sparkles size={64} className={isDark ? 'text-[#a6c9ff]' : 'text-[#87cefa]'} />
        </div>
        <div className="absolute bottom-20 lg:bottom-32 right-[15%] lg:right-[25%] animate-bounce-slow opacity-50" style={{ animationDelay: '0.5s' }}>
          <Heart size={48} className={iconColor} fill="currentColor" />
        </div>
      </div>

      {/* Top Bar */}
      <div className="w-full p-6 md:p-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-[1rem] ${cardBg} shadow-sm`}>
            <Sparkles size={24} className={iconColor} />
          </div>
          <span className="font-bold text-2xl tracking-tight">lumnr</span>
        </div>
        <button 
          onClick={toggleTheme} 
          className={`p-3 rounded-full transition-transform hover:scale-110 active:scale-95 shadow-sm ${cardBg}`}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} className="text-[#ffd700]" /> : <Moon size={20} className="text-[#a6c9ff]" />}
        </button>
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl w-full text-center px-6 py-12 z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
          lumnr.
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-bold mb-6 opacity-90">
          welcome to your digital sanctuary.
        </h2>

        <p className="text-lg md:text-xl font-semibold max-w-xl mx-auto leading-relaxed opacity-80 mb-12">
          a minimalist digital workspace designed to remove distractions and let your ideas shine.
        </p>
        
        {/* Mimu Squishy Button */}
        <button 
          onClick={onStart}
          className={`group px-10 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 transition-all duration-150 text-white ${btnBg} ${btnShadow} active:translate-y-[8px] active:shadow-none hover:brightness-105`}
        >
          <PenLine size={24} className="group-hover:rotate-12 transition-transform" /> 
          Start Writing
        </button>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-5xl px-6 py-20 z-10">
        <h3 className="text-2xl font-bold text-center mb-10 opacity-90">
          ✨ Good to know ✨
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm border-2 ${isDark ? 'border-[#4a445d]' : 'border-[#ffccd5]'} ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Cloud size={20} className={iconColor} /> Local only.
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Everything is stored securely in your browser's local storage. Zero servers, zero tracking.</p>
          </div>
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm border-2 ${isDark ? 'border-[#4a445d]' : 'border-[#ffccd5]'} ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Star size={20} className={isDark ? 'text-[#ffd700]' : 'text-[#ffdf00]'} /> Auto-save.
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Yes! Lumnr automatically saves your progress as you type, and creates a backup snapshot every 5 minutes.</p>
          </div>
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm border-2 ${isDark ? 'border-[#4a445d]' : 'border-[#ffccd5]'} ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Trash2 size={20} className={isDark ? 'text-[#a6c9ff]' : 'text-[#87cefa]'} /> Cache care.
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Clearing your cache will delete your notes. Be sure to use the "Export .txt" feature to back up important documents.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-12 flex flex-col items-center justify-center gap-6 font-bold z-10 opacity-80">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <button onClick={() => setModalContent('privacy')} className="hover:opacity-60 transition-opacity">Privacy</button>
          <button onClick={() => setModalContent('terms')} className="hover:opacity-60 transition-opacity">Terms</button>
          <a href="https://ko-fi.com/lumnr" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:opacity-60 transition-opacity ${iconColor}`}>
            <Coffee size={18} /> Support
          </a>
        </div>
        <div className="flex items-center gap-2 mt-4 text-lg">
          crafted with <Heart size={20} className="text-red-400 fill-current animate-bounce-slow" /> by Aayaam
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// COMPONENT: Reusable Modal Wrapper
// ==========================================
const Modal = ({ title, children, onClose, theme }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-6 animate-in">
    <div className={`${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffccd5]'} border-2 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl`}>
      <div className={`flex items-center justify-between p-6 border-b-2 ${theme === 'dark' ? 'border-[#4a445d]' : 'border-[#ffccd5]'}`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]'}`}>{title}</h2>
        <button onClick={onClose} className={`p-2 rounded-full transition-transform hover:scale-110 active:scale-95 ${theme === 'dark' ? 'bg-[#4a445d] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-[#fff0f5] text-[#ff6b8b] hover:text-[#6d4c41]'}`}>
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className={`p-8 ${theme === 'dark' ? 'text-[#e6d5eb]' : 'text-[#8d6e63]'} text-sm font-medium leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-hide`}>
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
        <div className="flex flex-col text-center items-center">
          <Sparkles size={48} className={`mb-4 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`} />
          <p className="mb-4 text-base font-bold">lumnr is a cozy digital workspace designed to remove distractions and let your ideas shine.</p>
          <p className="mb-8 opacity-80">Built with a focus on speed, privacy, and absolute cuteness. A soft slate for your daily thoughts.</p>
          <a 
            href="https://ko-fi.com/lumnr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-3xl text-sm font-bold transition-all shadow-sm active:translate-y-1 ${theme === 'dark' ? 'bg-[#ff8da1] text-white hover:brightness-110 shadow-[0_4px_0_#d86a80]' : 'bg-[#ff9ebd] text-white hover:brightness-105 shadow-[0_4px_0_#e07a9b]'}`}
          >
            <Coffee size={18} /> Buy me a coffee!
          </a>
          <div className="flex items-center justify-center gap-1.5 opacity-60 text-xs font-bold mt-8">
            <span>Made with</span>
            <Heart size={14} className="text-[#ff6b8b] fill-current" />
            <span>by Aayaam</span>
          </div>
        </div>
      )}
      {modalContent === 'privacy' && (
        <div className="flex flex-col space-y-6">
          <p className={`font-bold text-base ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]'}`}>✨ Your data stays strictly with you.</p>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}><Cloud size={14}/> Local Storage</h3>
            <p>lumnr is a client-side application. All your notes, settings, and version histories are saved directly in your device's browser memory. We do not operate servers, and your data never leaves your device.</p>
          </div>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}><Sparkles size={14}/> Data Collection</h3>
            <p>We do not track your typing, employ analytics, use tracking cookies, or sell your information. We have absolutely zero access to the content you create.</p>
          </div>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}><ShieldCheck size={14}/> Security</h3>
            <p>Because your data is stored locally, the privacy and security of your notes depend entirely on the physical and digital security of your own device.</p>
          </div>
        </div>
      )}
      {modalContent === 'terms' && (
        <div className="flex flex-col space-y-6">
          <p className={`font-bold text-base ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]'}`}>✨ By using lumnr, you agree to the following.</p>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}>Data Loss & Backups</h3>
            <p>As lumnr relies entirely on browser local storage, clearing your browser cache, using strict incognito modes, or switching devices will result in permanent data loss unless you manually export your documents. You are solely responsible for maintaining your own backups.</p>
          </div>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}>"As Is" Service</h3>
            <p>The software is provided "as is", without warranty of any kind, express or implied. We do not guarantee continuous availability or error-free operation.</p>
          </div>
          <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'}`}>Limitation of Liability</h3>
            <p>Under no circumstances shall the creators of lumnr be held liable for any data loss, damages, or issues arising from the use or inability to use this application.</p>
          </div>
        </div>
      )}
      {modalContent === 'history' && (
        <div className="flex flex-col gap-3">
          <p className="mb-4 text-xs opacity-70 font-bold text-center">Restore previous versions of this document. Versions are saved automatically.</p>
          {(!activeNote?.history || activeNote.history.length === 0) ? (
            <div className={`text-center py-8 opacity-50 rounded-3xl ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>No previous versions found.</div>
          ) : (
            activeNote.history.map((ver, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all ${theme === 'dark' ? 'border-[#4a445d] bg-[#2b2738] hover:bg-[#3b364c]' : 'border-[#ffccd5] bg-white hover:bg-[#fff0f5]'}`}>
                <div className="flex flex-col">
                  <span className={`font-bold ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]'}`}>{new Date(ver.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span className="text-xs opacity-60 truncate max-w-[180px] mt-0.5">{ver.title || 'Untitled'}</span>
                </div>
                <button 
                  onClick={() => {
                    updateNote(activeNote.id, { title: ver.title, content: ver.content });
                    setModalContent(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-[#4a445d] hover:bg-[#ff8da1] hover:text-white' : 'bg-[#fff0f5] border-2 border-[#ffccd5] hover:bg-[#ff9ebd] hover:border-[#ff9ebd] hover:text-white'}`}
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
            className={`w-full bg-transparent text-4xl sm:text-5xl font-bold tracking-tight focus:outline-none ${theme === 'dark' ? 'text-[#fce4ec] placeholder:text-[#4a445d]' : 'text-[#6d4c41] placeholder:text-[#ffccd5]'}`}
          />
          <textarea
            id="note-textarea"
            value={activeNote.content}
            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
            placeholder="Write your thoughts..."
            disabled={!!activeNote.deletedAt}
            className={`w-full flex-1 bg-transparent text-lg sm:text-xl font-medium leading-relaxed focus:outline-none resize-none pb-12 lg:pb-20 scrollbar-hide ${theme === 'dark' ? 'text-[#e6d5eb] placeholder:text-[#4a445d]' : 'text-[#8d6e63] placeholder:text-[#ffccd5]'}`}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-60">
          <div className={`p-8 rounded-[2rem] shadow-sm ${theme === 'dark' ? 'bg-[#3b364c]' : 'bg-white'}`}>
            <Sparkles size={64} className={theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'} />
          </div>
          <p className={`text-sm font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-[#e6d5eb]' : 'text-[#8d6e63]'}`}>Select a document to begin ✨</p>
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
    <header className={`h-16 flex-shrink-0 border-b-2 flex items-center justify-between px-4 sm:px-6 z-10 ${theme === 'dark' ? 'border-[#4a445d] bg-[#2b2738]/80 backdrop-blur-md' : 'border-[#ffccd5] bg-[#fff0f5]/80 backdrop-blur-md'}`}>
      <div className={`flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap overflow-x-auto scrollbar-hide pr-2 ${theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#a1887f]'}`}>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <Clock size={14} strokeWidth={2.5} />
          {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
        </span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden sm:block ${theme === 'dark' ? 'bg-[#4a445d]' : 'bg-[#ffccd5]'}`}></div>
        <span className="hidden sm:inline flex-shrink-0">{wordCount} words</span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden md:block ${theme === 'dark' ? 'bg-[#4a445d]' : 'bg-[#ffccd5]'}`}></div>
        <span className="hidden md:inline flex-shrink-0">{charCount} characters</span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full hidden lg:block ${theme === 'dark' ? 'bg-[#4a445d]' : 'bg-[#ffccd5]'}`}></div>
        <span className="hidden lg:inline flex-shrink-0">{readingTime} min read</span>
        <div className={`w-[2px] h-4 flex-shrink-0 rounded-full ${theme === 'dark' ? 'bg-[#4a445d]' : 'bg-[#ffccd5]'}`}></div>
        <span className={`transition-opacity duration-500 flex-shrink-0 ${isSaving ? `opacity-100 ${theme === 'dark' ? 'text-[#ff8da1]' : 'text-[#ff6b8b]'}` : 'opacity-50'}`}>
          {isSaving ? 'Saving ✨' : 'Saved'}
        </span>
        {activeNote?.deletedAt && (
          <>
            <div className={`w-[2px] h-4 flex-shrink-0 rounded-full ${theme === 'dark' ? 'bg-[#4a445d]' : 'bg-[#ffccd5]'}`}></div>
            <span className="text-[#ff6b8b] flex-shrink-0">Archived Document</span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 pl-2">
        <button onClick={onGoHome} className={`p-2.5 rounded-full transition-all active:scale-95 flex items-center ${theme === 'dark' ? 'text-[#ffb7c5] hover:text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#ff6b8b] hover:text-[#6d4c41] hover:bg-white shadow-sm'}`} title="Go Home">
          <Home size={18} strokeWidth={2.5} />
        </button>

        {!activeNote?.deletedAt && (
          <>
            <div className="relative" ref={shareMenuRef}>
              <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all px-4 py-2.5 rounded-full active:scale-95 border-2 shadow-sm ${theme === 'dark' ? 'text-[#fce4ec] bg-[#3b364c] border-[#4a445d] hover:bg-[#4a445d]' : 'text-[#6d4c41] bg-white border-[#ffccd5] hover:bg-[#fff0f5]'}`}>
                <Share2 size={14} strokeWidth={2.5} /> Share
              </button>
              {shareMenuOpen && (
                <div className={`absolute right-0 top-12 w-48 border-2 rounded-3xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffccd5]'}`}>
                  <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                    <Download size={16} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold border-b-2 transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d] border-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b] border-[#ffccd5]'}`}>
                    <Copy size={16} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                    <Twitter size={16} /> Twitter
                  </button>
                  <button onClick={() => shareToSocial('whatsapp')} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                    <ExternalLink size={16} /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="relative" ref={moreMenuRef}>
          <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`p-2.5 rounded-full transition-all active:scale-95 flex items-center ${theme === 'dark' ? 'text-[#ffb7c5] hover:text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#ff6b8b] hover:text-[#6d4c41] hover:bg-white shadow-sm'}`}>
            <MoreHorizontal size={20} strokeWidth={2.5} />
          </button>
          {moreMenuOpen && (
            <div className={`absolute right-0 top-12 w-48 border-2 rounded-3xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffccd5]'}`}>
              <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                <Info size={16} /> About
              </button>
              <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                <ShieldCheck size={16} /> Privacy
              </button>
              <button onClick={() => { setModalContent('terms'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                <FileText size={16} /> Terms
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
    if (!isActive) return theme === 'dark' ? 'hover:bg-[#2b2738]/80 text-[#9e96b3]' : 'hover:bg-[#fff0f5]/80 text-[#a1887f]';
    return theme === 'dark' 
      ? 'bg-[#2b2738] text-[#fce4ec] border-2 border-[#4a445d] shadow-sm' 
      : 'bg-[#fff0f5] text-[#6d4c41] border-2 border-[#ffccd5] shadow-sm';
  };

  return (
    <aside className={`${sidebarOpen ? 'w-[85vw] sm:w-80' : 'w-0'} absolute md:relative z-40 h-full transition-[width] duration-500 ease-in-out flex flex-col overflow-hidden ${sidebarClasses} ${sidebarOpen ? 'shadow-2xl md:shadow-none' : ''}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-[1rem] shadow-sm ${theme === 'dark' ? 'bg-[#2b2738] border border-[#4a445d]' : 'bg-white border border-[#ffccd5]'}`}>
             <Sparkles size={20} className={theme === 'dark' ? 'text-[#ffb7c5]' : 'text-[#ff6b8b]'} />
          </div>
          <span className={`font-bold tracking-tight text-2xl ${theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]'}`}>lumnr</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={createNote} className={`p-2.5 rounded-full transition-transform active:scale-95 ${theme === 'dark' ? 'bg-[#2b2738] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-white text-[#ff6b8b] hover:text-[#6d4c41] shadow-sm'}`}>
            <Plus size={20} strokeWidth={2.5} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className={`md:hidden p-2.5 rounded-full transition-transform active:scale-95 ${theme === 'dark' ? 'bg-[#2b2738] text-[#ffb7c5] hover:text-[#fce4ec]' : 'bg-white text-[#ff6b8b] hover:text-[#6d4c41] shadow-sm'}`}>
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-5 mb-6 space-y-4">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#ffb7c5]'}`} size={18} />
          <input 
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none transition-colors ${inputClasses}`}
          />
        </div>
        
        <div className={`flex gap-1.5 p-1.5 rounded-[1.2rem] ${theme === 'dark' ? 'bg-[#2b2738]' : 'bg-[#fff0f5]'}`}>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-all ${!showTrash && !showPinned ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#6d4c41]')}`}
          >
            <PenLine size={14} /> Notes
          </button>
          <button 
            onClick={() => { setShowTrash(false); setShowPinned(true); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-all ${!showTrash && showPinned ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#6d4c41]')}`}
          >
            <Pin size={14} /> Pinned
          </button>
          <button 
            onClick={() => { setShowTrash(true); setShowPinned(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-all ${showTrash ? (theme === 'dark' ? 'bg-[#3b364c] text-[#ffb7c5] shadow-sm' : 'bg-white text-[#ff6b8b] shadow-sm') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#fce4ec]' : 'text-[#a1887f] hover:text-[#6d4c41]')}`}
          >
            <Trash size={14} /> Trash
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-hide">
        {filteredNotes.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 opacity-50">
            {showTrash ? <Trash size={40} className={theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#ffb7c5]'} /> : (showPinned ? <Star size={40} className={theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#ffb7c5]'} /> : <Cloud size={40} className={theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#ffb7c5]'} />)}
            <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#a1887f]'}`}>
              {showTrash ? "Trash is empty" : (showPinned ? "No pinned notes ✨" : "So empty here ✨")}
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
              className={`group flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-transparent ${getAccentClass(activeNoteId === note.id)}`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {note.pinned && <Pin size={14} className={`flex-shrink-0 fill-current ${activeNoteId === note.id ? '' : 'text-[#ffb7c5]'}`} />}
                  <span className={`text-[15px] font-bold truncate ${activeNoteId === note.id ? '' : (theme === 'dark' ? 'text-[#fce4ec]' : 'text-[#6d4c41]')}`}>
                    {note.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {showTrash ? (
                    <>
                      <button onClick={(e) => restoreNote(note.id, e)} className={`p-1.5 transition-colors ${theme === 'dark' ? 'text-[#9e96b3] hover:text-[#ffb7c5]' : 'text-[#ffb7c5] hover:text-[#ff6b8b]'}`} title="Restore">
                        <RotateCcw size={16} strokeWidth={2.5} />
                      </button>
                      <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className={`p-1.5 transition-colors ${theme === 'dark' ? 'text-[#9e96b3] hover:text-red-400' : 'text-[#ffb7c5] hover:text-red-500'}`} title="Delete Permanently">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={(e) => togglePin(note.id, e)} className={`p-1.5 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-current' : 'text-[#ffb7c5]') : (theme === 'dark' ? 'text-[#9e96b3] hover:text-[#ffb7c5]' : 'text-[#ffb7c5] hover:text-[#ff6b8b]')}`}>
                        {note.pinned ? <PinOff size={16} strokeWidth={2.5} /> : <Pin size={16} strokeWidth={2.5} />}
                      </button>
                      <button onClick={(e) => moveNoteToTrash(note.id, e)} className={`p-1.5 transition-colors ${theme === 'dark' ? 'text-[#9e96b3] hover:text-red-400' : 'text-[#ffb7c5] hover:text-red-500'}`}>
                        <Trash size={16} strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <span className={`text-[10px] line-clamp-1 truncate uppercase tracking-widest font-bold ${activeNoteId === note.id ? 'opacity-80' : (theme === 'dark' ? 'text-[#9e96b3]' : 'text-[#a1887f]')}`}>
                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={`p-5 border-t-2 text-[11px] font-bold uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-[#4a445d] text-[#9e96b3]' : 'border-[#ffccd5] text-[#a1887f]'}`}>
        <span>{notes.filter(n => !n.deletedAt).length} Docs</span>
        <div ref={settingsRef}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-2 rounded-full transition-transform active:scale-95 ${theme === 'dark' ? 'hover:bg-[#2b2738] hover:text-[#fce4ec]' : 'hover:bg-white hover:text-[#ff6b8b] hover:shadow-sm'}`}>
            <Settings size={18} strokeWidth={2.5} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-16 right-4 w-56 border-2 rounded-3xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d]' : 'bg-white border-[#ffccd5]'}`}>
              <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button onClick={() => { setModalContent('history'); setSettingsOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-bold transition-colors ${theme === 'dark' ? 'text-[#fce4ec] hover:bg-[#4a445d]' : 'text-[#6d4c41] hover:bg-[#fff0f5] hover:text-[#ff6b8b]'}`}>
                <History size={16} /> Version History
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
    ? 'bg-[#2b2738] text-[#fce4ec] selection:bg-[#ff8da1] selection:text-[#fff]' 
    : 'bg-[#fff0f5] text-[#6d4c41] selection:bg-[#ffb7c5] selection:text-[#6d4c41]';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#3b364c]/95 border-[#4a445d] border-r-2 backdrop-blur-xl'
    : 'bg-white/95 border-[#ffccd5] border-r-2 backdrop-blur-xl';

  const inputClasses = theme === 'dark'
    ? 'bg-[#2b2738] border-2 border-[#4a445d] text-[#fce4ec] focus:border-[#ff8da1] placeholder:text-[#9e96b3] shadow-inner'
    : 'bg-[#fff0f5] border-2 border-[#ffccd5] text-[#6d4c41] focus:border-[#ff9ebd] placeholder:text-[#a1887f] shadow-inner';

  return (
    <div className={`flex h-screen font-sans theme-transition font-['Quicksand',sans-serif] ${themeClasses}`}>
      
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
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30" 
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
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2 border-y-2 border-r-2 rounded-r-2xl transition-transform active:scale-95 shadow-sm ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-[#3b364c] border-[#4a445d] text-[#ffb7c5]' : 'bg-white border-[#ffccd5] text-[#ff6b8b]'}`}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
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

      {/* 4. Popups Component (Moved outside the condition so it works over the home page too) */}
      <ContentModals 
        modalContent={modalContent} setModalContent={setModalContent} 
        theme={theme} activeNote={activeNote} updateNote={updateNote} 
      />

      {/* Global CSS */}
      <style>{`
        /* Added from index.css */
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
        
        body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #fff0f5; }
        .theme-transition * { transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), fill 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .theme-transition { transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }

        /* Mimu Aesthetic Animations */
        @keyframes float-mimu {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-mimu { animation: float-mimu 6s ease-in-out infinite; }
        
        @keyframes bounce-mimu {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-mimu 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
