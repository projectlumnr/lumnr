/* PROJECT: Lumnr (v1.2 - Stable)
  DESCRIPTION: Minimalist digital notebook with local persistence.
  TECH STACK: React, Tailwind CSS, Lucide Icons.
  STORAGE: Browser localStorage.
*/

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, PenLine, Clock, MoreHorizontal, Share2, Download, Copy,
  Plus, Search, RotateCcw, Trash2, Trash, Pin, PinOff, Settings, 
  Sun, Moon, Palette, X, Heart 
} from 'lucide-react';

// --- MODULAR SUB-COMPONENTS ---

/**
 * Sidebar Component
 */
const Sidebar = ({ 
  sidebarOpen, theme, createNote, searchQuery, setSearchQuery, 
  showTrash, setShowTrash, filteredNotes, activeNoteId, setActiveNoteId, 
  getAccentClass, togglePin, moveNoteToTrash, restoreNote, permanentlyDeleteNote,
  notesCount, settingsOpen, setSettingsOpen, toggleTheme, accentColor, 
  setAccentColor, accents, settingsRef 
}) => {
  const sidebarClasses = theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200';
  const inputClasses = theme === 'dark'
    ? 'bg-[#000] border-[#1f1f1f] text-white focus:border-zinc-500 placeholder:text-zinc-700'
    : 'bg-[#f5f5f5] border-zinc-200 text-zinc-900 focus:border-zinc-400 placeholder:text-zinc-400';

  return (
    <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-[width] duration-500 ease-in-out border-r flex flex-col overflow-hidden ${sidebarClasses}`}>
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`font-medium tracking-tighter text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>lumnr</span>
        </div>
        <button onClick={createNote} className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-[#1f1f1f] text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-black'}`}>
          <Plus size={18} />
        </button>
      </div>

      <div className="px-4 mb-4 space-y-2">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input 
            type="text"
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none ${inputClasses}`}
          />
        </div>
        
        <div className={`flex gap-1 p-1 rounded-lg border ${theme === 'dark' ? 'border-[#1f1f1f] bg-black/40' : 'border-zinc-100 bg-zinc-50'}`}>
          <button 
            onClick={() => setShowTrash(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-md transition-all ${!showTrash ? getAccentClass(true) + ' shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            <PenLine size={12} /> Notes
          </button>
          <button 
            onClick={() => setShowTrash(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-md transition-all ${showTrash ? (theme === 'dark' ? 'bg-[#1f1f1f] text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            <Trash size={12} /> Trash
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-hide">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className={`group flex flex-col p-3 rounded-md cursor-pointer transition-all duration-300 ${getAccentClass(activeNoteId === note.id)}`}
          >
            <div className="flex justify-between items-start mb-0.5">
              <div className="flex items-center gap-2 overflow-hidden">
                {note.pinned && <Pin size={10} className={`flex-shrink-0 fill-current ${activeNoteId === note.id ? '' : 'text-zinc-500'}`} />}
                <span className={`text-sm font-medium truncate ${activeNoteId === note.id ? '' : (theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600')}`}>
                  {note.title || 'Untitled'}
                </span>
              </div>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {showTrash ? (
                  <>
                    <button onClick={(e) => restoreNote(note.id, e)} className="p-1 text-zinc-500 hover:text-blue-400 transition-colors">
                      <RotateCcw size={12} />
                    </button>
                    <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => togglePin(note.id, e)} className={`p-1 transition-colors ${note.pinned ? (activeNoteId === note.id ? 'text-current' : 'text-zinc-300') : 'text-zinc-500 hover:text-zinc-300'}`}>
                      {note.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                    </button>
                    <button onClick={(e) => moveNoteToTrash(note.id, e)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors">
                      <Trash size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-4 border-t text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-200'}`}>
        <span>{notesCount} Docs</span>
        <div ref={settingsRef}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:text-zinc-300' : 'hover:text-zinc-800'}`}>
            <Settings size={14} />
          </button>
          {settingsOpen && (
            <div className={`absolute bottom-12 right-0 w-56 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
              <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider">
                {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </button>
              <div className={`mx-4 my-2 border-t pt-3 flex flex-col gap-2 ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-100'}`}>
                <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase">
                  <Palette size={10} /> Accent
                </div>
                <div className="flex gap-2">
                  {Object.keys(accents).map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-5 h-5 rounded-full ring-offset-2 ${accentColor === color ? 'ring-2 ring-zinc-500' : ''} ${accents[color].dot}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

/**
 * Editor Component
 */
const Editor = ({ 
  activeNote, theme, updateNote, wordCount, charCount, 
  shareMenuOpen, setShareMenuOpen, moreMenuOpen, setMoreMenuOpen,
  shareMenuRef, moreMenuRef, setModalContent, sidebarOpen, setSidebarOpen 
}) => {
  return (
    <main className="flex-1 flex flex-col relative">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1 border border-l-0 rounded-r-md transition-all duration-500 ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f] text-zinc-500 hover:text-white' : 'bg-white border-zinc-200 text-zinc-400 hover:text-black'}`}
      >
        <ChevronRight size={16} />
      </button>

      <header className={`h-14 border-b flex items-center justify-between px-6 ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4 text-[11px] text-zinc-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Clock size={12} strokeWidth={1.5} />
            {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
          </span>
          <div className="w-[1px] h-3 bg-zinc-200"></div>
          <span>{wordCount} words</span>
          <div className="w-[1px] h-3 bg-zinc-200"></div>
          <span>{charCount} chars</span>
        </div>
        
        <div className="flex items-center gap-3">
          {!activeNote?.deletedAt && (
            <div className="relative" ref={shareMenuRef}>
              <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className="flex items-center gap-2 text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-md border">
                <Share2 size={12} /> Share
              </button>
              {shareMenuOpen && (
                <div className={`absolute right-0 top-10 w-48 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                    <Download size={12} /> Download .txt
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                    <Copy size={12} /> Copy Text
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="relative" ref={moreMenuRef}>
            <button onClick={() => setMoreMenuOpen(!moreMenuOpen)}>
              <MoreHorizontal size={18} />
            </button>
            {moreMenuOpen && (
              <div className={`absolute right-0 top-10 w-40 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                  <Info size={12} /> About
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 lg:py-20 overflow-y-auto scrollbar-hide">
        {activeNote ? (
          <div className={`space-y-10 animate-in ${activeNote.deletedAt ? 'opacity-50 pointer-events-none' : ''}`}>
            <input
              type="text"
              value={activeNote.title}
              onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
              placeholder="Untitled"
              className={`w-full bg-transparent text-4xl font-semibold focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}
            />
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              placeholder="Write your thoughts..."
              className={`w-full h-full bg-transparent text-lg leading-relaxed focus:outline-none resize-none min-h-[60vh] ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
            <PenLine size={48} strokeWidth={1} />
            <p className="text-xs uppercase tracking-[0.2em]">Select a document</p>
          </div>
        )}
      </div>
    </main>
  );
};

/**
 * Modal Component
 */
const Modal = ({ title, children, onClose, theme }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in">
    <div className={`${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'} border w-full max-w-lg rounded-xl overflow-hidden shadow-2xl`}>
      <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-100'}`}>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
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

// --- MAIN APPLICATION ---

const App = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('lumnr_notes');
    return saved ? JSON.parse(saved) : [{
      id: '1', title: 'Welcome', content: 'Minimalist focus.', updatedAt: Date.now(), pinned: false, deletedAt: null
    }];
  });

  const [activeNoteId, setActiveNoteId] = useState(notes.find(n => !n.deletedAt)?.id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrash, setShowTrash] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('lumnr_theme') || 'dark');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('lumnr_accent') || 'zinc');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const shareMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
  const settingsRef = useRef(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId);

  useEffect(() => { localStorage.setItem('lumnr_notes', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('lumnr_theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('lumnr_accent', accentColor); }, [accentColor]);

  const createNote = () => {
    const newNote = { id: Date.now().toString(), title: '', content: '', updatedAt: Date.now(), pinned: false, deletedAt: null };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id, fields) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...fields, updatedAt: Date.now() } : n));
  };

  const togglePin = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const moveNoteToTrash = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.map(n => n.id === id ? { ...n, deletedAt: Date.now() } : n));
    if (activeNoteId === id) setActiveNoteId(notes.find(n => n.id !== id && !n.deletedAt)?.id || null);
  };

  const restoreNote = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.map(n => n.id === id ? { ...n, deletedAt: null } : n));
  };

  const permanentlyDeleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id) setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = showTrash ? !!n.deletedAt : !n.deletedAt;
    return matchesSearch && matchesSection;
  });

  const accents = {
    zinc: { light: 'bg-zinc-100 text-black', dark: 'bg-[#111] text-white', dot: 'bg-zinc-500' },
    sage: { light: 'bg-emerald-50 text-emerald-900', dark: 'bg-emerald-950/40 text-emerald-100', dot: 'bg-emerald-500' },
    blue: { light: 'bg-blue-50 text-blue-900', dark: 'bg-blue-950/40 text-blue-100', dot: 'bg-blue-500' },
    amber: { light: 'bg-amber-50 text-amber-900', dark: 'bg-amber-950/40 text-amber-100', dot: 'bg-amber-500' }
  };

  const getAccentClass = (isActive) => {
    if (!isActive) return theme === 'dark' ? 'hover:bg-[#111] text-zinc-500' : 'hover:bg-zinc-50 text-zinc-400';
    return theme === 'dark' ? accents[accentColor].dark : accents[accentColor].light;
  };

  return (
    <div className={`flex h-screen font-sans ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#fafafa] text-black'}`}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        theme={theme} 
        createNote={createNote} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
        showTrash={showTrash} 
        setShowTrash={setShowTrash}
        filteredNotes={filteredNotes} 
        activeNoteId={activeNoteId} 
        setActiveNoteId={setActiveNoteId}
        getAccentClass={getAccentClass} 
        togglePin={togglePin} 
        moveNoteToTrash={moveNoteToTrash}
        restoreNote={restoreNote} 
        permanentlyDeleteNote={permanentlyDeleteNote}
        notesCount={notes.filter(n => !n.deletedAt).length} 
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen} 
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        accentColor={accentColor} 
        setAccentColor={setAccentColor} 
        accents={accents} 
        settingsRef={settingsRef}
      />

      <Editor 
        activeNote={activeNote} 
        theme={theme} 
        updateNote={updateNote} 
        wordCount={activeNote?.content ? activeNote.content.trim().split(/\s+/).length : 0} 
        charCount={activeNote?.content.length || 0} 
        shareMenuOpen={shareMenuOpen} 
        setShareMenuOpen={setShareMenuOpen} 
        moreMenuOpen={moreMenuOpen} 
        setMoreMenuOpen={setMoreMenuOpen} 
        shareMenuRef={shareMenuRef} 
        moreMenuRef={moreMenuRef} 
        setModalContent={setModalContent}
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />

      {modalContent && (
        <Modal 
          title={modalContent === 'about' ? 'About' : 'Privacy'} 
          onClose={() => setModalContent(null)} 
          theme={theme}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <p>lumnr is a minimalist focus-oriented workspace.</p>
            <div className="flex items-center gap-1.5 opacity-50 text-[10px] uppercase mt-4">
              <span>Made with</span> <Heart size={10} className="text-red-500 fill-current" /> <span>by Aayaam</span>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
