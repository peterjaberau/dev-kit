import React, { useState } from 'react';
import { TreeNode } from '../types';
import { ChevronRight, ChevronDown, Tag, Type, Hash } from 'lucide-react';
import clsx from 'clsx';

interface TreeVisualizerProps {
  nodes: TreeNode[];
}

const NodeItem: React.FC<{ node: TreeNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  
  const isPruned = node.status === 'pruned';
  const isModified = node.status === 'modified'; // Has pruned attributes
  
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="font-mono text-sm">
      <div 
        className={clsx(
          "flex items-start py-1 px-2 hover:bg-gray-800 rounded select-none cursor-pointer transition-colors group",
          isPruned ? "opacity-60" : "opacity-100"
        )}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
        }}
      >
        {/* Expand Icon */}
        <div className="w-5 h-5 flex items-center justify-center mr-1 text-gray-500">
          {hasChildren ? (
             expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <div className="w-1" />
          )}
        </div>

        {/* Node Icon */}
        <div className={clsx(
            "mr-2 mt-0.5",
            isPruned ? "text-red-500" : isModified ? "text-yellow-500" : "text-green-500"
        )}>
           {node.type === 'element' && <Tag size={14} />}
           {node.type === 'text' && <Type size={14} />}
           {node.type === 'comment' && <Hash size={14} />}
        </div>

        {/* Content */}
        <div className="flex-1 break-all">
          {node.type === 'element' && (
            <span className={clsx(isPruned && "line-through decoration-red-500 decoration-2 text-red-300")}>
              <span className="font-bold text-blue-300">{node.tagName}</span>
            </span>
          )}
          
          {node.type === 'text' && (
             <span className={clsx("text-gray-300", isPruned && "line-through text-red-400")}>
               "{node.textContent?.length && node.textContent.length > 50 ? node.textContent.substring(0, 50) + '...' : node.textContent}"
             </span>
          )}

           {node.type === 'comment' && (
             <span className="text-gray-500 italic">
               &lt;!-- {node.textContent} --&gt;
             </span>
          )}

          {/* Attributes */}
          {node.type === 'element' && node.attributes && (
            <div className="ml-2 inline-flex flex-wrap gap-x-2">
              {Object.entries(node.attributes).map(([key, val]) => {
                const isAttrPruned = node.prunedAttributes?.includes(key);
                return (
                  <span 
                    key={key} 
                    className={clsx(
                        "text-xs px-1 rounded border",
                        isAttrPruned 
                            ? "border-red-800 bg-red-900/30 text-red-300 line-through decoration-red-500" 
                            : "border-gray-700 text-gray-400"
                    )}
                  >
                    <span className="text-purple-300">{key}</span>
                    <span className="opacity-50">=</span>
                    <span className="text-orange-200">"{val}"</span>
                  </span>
                );
              })}
            </div>
          )}
          
          {/* Status Label */}
          {isPruned && <span className="ml-2 text-[10px] uppercase font-bold text-red-500 bg-red-900/20 px-1 rounded border border-red-900">Pruned</span>}
          {isModified && <span className="ml-2 text-[10px] uppercase font-bold text-yellow-500 bg-yellow-900/20 px-1 rounded border border-yellow-900">Attrs Removed</span>}
        </div>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child, idx) => (
            <NodeItem key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ nodes }) => {
  if (nodes.length === 0) {
      return <div className="p-8 text-center text-gray-500 italic">No content or empty tree.</div>
  }

  return (
    <div className="w-full h-full overflow-auto pb-10">
      {nodes.map((node, idx) => (
        <NodeItem key={idx} node={node} />
      ))}
    </div>
  );
};
