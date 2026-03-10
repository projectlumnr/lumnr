/* PROJECT: Lumnr (v1.2 - Stable)
  DESCRIPTION: Minimalist digital notebook with local persistence.
  TECH STACK: React, Tailwind CSS, Lucide Icons.
  STORAGE: Browser localStorage.
*/

import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Modal from './Modal';

/**
 * Main App Component
 * Orchestrates the state and layout for the modular components.
 */
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
        downloadNote={() => {}} 
        copyToClipboard={() => {}} 
        shareToSocial={() => {}}
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
