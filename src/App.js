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
  PinOff
} from 'lucide-react';

const App = () => {
  // Initialize state with safety checks
  const [notes, setNotes] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('lumnr_notes');
    return saved ? JSON.parse(saved) : [{
      id: '1',
      title: 'Welcome to lumnr',
      content: 'lumnr is a minimal digital notebook designed for focus.\n\nEverything you write is saved locally in your browser. Start typing to begin your journey.',
      updatedAt: Date.now(),
      pinned: false
    }];
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('lumnr_theme') || 'dark';
  });
  
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const shareMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
  const settingsRef = useRef(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

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
    setSettingsOpen(false);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      updatedAt: Date.now(),
      pinned: false
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id, fields) => {
    setNotes(prev => {
      const updated = prev.map(note => 
        note.id === id ? { ...note, ...fields, updatedAt: Date.now() } : note
      );
      // Sort: Pinned first, then by updatedAt
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        return b.updatedAt - a.updatedAt;
      });
    });
  };

  const togglePin = (id, e) => {
    e.stopPropagation();
    setNotes(prev => {
      const updated = prev.map(note => 
        note.id === id ? { ...note, pinned: !note.pinned } : note
      );
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        return b.updatedAt - a.updatedAt;
      });
    });
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id && filtered.length > 0) {
      setActiveNoteId(filtered[0].id);
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

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;

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

        <div className="px-4 mb-4">
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
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-hide">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`group flex flex-col p-3 rounded-md cursor-pointer transition-all duration-300 ${
                activeNoteId === note.id 
                  ? (theme === 'dark' ? 'bg-[#111] text-white' : 'bg-zinc-100 text-black') 
                  : (theme === 'dark' ? 'hover:bg-[#0a0a0a] text-zinc-400' : 'hover:bg-zinc-50 text-zinc-500')
              }`}
            >
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex items-center gap-2 overflow-hidden">
                  {note.pinned && <Pin size={10} className="flex-shrink-0 text-zinc-500 fill-current" />}
                  <span className={`text-sm font-medium truncate ${activeNoteId === note.id ? (theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900') : (theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600')}`}>
                    {note.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => togglePin(note.id, e)} className={`p-1 transition-colors ${note.pinned ? 'text-zinc-300' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    {note.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                  </button>
                  <button onClick={(e) => deleteNote(note.id, e)} className="p-1 text-zinc-500 hover:text-red-400 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500 line-clamp-1 truncate uppercase tracking-wider font-mono">
                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>

        <div className={`p-4 border-t text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-center relative ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-200'}`}>
          <span>{notes.length} Docs</span>
          <div ref={settingsRef}>
            <button onClick={() => setSettingsOpen(!settingsOpen)} className={`p-1 rounded-md transition-colors ${theme === 'dark' ? 'hover:text-zinc-300' : 'hover:text-zinc-800'}`}>
              <Settings size={14} />
            </button>
            {settingsOpen && (
              <div className={`absolute bottom-12 right-0 w-44 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                <button onClick={toggleTheme} className={`w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:bg-[#111] hover:text-white' : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'}`}>
                  {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                  {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                </button>
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
          </div>
          
          <div className="flex items-center gap-3">
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

            <div className="relative" ref={moreMenuRef}>
              <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`transition-colors flex items-center ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'}`}>
                <MoreHorizontal size={18} />
              </button>
              {moreMenuOpen && (
                <div className={`absolute right-0 top-10 w-40 border rounded-lg shadow-2xl py-2 z-50 animate-in ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
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

        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 lg:py-20 overflow-y-auto scrollbar-hide">
          {activeNote ? (
            <div className="space-y-10 animate-in">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                placeholder="Untitled"
                className={`w-full bg-transparent text-4xl font-semibold tracking-tight focus:outline-none ${theme === 'dark' ? 'text-white placeholder:text-zinc-800' : 'text-zinc-900 placeholder:text-zinc-200'}`}
              />
              <textarea
                value={activeNote.content}
                onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                placeholder="Write your thoughts..."
                className={`w-full h-full bg-transparent text-lg leading-relaxed focus:outline-none resize-none min-h-[60vh] ${theme === 'dark' ? 'text-zinc-200 placeholder:text-zinc-800' : 'text-zinc-700 placeholder:text-zinc-200'}`}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
              <PenLine size={48} strokeWidth={1} />
              <p className="text-xs uppercase tracking-[0.2em]">Select a document to begin</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {modalContent && (
        <Modal 
          title={modalContent === 'about' ? "About lumnr" : modalContent === 'privacy' ? "Privacy Policy" : "Terms of Service"} 
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
        </Modal>
      )}

      <style>{`
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
