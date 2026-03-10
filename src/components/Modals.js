import React from 'react';
import { X, Coffee, Heart } from 'lucide-react';

const Modals = ({ theme, modalContent, onClose }) => {
  if (!modalContent) return null;

  const title = modalContent === 'about' ? "About lumnr" : modalContent === 'privacy' ? "Privacy Policy" : "Terms of Service";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in">
      <div className={`${theme === 'dark' ? 'bg-[#0a0a0a] border-[#1f1f1f]' : 'bg-white border-zinc-200'} border w-full max-w-lg rounded-xl overflow-hidden shadow-2xl`}>
        <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-[#1f1f1f]' : 'border-zinc-100'}`}>
          <h2 className={`text-sm font-semibold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className={`p-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} text-sm leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-hide`}>
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
        </div>
      </div>
    </div>
  );
};

export default Modals;
