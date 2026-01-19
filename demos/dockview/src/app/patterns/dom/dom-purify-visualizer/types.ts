export interface HistoryItem {
  id: string;
  timestamp: number;
  title: string;
  content: string;
}

export interface PasteModalData {
  isOpen: boolean;
  content: string;
  type: 'text/html' | 'text/plain';
}

export interface TreeNode {
  type: 'element' | 'text' | 'comment';
  tagName?: string;
  textContent?: string;
  attributes?: Record<string, string>;
  children?: TreeNode[];
  status: 'kept' | 'pruned' | 'modified'; // modified means attributes pruned
  prunedAttributes?: string[];
}
