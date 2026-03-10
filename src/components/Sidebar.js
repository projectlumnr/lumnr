import React from 'react';
import { Plus, Search, Trash, Trash2, Pin, PinOff, RotateCcw, Settings, Sun, Moon, Palette, PenLine } from 'lucide-react';

const Sidebar = ({ 
  sidebarOpen, theme, createNote, searchQuery, setSearchQuery, 
  showTrash, setShowTrash, filteredNotes, activeNoteId, setActiveNoteId,
  togglePin, moveNoteToTrash, restoreNote, permanentlyDeleteNote,
  notes, settingsOpen, setSettingsOpen, toggleTheme, accents, accentColor, setAccentColor,
  settingsRef, getAccentClass
}) => {
  const sidebarClasses = theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200';
  const inputClasses = theme === 'dark' ? 'bg-[#000] border-[#1f1f1f] text-white focus:border-zinc-500 placeholder:text-zinc-700' : 'bg-[#f5f5f5] border-zinc-200 text-zinc-900 focus:border-zinc-400 placeholder:text-zinc-400';

  return (
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
  );
};

export default Sidebar;
