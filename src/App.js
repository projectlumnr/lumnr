import React, { useState, useEffect, useRef } from 'react';

// Zero-Dependency SVG Icons to prevent "Module Not Found" build errors
const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  MoreHorizontal: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
};

const App = () => {
  const [notes, setNotes] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('lumnr_notes');
    return saved ? JSON.parse(saved) : [{
      id: '1',
      title: 'Welcome to lumnr',
      content: 'lumnr is a minimal digital notebook designed for focus.\n\nEverything you write is saved locally in your browser.',
      updatedAt: Date.now()
    }];
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('lumnr_theme') || 'dark';
  });
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  useEffect(() => {
    localStorage.setItem('lumnr_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('lumnr_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    setSettingsOpen(false);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id, fields) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...fields, updatedAt: Date.now() } : note
    ).sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id && filtered.length > 0) {
      setActiveNoteId(filtered[0].id);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;

  const themeClasses = theme === 'dark' 
    ? 'bg-[#000000] text-[#ededed]' 
    : 'bg-[#fafafa] text-[#1a1a1a]';

  return (
    <div className={`flex h-screen font-sans ${themeClasses} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 border-r ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'} flex flex-col overflow-hidden`}>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-sm flex items-center justify-center ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
                <div className={`w-3 h-[2px] rotate-45 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}></div>
            </div>
            <span className={`font-semibold tracking-tighter text-lg italic uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>lumnr</span>
          </div>
          <button onClick={createNote} className="p-1.5 rounded-md hover:bg-zinc-800/10 transition-colors">
            <Icons.Plus />
          </button>
        </div>

        <div className="px-4 mb-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"><Icons.Search /></span>
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none border ${theme === 'dark' ? 'bg-black border-[#1f1f1f] text-white' : 'bg-zinc-100 border-zinc-200 text-black'}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`group flex flex-col p-3 rounded-md cursor-pointer transition-all ${
                activeNoteId === note.id 
                  ? (theme === 'dark' ? 'bg-[#161616] text-white' : 'bg-zinc-100 text-black') 
                  : 'text-zinc-500 hover:bg-zinc-800/5'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium truncate">{note.title || 'Untitled'}</span>
                <button onClick={(e) => deleteNote(note.id, e)} className="opacity-0 group-hover:opacity-100 hover:text-red-500">
                  <Icons.Trash2 />
                </button>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-40 mt-1">
                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#1f1f1f] flex justify-between items-center text-[10px] uppercase tracking-widest opacity-50">
          <span>{notes.length} Docs</span>
          <div className="relative">
            <button onClick={() => setSettingsOpen(!settingsOpen)}><Icons.Settings /></button>
            {settingsOpen && (
               <div className={`absolute bottom-full right-0 mb-2 w-32 rounded-lg border p-1 shadow-xl ${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'}`}>
                 <button onClick={toggleTheme} className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-800/10 transition-colors">
                    {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
                    {theme === 'dark' ? 'Light' : 'Dark'}
                 </button>
               </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col relative">
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="absolute left-4 top-4 z-10 p-2 opacity-40 hover:opacity-100">
            <Icons.ChevronRight />
          </button>
        )}

        <header className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-6 text-[10px] uppercase tracking-widest opacity-40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Icons.Clock /> {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '--'}</span>
            <span>{wordCount} Words</span>
            <span>{charCount} Characters</span>
          </div>
        </header>

        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 overflow-y-auto">
          {activeNote ? (
            <div className="space-y-8 animate-in">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                placeholder="Title"
                className="w-full bg-transparent text-4xl font-bold focus:outline-none placeholder:opacity-10"
              />
              <textarea
                value={activeNote.content}
                onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                placeholder="Start writing..."
                className="w-full h-full min-h-[60vh] bg-transparent text-lg leading-relaxed focus:outline-none resize-none placeholder:opacity-10"
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center opacity-20 uppercase tracking-[0.3em] text-xs">Select a note</div>
          )}
        </div>
      </main>

      <style>{`
        .animate-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;
