import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Settings, 
  ChevronRight, 
  Clock, 
  Share2, 
  MoreHorizontal 
} from 'lucide-react';

const App = () => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('lumnr_notes');
        return saved ? JSON.parse(saved) : [{
            id: '1',
            title: 'Welcome to lumnr',
            content: 'lumnr is a minimal digital notebook designed for focus.\n\nEverything you write is saved locally in your browser. Start typing to begin your journey.',
            updatedAt: Date.now()
        }];
    });

    const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

    useEffect(() => {
        localStorage.setItem('lumnr_notes', JSON.stringify(notes));
    }, [notes]);

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

    return (
        <div className="flex h-screen bg-[#000000] text-[#ededed] selection:bg-[#333] selection:text-[#fff] font-sans">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 ease-in-out border-r border-[#1f1f1f] flex flex-col overflow-hidden bg-[#0a0a0a]`}>
                <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15 5L5 15L3 21L9 19L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-medium tracking-tighter text-lg text-white">lumnr</span>
                    </div>
                    <button onClick={createNote} className="p-1.5 rounded-md hover:bg-[#1f1f1f] transition-colors text-zinc-400 hover:text-white">
                        <Plus size={18} />
                    </button>
                </div>

                <div className="px-4 mb-4">
                    <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Search size={14} />
                        </span>
                        <input 
                            type="text"
                            placeholder="Search thoughts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#000] border border-[#1f1f1f] rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-700"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5 overflow-x-hidden scrollbar-hide">
                    {filteredNotes.map(note => (
                        <div key={note.id} onClick={() => setActiveNoteId(note.id)} className={`group flex flex-col p-3 rounded-md cursor-pointer transition-all duration-200 ${activeNoteId === note.id ? 'bg-[#111] text-white' : 'hover:bg-[#0a0a0a] text-zinc-400'}`}>
                            <div className="flex justify-between items-start mb-0.5">
                                <span className={`text-sm font-medium truncate pr-4 ${activeNoteId === note.id ? 'text-zinc-100' : 'text-zinc-300'}`}>
                                    {note.title || 'Untitled'}
                                </span>
                                <button onClick={(e) => deleteNote(note.id, e)} className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-opacity">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                            <span className="text-[11px] text-zinc-500 line-clamp-1 truncate uppercase tracking-wider font-mono">
                                {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-[#1f1f1f] text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-center">
                    <span>{notes.length} Docs</span>
                    <button className="hover:text-zinc-300 transition-colors">
                        <Settings size={14} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative bg-[#000]">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1 bg-[#0a0a0a] border border-[#1f1f1f] border-l-0 rounded-r-md text-zinc-500 hover:text-white transition-all ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <ChevronRight size={16} />
                </button>

                <header className="h-14 border-b border-[#1f1f1f] flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-[11px] text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} strokeWidth={1.5} />
                            {activeNote ? new Date(activeNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : '—'}
                        </span>
                        <div className="w-[1px] h-3 bg-[#1f1f1f]"></div>
                        <span>{wordCount} words</span>
                        <div className="w-[1px] h-3 bg-[#1f1f1f]"></div>
                        <span>{charCount} characters</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors bg-[#0a0a0a] px-3 py-1.5 rounded-md border border-[#1f1f1f]">
                            <Share2 size={12} />
                            Share
                        </button>
                        <button className="text-zinc-400 hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 lg:py-20 overflow-y-auto">
                    {activeNote ? (
                        <div className="space-y-10" key={activeNote.id}>
                            <input
                                type="text"
                                value={activeNote.title}
                                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                                placeholder="Untitled"
                                className="w-full bg-transparent text-4xl font-semibold tracking-tight text-white placeholder:text-zinc-800 focus:outline-none"
                            />
                            <textarea
                                value={activeNote.content}
                                onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                                placeholder="Write your thoughts..."
                                className="w-full h-full bg-transparent text-lg text-zinc-200 leading-relaxed placeholder:text-zinc-800 focus:outline-none resize-none min-h-[60vh]"
                            />
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
                            <p className="text-xs uppercase tracking-[0.2em]">Select a document</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
