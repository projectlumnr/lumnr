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
  CheckSquare,
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
    <div className={`flex-1 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto relative animate-in font-['Quicksand',sans-serif] ${bgWrapper} ${textMain}`}>
      
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
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Cloud size={20} className={iconColor} /> Local only.
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Everything is stored securely in your browser's local storage. Zero servers, zero tracking.</p>
          </div>
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Star size={20} className={isDark ? 'text-[#ffd700]' : 'text-[#ffdf00]'} /> Auto-save.
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Yes! Lumnr automatically saves your progress as you type, and creates a backup snapshot every 5 minutes.</p>
          </div>
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm ${cardBg}`}>
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
              <CheckSquare size={20} className={iconColor} /> Checklists?
            </h4>
            <p className="font-semibold opacity-80 leading-relaxed">Simply click the checklist icon in the editor header, or type "- [ ]" to start a task. You can click the brackets directly!</p>
          </div>
          <div className={`p-8 md:p-10 rounded-[2.5rem] transition-transform hover:-translate-y-2 shadow-sm ${cardBg}`}>
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
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in">
    <div className={`${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border w-full max-w-lg rounded-xl overflow-hidden shadow-2xl`}>
      <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>{title}</h2>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800 transition-colors">
          <X size={18} />
        </button>
      </div>
      <div className={`p-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} text-sm leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-hide`}>
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
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[10px] uppercase tracking-[0.15em] font-bold transition-all shadow-sm ${theme === 'dark' ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-black'}`}
          >
            <Coffee size={14} /> Support the Project
          </a>
          <div className="flex items-center justify-center gap-1.5 opacity-50 text-[10px] uppercase tracking-widest mt-8">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-current" />
            <span>by Aayaam</span>
          </div>
        </div>
      )}
      {modalContent === 'privacy' && (
        <div className="flex flex-col space-y-5">
          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Your data stays strictly with you.</p>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Local Storage</h3>
            <p>lumnr is a client-side application. All your notes, settings, and version histories are saved directly in your device's browser memory. We do not operate servers, and your data never leaves your device.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Data Collection</h3>
            <p>We do not track your typing, employ analytics, use tracking cookies, or sell your information. We have absolutely zero access to the content you create.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Security</h3>
            <p>Because your data is stored locally, the privacy and security of your notes depend entirely on the physical and digital security of your own device.</p>
          </div>
        </div>
      )}
      {modalContent === 'terms' && (
        <div className="flex flex-col space-y-5">
          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>By using lumnr, you agree to the following conditions.</p>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Data Loss & Backups</h3>
            <p>As lumnr relies entirely on browser local storage, clearing your browser cache, using strict incognito modes, or switching devices will result in permanent data loss unless you manually export your documents. You are solely responsible for maintaining your own backups.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>"As Is" Service</h3>
            <p>The software is provided "as is", without warranty of any kind, express or implied. We do not guarantee continuous availability or error-free operation.</p>
          </div>
          <div>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Limitation of Liability</h3>
            <p>Under no circumstances shall the creators of lumnr be held liable for any data loss, damages, or issues arising from the use or inability to use this application.</p>
          </div>
        </div>
      )}
      {modalContent === 'history' && (
        <div className="flex flex-col gap-3">
          <p className="mb-4 text-xs opacity-70">Restore previous versions of this document. Versions are saved automatically.</p>
          {(!activeNote?.history || activeNote.history.length === 0) ? (
            <div className="text-center py-8 opacity-50">No previous versions found.</div>
          ) : (
            activeNote.history.map((ver, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80' : 'border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm'}`}>
                <div className="flex flex-col">
                  <span className={`font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>{new Date(ver.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span className="text-xs opacity-50 truncate max-w-[200px]">{ver.title || 'Untitled'}</span>
                </div>
                <button 
                  onClick={() => {
                    updateNote(activeNote.id, { title: ver.title, content: ver.content });
                    setModalContent(null);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-200 hover:text-zinc-900' : 'bg-zinc-100 border border-zinc-200 shadow-sm hover:bg-zinc-900 hover:text-white'}`}
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
const Editor = ({ activeNote, updateNote, handleTextareaClick, theme }) => {
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
            className={`w-full bg-transparent text-3xl sm:text-4xl font-semibold tracking-tight focus:outline-none ${theme === 'dark' ? 'text-zinc-50 placeholder:text-zinc-800' : 'text-zinc-900 placeholder:text-zinc-300'}`}
          />
          <textarea
            id="note-textarea"
            value={activeNote.content}
            onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
            onClick={handleTextareaClick}
            placeholder="Write your thoughts..."
            disabled={!!activeNote.deletedAt}
            className={`w-full flex-1 bg-transparent text-base sm:text-lg leading-relaxed focus:outline-none resize-none pb-12 lg:pb-20 scrollbar-hide ${theme === 'dark' ? 'text-zinc-300 placeholder:text-zinc-700' : 'text-zinc-800 placeholder:text-zinc-400'}`}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 space-y-4">
          <PenLine size={48} strokeWidth={1} />
          <p className="text-xs uppercase tracking-[0.2em]">Select a document to begin</p>
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
  handleToggleCheckbox, shareMenuRef, shareMenuOpen, setShareMenuOpen, 
  downloadNote, copyToClipboard, shareToSocial, 
  moreMenuRef, moreMenuOpen, setMoreMenuOpen, setModalContent,
  onGoHome
}) => {
  return (
    <header className={`h-14 flex-shrink-0 border-b flex items-center justify-between px-4 sm:px-6 z-10 ${theme === 'dark' ? 'border-zinc-800 bg-[#09090b]/80 backdrop-blur-md' : 'border-zinc-200 bg-[#fcfcfc]/80 backdrop-blur-md'}`}>
      <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-x-auto scrollbar-hide pr-2">
        <span className="flex items-center gap-1.5 flex-shrink-0">
          <Clock size={12} strokeWidth={1.5} />
          {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
        </span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden sm:block ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
        <span className="hidden sm:inline flex-shrink-0">{wordCount} words</span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden md:block ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
        <span className="hidden md:inline flex-shrink-0">{charCount} characters</span>
        <div className={`w-[1px] h-3 flex-shrink-0 hidden lg:block ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
        <span className="hidden lg:inline flex-shrink-0">{readingTime} min read</span>
        <div className={`w-[1px] h-3 flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
        <span className={`transition-opacity duration-500 flex-shrink-0 ${isSaving ? 'opacity-100 text-zinc-400' : 'opacity-50'}`}>
          {isSaving ? 'Saving...' : 'Saved'}
        </span>
        {activeNote?.deletedAt && (
          <>
            <div className={`w-[1px] h-3 flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
            <span className="text-red-400 flex-shrink-0">Archived Document</span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0 pl-2">
        <button onClick={onGoHome} className={`transition-colors flex items-center ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`} title="Go Home">
          <Home size={18} />
        </button>

        {!activeNote?.deletedAt && (
          <>
            <button onClick={handleToggleCheckbox} className={`transition-colors flex items-center ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`} title="Add/Toggle Checkbox">
              <CheckSquare size={18} />
            </button>
            <div className="relative" ref={shareMenuRef}>
              <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className={`flex items-center gap-2 text-[11px] uppercase tracking-widest transition-all px-3 py-1.5 rounded-md border shadow-sm ${theme === 'dark' ? 'text-zinc-300 hover:text-white bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'text-zinc-600 hover:text-zinc-900 bg-white border-zinc-200 hover:border-zinc-300'}`}>
                <Share2 size={12} /> Share
              </button>
              {shareMenuOpen && (
                <div className={`absolute right-0 top-10 w-48 border rounded-lg shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                    <Download size={12} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider border-b transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white border-zinc-800' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 border-zinc-100'}`}>
                    <Copy size={12} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                    <Twitter size={12} /> X (Twitter)
                  </button>
                  <button onClick={() => shareToSocial('whatsapp')} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                    <ExternalLink size={12} /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="relative" ref={moreMenuRef}>
          <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`transition-colors flex items-center ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}>
            <MoreHorizontal size={18} />
          </button>
          {moreMenuOpen && (
            <div className={`absolute right-0 top-10 w-40 border rounded-lg shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                <Info size={12} /> About
              </button>
              <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                <ShieldCheck size={12} /> Privacy
              </button>
              <button onClick={() => { setModalContent('terms'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                <FileText size={12} /> Terms
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
  createNote, searchQuery, setSearchQuery, showTrash, setShowTrash,
  filteredNotes, activeNoteId, setActiveNoteId, restoreNote,
  permanentlyDeleteNote, togglePin, moveNoteToTrash, notes,
  settingsRef, settingsOpen, setSettingsOpen, toggleTheme, setModalContent
}) => {
  const getAccentClass = (isActive) => {
    if (!isActive) return theme === 'dark' ? 'hover:bg-zinc-900/50 text-zinc-400' : 'hover:bg-zinc-100/80 text-zinc-500';
    return theme === 'dark' ? 'bg-zinc-800/80 text-zinc-100 shadow-sm' : 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60';
  };

  return (
    <aside className={`${sidebarOpen ? 'w-[85vw] sm:w-72' : 'w-0'} absolute md:relative z-40 h-full transition-[width] duration-500 ease-in-out border-r flex flex-col overflow-hidden ${sidebarClasses} ${sidebarOpen ? 'shadow-2xl md:shadow-none' : ''}`}>
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
            <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`font-medium tracking-tighter text-lg ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>lumnr</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={createNote} className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}>
            <Plus size={18} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className={`md:hidden p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}>
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 mb-4 space-y-2">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
          <input 
            type="text"
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-lg py-1.5 pl-9 pr-3 text-sm focus:outline-none transition-colors ${inputClasses}`}
          />
        </div>
        
        <div className={`flex gap-1 p-1 rounded-lg border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950/50' : 'border-zinc-200/80 bg-zinc-50/50'}`}>
          <button 
            onClick={() => setShowTrash(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-md transition-all ${!showTrash ? getAccentClass(true) : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            <PenLine size={12} /> Notes
          </button>
          <button 
            onClick={() => setShowTrash(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-md transition-all ${showTrash ? getAccentClass(true) : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            <Trash size={12} /> Trash
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-hide">
        {filteredNotes.length === 0 ? (
          <div className="mt-8 text-center text-[10px] uppercase tracking-widest text-zinc-500 opacity-50">
            {showTrash ? "Trash is empty" : "No notes found"}
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => {
                setActiveNoteId(note.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`group flex flex-col p-3 rounded-lg cursor-pointer transition-all duration-200 ${getAccentClass(activeNoteId === note.id)}`}
            >
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex items-center gap-2 overflow-hidden">
                  {note.pinned && <Pin size={10} className={`flex-shrink-0 fill-current ${activeNoteId === note.id ? '' : 'text-zinc-400'}`} />}
                  <span className={`text-sm font-medium truncate ${activeNoteId === note.id ? '' : (theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700')}`}>
                    {note.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {showTrash ? (
                    <>
                      <button onClick={(e) => restoreNote(note.id, e)} className="p-1 text-zinc-400 hover:text-blue-400 transition-colors" title="Restore">
                        <RotateCcw size={12} />
                      </button>
                      <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className="p-1 text-zinc-400 hover:text-red-400 transition-colors" title="Delete Permanently">
                        <Trash2 size={12} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={(e) => togglePin(note.id, e)} className={`p-1 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-current' : 'text-zinc-400') : 'text-zinc-400 hover:text-zinc-200'}`}>
                        {note.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                      </button>
                      <button onClick={(e) => moveNoteToTrash(note.id, e)} className="p-1 text-zinc-400 hover:text-red-400 transition-colors">
                        <Trash size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <span className={`text-[11px] line-clamp-1 truncate uppercase tracking-wider font-mono ${activeNoteId === note.id ? 'opacity-70' : 'text-zinc-500'}`}>
                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={`p-4 border-t text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <span>{notes.filter(n => !n.deletedAt).length} Docs</span>
        <div ref={settingsRef}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:text-zinc-200 hover:bg-zinc-800' : 'hover:text-zinc-900 hover:bg-zinc-100'}`}>
            <Settings size={14} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-12 right-0 w-56 border rounded-lg shadow-xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <button onClick={() => { setModalContent('history'); setSettingsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                <History size={12} /> Version History
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
    });
  });

  const [activeNoteId, setActiveNoteId] = useState(notes.find(n => !n.deletedAt)?.id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrash, setShowTrash] = useState(false);
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
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setShowTrash(false);
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
        if (a.pinned !== b.pinned) return b.pinned ? -1 : 1;
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
        if (a.pinned !== b.pinned) return b.pinned ? -1 : 1;
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

  const handleToggleCheckbox = () => {
    if (!activeNote || activeNote.deletedAt) return;
    const textarea = document.getElementById('note-textarea');
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    let lineEnd = value.indexOf('\n', selectionEnd);
    if (lineEnd === -1) lineEnd = value.length;

    const line = value.substring(lineStart, lineEnd);
    const checkboxMatch = line.match(/^(\s*-?\s*)\[([ xX])\](.*)/);

    let newContent = '';
    let newCursorPos = selectionStart;

    if (checkboxMatch) {
      const prefix = checkboxMatch[1];
      const isChecked = checkboxMatch[2].toLowerCase() === 'x';
      const remainder = checkboxMatch[3];
      const newBox = isChecked ? '[ ]' : '[x]';
      const newLine = `${prefix}${newBox}${remainder}`;
      newContent = value.substring(0, lineStart) + newLine + value.substring(lineEnd);
    } else {
      const newLine = `- [ ] ${line}`;
      newContent = value.substring(0, lineStart) + newLine + value.substring(lineEnd);
      newCursorPos += 6;
    }

    updateNote(activeNote.id, { content: newContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleTextareaClick = (e) => {
    const { selectionStart, selectionEnd, value } = e.target;
    if (selectionStart !== selectionEnd) return;

    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
    let lineEnd = value.indexOf('\n', selectionStart);
    if (lineEnd === -1) lineEnd = value.length;

    const line = value.substring(lineStart, lineEnd);
    const checkboxMatch = line.match(/^(\s*-?\s*)\[([ xX])\]/);

    if (checkboxMatch) {
      const prefixLength = checkboxMatch[1].length;
      const checkboxStart = lineStart + prefixLength;
      const checkboxEnd = checkboxStart + 3;

      if (selectionStart >= checkboxStart && selectionStart <= checkboxEnd) {
        const isChecked = checkboxMatch[2].toLowerCase() === 'x';
        const newChar = isChecked ? ' ' : 'x';
        const newContent = value.substring(0, checkboxStart + 1) + newChar + value.substring(checkboxStart + 2);

        updateNote(activeNote.id, { content: newContent });

        setTimeout(() => {
          const textarea = document.getElementById('note-textarea');
          if (textarea) textarea.setSelectionRange(selectionStart, selectionStart);
        }, 0);
      }
    }
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = showTrash ? !!n.deletedAt : !n.deletedAt;
    return matchesSearch && matchesSection;
  });

  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const themeClasses = theme === 'dark' 
    ? 'bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white' 
    : 'bg-[#fcfcfc] text-zinc-900 selection:bg-zinc-200 selection:text-black';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#09090b]/95 border-zinc-800 backdrop-blur-xl'
    : 'bg-[#fcfcfc]/95 border-zinc-200/80 backdrop-blur-xl';

  const inputClasses = theme === 'dark'
    ? 'bg-zinc-900/50 border-zinc-800 text-zinc-100 focus:border-zinc-700 placeholder:text-zinc-500'
    : 'bg-white border-zinc-200/80 text-zinc-900 focus:border-zinc-300 placeholder:text-zinc-400 shadow-sm';

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
              className="md:hidden fixed inset-0 bg-black/20 z-30" 
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* 2. Sidebar Component */}
          <Sidebar 
            sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} theme={theme}
            sidebarClasses={sidebarClasses} inputClasses={inputClasses}
            createNote={createNote} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            showTrash={showTrash} setShowTrash={setShowTrash} filteredNotes={filteredNotes}
            activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} restoreNote={restoreNote}
            permanentlyDeleteNote={permanentlyDeleteNote} togglePin={togglePin} moveNoteToTrash={moveNoteToTrash}
            notes={notes} settingsRef={settingsRef} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}
            toggleTheme={toggleTheme} setModalContent={setModalContent}
          />

          {/* 3. Main Interface */}
          <main className="flex-1 flex flex-col relative">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-1 border border-l-0 rounded-r-lg transition-all duration-500 shadow-sm ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
            >
              <ChevronRight size={16} />
            </button>

            <Header 
              theme={theme} activeNote={activeNote} wordCount={wordCount} charCount={charCount}
              readingTime={readingTime} isSaving={isSaving} handleToggleCheckbox={handleToggleCheckbox}
              shareMenuRef={shareMenuRef} shareMenuOpen={shareMenuOpen} setShareMenuOpen={setShareMenuOpen}
              downloadNote={downloadNote} copyToClipboard={copyToClipboard} shareToSocial={shareToSocial}
              moreMenuRef={moreMenuRef} moreMenuOpen={moreMenuOpen} setMoreMenuOpen={setMoreMenuOpen}
              setModalContent={setModalContent}
              onGoHome={() => setShowHome(true)}
            />

            <Editor 
              activeNote={activeNote} updateNote={updateNote} 
              handleTextareaClick={handleTextareaClick} theme={theme} 
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
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
        
        body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: black; }
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
