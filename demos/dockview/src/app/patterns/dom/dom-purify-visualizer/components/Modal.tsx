import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onConfirm, onCancel, title, description }) => {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small timeout ensures the element is rendered and ready for focus
      const timer = setTimeout(() => {
        confirmRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <AlertTriangle size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            ref={confirmRef}
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Confirm Replacement
          </button>
        </div>
      </div>
    </div>
  );
};