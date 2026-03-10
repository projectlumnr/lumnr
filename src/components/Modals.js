import React from 'react';
import { X } from 'lucide-react';

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

export default Modal;
