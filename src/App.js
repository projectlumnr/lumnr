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
  Home
} from 'lucide-react';

// ==========================================
// COMPONENT: Home / Landing Page
// ==========================================
const HomePage = ({ theme, onStart, toggleTheme, setModalContent }) => (
  <div className={`flex-1 w-full h-full flex flex-col items-center overflow-y-auto scrollbar-hide relative animate-in ${theme === 'dark' ? 'bg-[#1c1917]' : 'bg-[#faf8f5]'}`}>
    
    {/* Lively Background Blobs (Griflan-inspired pastel aesthetic vibes) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-60 dark:opacity-20">
      <div className="absolute w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse bg-orange-300/50 dark:bg-orange-500/40 -top-20 -left-20"></div>
      <div className="absolute w-[40vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse bg-rose-300/50 dark:bg-rose-500/40 top-40 right-10" style={{ animationDelay: '2s' }}></div>
      <div className="absolute w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse bg-amber-200/50 dark:bg-amber-500/30 -bottom-32 left-1/4" style={{ animationDelay: '4s' }}></div>
    </div>

    <button 
      onClick={toggleTheme} 
      className={`absolute top-6 right-6 p-3 rounded-full transition-colors z-20 ${theme === 'dark' ? 'text-stone-400 hover:text-orange-200 hover:bg-stone-800' : 'text-stone-500 hover:text-orange-700 hover:bg-white shadow-sm'}`}
      title="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
    
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full text-center px-6 py-20 mt-8 space-y-12 z-10">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className={`p-6 rounded-full backdrop-blur-md shadow-lg ${theme === 'dark' ? 'bg-stone-800/80 border border-stone-700' : 'bg-white/80 border border-orange-100'}`}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${theme === 'dark' ? 'text-orange-200' : 'text-orange-500'}`}>
            <rect x="17" y="3" width="4" height="4" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className={`text-7xl md:text-8xl font-black tracking-tighter ${theme === 'dark' ? 'text-stone-100' : 'text-stone-800'}`}>lumnr</h1>
      </div>
      
      <h2 className={`text-5xl md:text-6xl font-medium tracking-wide ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`} style={{ fontFamily: "'Caveat', cursive" }}>
        Welcome to your digital sanctuary.
      </h2>

      <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
        A beautifully lively workspace designed to remove distractions and let your ideas bloom.
      </p>
      
      <div className="pt-8">
        <button 
          onClick={onStart}
          className={`px-12 py-5 rounded-full font-black tracking-widest uppercase text-sm flex items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-2xl ${theme === 'dark' ? 'bg-orange-200 text-stone-900 shadow-orange-900/20' : 'bg-orange-500 text-white shadow-orange-500/30'}`}
        >
          <PenLine size={20} /> Start Writing
        </button>
      </div>
    </div>

    <div className={`w-full max-w-5xl px-6 py-20 mt-auto border-t z-10 backdrop-blur-sm ${theme === 'dark' ? 'border-stone-800/50' : 'border-stone-200/50'}`}>
      <h3 className={`text-sm font-black tracking-widest uppercase text-center mb-12 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Frequently Asked Questions</h3>
      <div className="grid gap-6 md:grid-cols-3 text-left">
        <div className={`p-8 rounded-3xl transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-stone-800/40 border border-stone-800 hover:bg-stone-800/80' : 'bg-white/60 border border-white hover:bg-white shadow-sm hover:shadow-md'}`}>
          <h4 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>Where are my notes saved?</h4>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Everything is stored securely in your browser's local storage. We don't use servers, and your data never leaves your device.</p>
        </div>
        <div className={`p-8 rounded-3xl transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-stone-800/40 border border-stone-800 hover:bg-stone-800/80' : 'bg-white/60 border border-white hover:bg-white shadow-sm hover:shadow-md'}`}>
          <h4 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>Is there an auto-save feature?</h4>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Yes! Lumnr automatically saves your progress as you type, and creates a backup snapshot every 5 minutes in case you make a mistake.</p>
        </div>
        <div className={`p-8 rounded-3xl transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-stone-800/40 border border-stone-800 hover:bg-stone-800/80' : 'bg-white/60 border border-white hover:bg-white shadow-sm hover:shadow-md'}`}>
          <h4 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>What if I clear my browser cache?</h4>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Clearing your cache will delete your notes. Be sure to use the "Export .txt" feature in the share menu to back up important documents.</p>
        </div>
      </div>
    </div>

    <footer className={`w-full max-w-5xl px-6 py-10 flex flex-col md:flex-row items-center justify-between text-xs font-bold tracking-wider uppercase border-t z-10 backdrop-blur-sm ${theme === 'dark' ? 'border-stone-800/50 text-stone-500' : 'border-stone-200/50 text-stone-400'}`}>
      <div className="flex items-center flex-wrap justify-center gap-8 mb-6 md:mb-0">
        <button onClick={() => setModalContent('privacy')} className={`transition-colors ${theme === 'dark' ? 'hover:text-stone-300' : 'hover:text-stone-600'}`}>Privacy</button>
        <button onClick={() => setModalContent('terms')} className={`transition-colors ${theme === 'dark' ? 'hover:text-stone-300' : 'hover:text-stone-600'}`}>Terms</button>
        <a href="https://ko-fi.com/lumnr" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'hover:text-orange-300' : 'hover:text-orange-500'}`}>
          <Coffee size={16} /> Support
        </a>
      </div>
      <div className="flex items-center gap-2 opacity-80">
        <span>Made with</span>
        <Heart size={14} className="text-rose-400 fill-current" />
        <span>by Aayaam</span>
      </div>
    </footer>
  </div>
);

// ==========================================
// COMPONENT: Reusable Modal Wrapper
// ==========================================
const Modal = ({ title, children, onClose, theme }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-6 animate-in">
    <div className={`${theme === 'dark' ? 'bg-[#1c1917] border-stone-800' : 'bg-[#faf8f5] border-stone-200'} border w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl`}>
      <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-stone-800' : 'border-stone-200/60'}`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>{title}</h2>
        <button onClick={onClose} className="text-stone-400 hover:text-orange-500 transition-colors bg-stone-100 dark:bg-stone-800 p-2 rounded-full">
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
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all shadow-sm ${theme === 'dark' ? 'bg-orange-200 text-stone-900 hover:bg-orange-300' : 'bg-orange-100 text-orange-900 hover:bg-orange-200'}`}
          >
            <Coffee size={16} /> Support the Project
          </a>
          <div className="flex items-center justify-center gap-1.5 opacity-60 text-[10px] uppercase tracking-widest mt-8 font-bold">
            <span>Made with</span>
            <Heart size={12} className="text-rose-400 fill-current" />
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
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'bg-stone-700 hover:bg-orange-200 hover:text-stone-900 text-stone-200' : 'bg-stone-100 text-stone-700 hover:bg-orange-100 hover:text-orange-900'}`}
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
        <span className={`transition-opacity duration-500 flex-shrink-0 ${isSaving ? 'opacity-100 text-orange-400' : 'opacity-50'}`}>
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
        <button onClick={onGoHome} className={`p-2 rounded-full transition-colors flex items-center ${theme === 'dark' ? 'text-stone-400 hover:text-orange-200 hover:bg-stone-800' : 'text-stone-500 hover:text-orange-600 hover:bg-stone-100'}`} title="Go Home">
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
                  <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                    <Download size={14} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider border-b transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white border-stone-800' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700 border-stone-100'}`}>
                    <Copy size={14} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                    <Twitter size={14} /> X (Twitter)
                  </button>
                  <button onClick={() => shareToSocial('whatsapp')} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                    <ExternalLink size={14} /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="relative" ref={moreMenuRef}>
          <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`p-2 rounded-full transition-colors flex items-center ${theme === 'dark' ? 'text-stone-400 hover:text-orange-200 hover:bg-stone-800' : 'text-stone-500 hover:text-orange-600 hover:bg-stone-100'}`}>
            <MoreHorizontal size={18} strokeWidth={2.5} />
          </button>
          {moreMenuOpen && (
            <div className={`absolute right-0 top-12 w-48 border rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
              <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                <Info size={14} /> About
              </button>
              <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                <ShieldCheck size={14} /> Privacy
              </button>
              <button onClick={() => { setModalContent('terms'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
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
      ? 'bg-orange-900/20 text-orange-200 border border-orange-900/30' 
      : 'bg-orange-50 text-orange-900 border border-orange-200/60 shadow-sm';
  };

  return (
    <aside className={`${sidebarOpen ? 'w-[85vw] sm:w-80' : 'w-0'} absolute md:relative z-40 h-full transition-[width] duration-500 ease-in-out border-r flex flex-col overflow-hidden ${sidebarClasses} ${sidebarOpen ? 'shadow-2xl md:shadow-none' : ''}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-stone-800' : 'bg-orange-100'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>
              <rect x="17" y="3" width="4" height="4" rx="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={`font-black tracking-tight text-xl ${theme === 'dark' ? 'text-stone-100' : 'text-stone-800'}`}>lumnr</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={createNote} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-stone-800 text-stone-400 hover:text-orange-300' : 'hover:bg-orange-100 text-stone-500 hover:text-orange-600'}`}>
            <Plus size={18} strokeWidth={2.5} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className={`md:hidden p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-stone-800 text-stone-400 hover:text-orange-300' : 'hover:bg-orange-100 text-stone-500 hover:text-orange-600'}`}>
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
                      <button onClick={(e) => restoreNote(note.id, e)} className="p-1.5 text-stone-400 hover:text-orange-500 transition-colors" title="Restore">
                        <RotateCcw size={14} />
                      </button>
                      <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors" title="Delete Permanently">
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={(e) => togglePin(note.id, e)} className={`p-1.5 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-current' : 'text-orange-400') : 'text-stone-400 hover:text-orange-500'}`}>
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
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:text-orange-200 hover:bg-stone-800' : 'hover:text-orange-600 hover:bg-orange-50'}`}>
            <Settings size={16} strokeWidth={2} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-14 right-4 w-56 border rounded-2xl shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
              <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button onClick={() => { setModalContent('history'); setSettingsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-stone-300 hover:bg-stone-800 hover:text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>
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
    ? 'bg-[#1c1917] text-stone-100 selection:bg-orange-900/40 selection:text-orange-100' 
    : 'bg-[#faf8f5] text-stone-900 selection:bg-orange-200 selection:text-stone-900';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#1c1917]/90 border-stone-800 backdrop-blur-2xl'
    : 'bg-[#faf8f5]/90 border-stone-200/60 backdrop-blur-2xl';

  const inputClasses = theme === 'dark'
    ? 'bg-stone-800/50 border border-stone-700/50 text-stone-200 focus:border-orange-500/50 placeholder:text-stone-500'
    : 'bg-white border border-stone-200/60 text-stone-800 focus:border-orange-300 placeholder:text-stone-400 shadow-sm';

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
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-1.5 border border-l-0 rounded-r-xl transition-all duration-500 shadow-sm ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-stone-800 border-stone-700 text-stone-400 hover:text-orange-300 hover:bg-stone-700' : 'bg-white border-stone-200 text-stone-500 hover:text-orange-600 hover:bg-orange-50'}`}
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

      {/* 4. Popups Component (Moved outside the condition so it works over the home page too) */}
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
      `}</style>
    </div>
  );
};

export default App;
