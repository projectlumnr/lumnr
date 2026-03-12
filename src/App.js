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
  Palette,
  History
} from 'lucide-react';

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

  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window === 'undefined') return 'zinc';
    return localStorage.getItem('lumnr_accent') || 'zinc';
  });
  
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

  useEffect(() => {
    localStorage.setItem('lumnr_accent', accentColor);
  }, [accentColor]);

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

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = showTrash ? !!n.deletedAt : !n.deletedAt;
    return matchesSearch && matchesSection;
  });

  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Accents Configuration
  const accents = {
    zinc: {
      light: 'bg-zinc-100 text-black',
      dark: 'bg-[#111] text-white',
      dot: 'bg-zinc-500',
    },
    sage: {
      light: 'bg-emerald-50 text-emerald-900',
      dark: 'bg-emerald-950/40 text-emerald-100',
      dot: 'bg-emerald-500',
    },
    amber: {
      light: 'bg-amber-50 text-amber-900',
      dark: 'bg-amber-950/40 text-amber-100',
      dot: 'bg-amber-500',
    },
    blue: {
      light: 'bg-blue-50 text-blue-900',
      dark: 'bg-blue-950/40 text-blue-100',
      dot: 'bg-blue-500',
    }
  };

  const getAccentClass = (isActive) => {
    if (!isActive) return theme === 'dark' ? 'hover:bg-[#0a0a0a] text-zinc-400' : 'hover:bg-zinc-50 text-zinc-500';
    return theme === 'dark' ? accents[accentColor].dark : accents[accentColor].light;
  };

  // Custom Modal Component
  const Modal = ({ title, children, onClose }) => (
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

  const themeClasses = theme === 'dark' 
    ? 'bg-[#000000] text-[#ededed] selection:bg-[#333] selection:text-[#fff]' 
    : 'bg-[#fafafa] text-[#1a1a1a] selection:bg-[#ddd] selection:text-[#000]';

  const sidebarClasses = theme === 'dark'
    ? 'bg-[#0a0a0a] border-[#1f1f1f]'
    : 'bg-white border-zinc-200';

  const inputClasses = theme === 'dark'
    ? 'bg-[#000] border-[#1f1f1f] text-white focus:border-zinc-500 placeholder:text-zinc-700'
    : 'bg-[#f5f5f5] border-zinc-200 text-zinc-900 focus:border-zinc-400 placeholder:text-zinc-400';

  return (
    <div className={`flex h-screen font-sans theme-transition ${themeClasses}`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-[width] duration-500 ease-in-out border-r flex flex-col overflow-hidden ${sidebarClasses}`}>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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
          {filteredNotes.length === 0 ? (
            <div className="mt-8 text-center text-[10px] uppercase tracking-widest text-zinc-500 opacity-50">
              {showTrash ? "Trash is empty" : "No notes found"}
            </div>
          ) : (
            filteredNotes.map(note => (
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
                        <button onClick={(e) => restoreNote(note.id, e)} className="p-1 text-zinc-500 hover:text-blue-400 transition-colors" title="Restore">
                          <RotateCcw size={12} />
                        </button>
                        <button onClick={(e) => permanentlyDeleteNote(note.id, e)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors" title="Delete Permanently">
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
                <span className={`text-[11px] line-clamp-1 truncate uppercase tracking-wider font-mono ${activeNoteId === note.id ? 'opacity-70' : 'text-zinc-500'}`}>
                  {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))
          )}
        </div>

        <div className={`p-4 border-t text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-200'}`}>
          <span>{notes.filter(n => !n.deletedAt).length} Docs</span>
          <div ref={settingsRef}>
            <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:text-zinc-300' : 'hover:text-zinc-800'}`}>
              <Settings size={14} />
            </button>
            {settingsOpen && (
              <div className={`absolute bottom-12 right-0 w-56 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                  {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                  {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                </button>
                
                <div className={`mx-4 my-2 border-t pt-3 flex flex-col gap-2 ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-100'}`}>
                  <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold tracking-[0.2em]">
                    <Palette size={10} /> Accent Color
                  </div>
                  <div className="flex gap-2">
                    {Object.keys(accents).map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className={`w-5 h-5 rounded-full transition-all ring-offset-2 ${theme === 'dark' ? 'ring-offset-black' : 'ring-offset-white'} ${accentColor === color ? 'ring-2 ring-zinc-500 scale-110' : 'hover:scale-105'} ${accents[color].dot}`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
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
            <div className={`w-[1px] h-3 ${theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-zinc-200'}`}></div>
            <span>{wordCount} words</span>
            <div className={`w-[1px] h-3 ${theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-zinc-200'}`}></div>
            <span>{charCount} characters</span>
            <div className={`w-[1px] h-3 ${theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-zinc-200'}`}></div>
            <span>{readingTime} min read</span>
            <div className={`w-[1px] h-3 ${theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-zinc-200'}`}></div>
            <span className={`transition-opacity duration-500 ${isSaving ? 'opacity-100' : 'opacity-50'}`}>
              {isSaving ? 'Saving...' : 'Saved'}
            </span>
            {activeNote?.deletedAt && (
              <>
                <div className={`w-[1px] h-3 ${theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-zinc-200'}`}></div>
                <span className="text-red-400">Archived Document</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {!activeNote?.deletedAt && (
              <div className="relative" ref={shareMenuRef}>
                <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className={`flex items-center gap-2 text-[11px] uppercase tracking-widest transition-all px-3 py-1.5 rounded-md border ${theme === 'dark' ? 'text-zinc-400 hover:text-white bg-[#0a0a0a] border-[#1f1f1f]' : 'text-zinc-500 hover:text-black bg-white border-zinc-200'}`}>
                  <Share2 size={12} /> Share
                </button>
                {shareMenuOpen && (
                  <div className={`absolute right-0 top-10 w-48 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                    <button onClick={downloadNote} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                      <Download size={12} /> Download .txt
                    </button>
                    <button onClick={copyToClipboard} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider border-b transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white border-[#1f1f1f]' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black border-zinc-100'}`}>
                      <Copy size={12} /> Copy Text
                    </button>
                    <button onClick={() => shareToSocial('twitter')} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                      <Twitter size={12} /> X (Twitter)
                    </button>
                    <button onClick={() => shareToSocial('whatsapp')} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                      <ExternalLink size={12} /> WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="relative" ref={moreMenuRef}>
              <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`transition-colors flex items-center ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'}`}>
                <MoreHorizontal size={18} />
              </button>
              {moreMenuOpen && (
                <div className={`absolute right-0 top-10 w-40 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                  <button onClick={() => { setModalContent('history'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors border-b ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white border-[#1f1f1f]' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black border-zinc-100'}`}>
                    <History size={12} /> Version History
                  </button>
                  <button onClick={() => { setModalContent('about'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                    <Info size={12} /> About
                  </button>
                  <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                    <ShieldCheck size={12} /> Privacy
                  </button>
                  <button onClick={() => { setModalContent('terms'); setMoreMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                    <FileText size={12} /> Terms
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 w-full px-8 lg:px-16 pt-12 lg:pt-20 flex flex-col">
          {activeNote ? (
            <div className={`flex-1 flex flex-col space-y-10 animate-in ${activeNote.deletedAt ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                placeholder="Untitled"
                disabled={!!activeNote.deletedAt}
                className={`w-full bg-transparent text-4xl font-semibold tracking-tight focus:outline-none ${theme === 'dark' ? 'text-white placeholder:text-zinc-800' : 'text-zinc-900 placeholder:text-zinc-200'}`}
              />
              <textarea
                value={activeNote.content}
                onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                placeholder="Write your thoughts..."
                disabled={!!activeNote.deletedAt}
                className={`w-full flex-1 bg-transparent text-lg leading-relaxed focus:outline-none resize-none pb-12 lg:pb-20 scrollbar-hide ${theme === 'dark' ? 'text-zinc-200 placeholder:text-zinc-800' : 'text-zinc-700 placeholder:text-zinc-200'}`}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 space-y-4">
              <PenLine size={48} strokeWidth={1} />
              <p className="text-xs uppercase tracking-[0.2em]">Select a document to begin</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {modalContent && (
        <Modal 
          title={modalContent === 'about' ? "About lumnr" : modalContent === 'privacy' ? "Privacy Policy" : modalContent === 'terms' ? "Terms of Service" : modalContent === 'history' ? "Version History" : ""} 
          onClose={() => setModalContent(null)}
        >
          {modalContent === 'about' && (
            <div className="flex flex-col">
              <p className="mb-4">lumnr is a minimalist digital workspace designed to remove distractions and let your ideas shine.</p>
              <p className="mb-6">Built with a focus on speed and simplicity, it provides a clean slate for your daily thoughts, journals, or code snippets.</p>
              
              <a 
                href="https://ko-fi.com/lumnr" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[10px] uppercase tracking-[0.15em] font-bold transition-all ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
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
            <>
              <p className={`mb-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Your data stays with you.</p>
              <p className="mb-4">lumnr uses local storage technology. This means all your notes are saved directly in your browser's memory, not on our servers.</p>
              <p className="mb-4">We do not track your typing, sell your information, or have any access to the content you create.</p>
            </>
          )}
          {modalContent === 'terms' && (
            <>
              <p className="mb-4">By using lumnr, you acknowledge that this is a client-side application. Since data is stored locally, clearing your browser cache or switching devices will result in data loss unless you use the export feature.</p>
              <p className="mb-4">The software is provided "as is", without warranty of any kind. You are responsible for maintaining backups of your important documents.</p>
            </>
          )}
          {modalContent === 'history' && (
            <div className="flex flex-col gap-3">
              <p className="mb-4 text-xs opacity-70">Restore previous versions of this document. Versions are saved automatically.</p>
              {(!activeNote?.history || activeNote.history.length === 0) ? (
                <div className="text-center py-8 opacity-50">No previous versions found.</div>
              ) : (
                activeNote.history.map((ver, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark' ? 'border-[#1f1f1f] bg-[#111]' : 'border-zinc-200 bg-zinc-50'}`}>
                    <div className="flex flex-col">
                      <span className={`font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>{new Date(ver.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      <span className="text-xs opacity-50 truncate max-w-[200px]">{ver.title || 'Untitled'}</span>
                    </div>
                    <button 
                      onClick={() => {
                        updateNote(activeNote.id, { title: ver.title, content: ver.content });
                        setModalContent(null);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-[#1f1f1f] hover:bg-white hover:text-black' : 'bg-white border shadow-sm hover:bg-black hover:text-white'}`}
                    >
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </Modal>
      )}

      <style>{`
        /* Added from index.css */
        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: black;
        }

        /* Global theme transition rule */
        .theme-transition * {
          transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      fill 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      stroke 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .theme-transition {
          transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
