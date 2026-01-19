import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { Trash2, Plus, Clock, Edit2, X } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

interface HistoryBarProps {
  items: HistoryItem[];
  activeId: string | null;
  onSelect: (item: HistoryItem) => void;
  onRemove: (id: string) => void;
  onRemoveAll: () => void;
  onNew: () => void;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

export const HistoryBar: React.FC<HistoryBarProps> = ({
  items,
  activeId,
  onSelect,
  onRemove,
  onRemoveAll,
  onNew,
  onUpdateTitle,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleStartEdit = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.title);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      onUpdateTitle(editingId, editValue);
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <div className="h-48 border-t border-gray-700 bg-gray-900 flex flex-col">
      {/* Toolbar */}
      <div className="h-10 border-b border-gray-800 bg-gray-900 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
           <Clock size={16} className="text-blue-400"/>
           <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">History</span>
           <span className="text-xs text-gray-600 ml-2">{items.length} items</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onNew}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors"
          >
            <Plus size={14} /> NEW
          </button>
          <button 
            onClick={onRemoveAll}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-400/10 rounded transition-colors"
          >
            <Trash2 size={14} /> REMOVE ALL
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4 flex gap-4 items-center">
        {items.length === 0 && (
            <div className="w-full text-center text-gray-600 text-sm">
                No history yet. Edit content and press NEW or Paste/Reset to save automatically.
            </div>
        )}
        
        {items.map((item) => {
            const isActive = item.id === activeId;
            const isEditing = editingId === item.id;
            
            return (
                <div 
                  key={item.id}
                  onClick={() => !isEditing && onSelect(item)}
                  className={clsx(
                      "group relative flex-shrink-0 w-64 h-32 rounded-lg border-2 p-3 transition-all cursor-pointer flex flex-col justify-between",
                      isActive 
                        ? "border-blue-500 bg-gray-800 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800"
                  )}
                >
                   {/* Header */}
                   <div className="flex justify-between items-start mb-2">
                       {isEditing ? (
                           <input 
                             autoFocus
                             className="bg-gray-900 text-gray-100 text-sm px-1 py-0.5 rounded border border-blue-500 w-full outline-none"
                             value={editValue}
                             onChange={(e) => setEditValue(e.target.value)}
                             onBlur={handleSaveEdit}
                             onKeyDown={handleKeyDown}
                             onClick={(e) => e.stopPropagation()}
                           />
                       ) : (
                           <div className="flex items-center gap-2 max-w-[80%]">
                               <span className="text-sm font-semibold text-gray-200 truncate" title={item.title}>{item.title}</span>
                               <button 
                                 onClick={(e) => handleStartEdit(e, item)}
                                 className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-400 transition-opacity"
                               >
                                   <Edit2 size={12} />
                               </button>
                           </div>
                       )}
                       
                       <button 
                         onClick={(e) => {
                             e.stopPropagation();
                             onRemove(item.id);
                         }}
                         className="text-gray-600 hover:text-red-400 transition-colors"
                       >
                           <X size={14} />
                       </button>
                   </div>
                   
                   {/* Preview Code Snippet */}
                   <div className="flex-1 overflow-hidden opacity-60 text-[10px] font-mono leading-tight text-gray-400 bg-gray-900/50 p-2 rounded select-none pointer-events-none">
                       {item.content.substring(0, 150)}
                   </div>
                   
                   {/* Timestamp Footer */}
                   <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
                       <span>{format(item.timestamp, 'MMM d, HH:mm:ss')}</span>
                       {isActive && <span className="text-blue-500 font-bold">ACTIVE</span>}
                   </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
