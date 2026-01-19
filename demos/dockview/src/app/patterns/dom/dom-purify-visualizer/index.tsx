import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { HistoryItem, PasteModalData, TreeNode } from './types';
import { STORAGE_KEY, DEFAULT_CONTENT } from './constants';
import { formatHTML } from './utils/formatter';
import { buildDiffTree, getCleanHTML } from './utils/diffTree';
import { HistoryBar } from './components/HistoryBar';
import { TreeVisualizer } from './components/TreeVisualizer';
import { Modal } from './components/Modal';
import { RotateCcw, Code, GitCommit, FileText, Network } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingPaste, setPendingPaste] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // DOM Diff Tree
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  useEffect(() => {
    setTreeNodes(buildDiffTree(content));
  }, [content]);

  // Helper: Save current state to history
  const saveCurrentToHistory = useCallback(() => {
    if (!content.trim()) return;

    // If we are currently on a history item, do NOT create a new entry for it if it's the same content.
    if (activeId) {
      return; 
    }

    const newItem: HistoryItem = {
      id: uuidv4(),
      timestamp: Date.now(),
      title: `Draft ${new Date().toLocaleTimeString()}`,
      content: content
    };

    setHistory(prev => [newItem, ...prev]);
  }, [content, activeId]);


  // Actions
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Intercept paste on the textarea
    e.preventDefault();
    const textHtml = e.clipboardData.getData('text/html');
    const textPlain = e.clipboardData.getData('text/plain');
    const pasteContent = textHtml || textPlain;

    if (pasteContent) {
      setPendingPaste(textHtml ? formatHTML(textHtml) : textPlain);
      setModalOpen(true);
    }
  }, []);

  const confirmPaste = () => {
    if (pendingPaste !== null) {
      saveCurrentToHistory();
      setContent(pendingPaste);
      setActiveId(null); // New content means we are no longer looking at a history item
    }
    setModalOpen(false);
    setPendingPaste(null);
  };

  const cancelPaste = () => {
    setModalOpen(false);
    setPendingPaste(null);
  };

  const handleReset = () => {
    if (confirm("Reset content to default? Current changes will be saved to history.")) {
      saveCurrentToHistory();
      setContent(DEFAULT_CONTENT);
      setActiveId(null);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    if (activeId !== item.id) {
       saveCurrentToHistory();
       setContent(item.content);
       setActiveId(item.id);
    }
  };

  const handleNew = () => {
    saveCurrentToHistory();
    setContent('');
    setActiveId(null);
  };

  const handleRemoveAll = () => {
    if (confirm("Remove all history items?")) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY);
      // If current active ID is in history, it becomes detached (null)
      if (activeId) setActiveId(null);
    }
  };

  const handleRemoveOne = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleUpdateTitle = (id: string, title: string) => {
    setHistory(prev => prev.map(h => h.id === id ? { ...h, title } : h));
  };

  const handleFormat = () => {
      setContent(formatHTML(content));
  };

  return (
    <div data-scope={'dom-purify'} className="flex flex-col flex-1 h-full w-full bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-6 justify-between bg-gray-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
                <GitCommit size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">DOM<span className="text-blue-400">Purify</span> Visualizer</h1>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={handleFormat}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all"
                title="Format HTML"
            >
                <Code size={16} /> Format
            </button>
            <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all"
                title="Reset to Default"
            >
                <RotateCcw size={16} /> Reset
            </button>
        </div>
      </header>

      {/* Main Split Pane */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-800 min-w-0">
            <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 text-xs font-bold text-gray-500 uppercase flex items-center justify-between">
                <span>Input (HTML/SVG)</span>
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400">Paste supported (Ctrl+V)</span>
            </div>
            <div className="flex-1 relative">
                <textarea
                    className="w-full h-full bg-gray-950 text-gray-300 p-4 font-mono text-sm resize-none outline-none focus:ring-1 focus:ring-blue-900/50"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onPaste={handlePaste}
                    placeholder="Enter HTML content here..."
                    spellCheck={false}
                />
            </div>
        </div>

        {/* Right Pane: Tree View / Raw View */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-900/30">
             <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between h-[41px]">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 uppercase">Sanitization Output</span>
                    <div className="flex bg-gray-800 rounded-md p-0.5 border border-gray-700">
                        <button 
                           onClick={() => setViewMode('tree')}
                           className={clsx("px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-colors", viewMode === 'tree' ? "bg-gray-700 text-blue-400 shadow-sm" : "text-gray-500 hover:text-gray-300")}
                        >
                            <Network size={12} /> Tree
                        </button>
                        <button 
                           onClick={() => setViewMode('raw')}
                           className={clsx("px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-colors", viewMode === 'raw' ? "bg-gray-700 text-blue-400 shadow-sm" : "text-gray-500 hover:text-gray-300")}
                        >
                            <Code size={12} /> Raw
                        </button>
                    </div>
                </div>

                {viewMode === 'tree' && (
                    <div className="flex gap-3 text-[10px] font-medium">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>Kept</span>
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>Pruned</span>
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>Modified</span>
                    </div>
                )}
            </div>
            <div className="flex-1 overflow-hidden p-2 relative">
                {viewMode === 'tree' ? (
                    <TreeVisualizer nodes={treeNodes} />
                ) : (
                   <textarea
                       className="w-full h-full bg-transparent text-blue-100 font-mono text-sm resize-none outline-none p-2 selection:bg-blue-900/50"
                       readOnly
                       value={formatHTML(getCleanHTML(content))}
                   />
                )}
            </div>
        </div>
      </main>

      {/* Bottom Pane: History */}
      <HistoryBar 
        items={history}
        activeId={activeId}
        onSelect={handleSelectHistory}
        onRemove={handleRemoveOne}
        onRemoveAll={handleRemoveAll}
        onNew={handleNew}
        onUpdateTitle={handleUpdateTitle}
      />

      {/* Modal */}
      <Modal 
        isOpen={modalOpen}
        title="Replace Content?"
        description="You are about to replace the editor content with data from your clipboard. The current content will be saved to history."
        onConfirm={confirmPaste}
        onCancel={cancelPaste}
      />
    </div>
  );
}
