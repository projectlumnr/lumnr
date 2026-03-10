import React from 'react';
import { 
  ChevronRight, Clock, Share2, Download, Copy, Twitter, MoreHorizontal, Info, ShieldCheck, PenLine 
} from 'lucide-react';

const Editor = ({ 
  activeNote, theme, updateNote, wordCount, charCount, 
  shareMenuOpen, setShareMenuOpen, moreMenuOpen, setMoreMenuOpen,
  shareMenuRef, moreMenuRef, downloadNote, copyToClipboard, 
  shareToSocial, setModalContent, sidebarOpen, setSidebarOpen 
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
                  <button onClick={downloadNote} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                    <Download size={12} /> Download .txt
                  </button>
                  <button onClick={copyToClipboard} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                    <Copy size={12} /> Copy Text
                  </button>
                  <button onClick={() => shareToSocial('twitter')} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                    <Twitter size={12} /> Twitter
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
                <button onClick={() => { setModalContent('privacy'); setMoreMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-[11px] uppercase">
                  <ShieldCheck size={12} /> Privacy
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

export default Editor;
