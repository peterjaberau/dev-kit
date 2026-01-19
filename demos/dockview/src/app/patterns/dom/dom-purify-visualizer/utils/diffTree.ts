import DOMPurify from 'dompurify';
import { TreeNode } from '../types';

export function getCleanHTML(dirtyHTML: string): string {
  return DOMPurify.sanitize(dirtyHTML, { 
    FORCE_BODY: true,
    ADD_TAGS: ['#comment'], // Preserve comments if possible
  });
}

export function buildDiffTree(dirtyHTML: string): TreeNode[] {
  const cleanHTML = getCleanHTML(dirtyHTML);

  const parser = new DOMParser();
  const dirtyDoc = parser.parseFromString(dirtyHTML, 'text/html');
  const cleanDoc = parser.parseFromString(cleanHTML, 'text/html');

  return compareNodes(dirtyDoc.body, cleanDoc.body);
}

function compareNodes(dirtyNode: Node, cleanNode: Node | null): TreeNode[] {
  const result: TreeNode[] = [];
  
  // We iterate over dirty children and try to find matches in clean children
  // This is a greedy matching approach suitable for "pruning" visualization
  
  const dirtyChildren = Array.from(dirtyNode.childNodes);
  let cleanChildren: Node[] = cleanNode ? Array.from(cleanNode.childNodes) : [];
  let cleanCursor = 0;

  for (const dirtyChild of dirtyChildren) {
    const nodeData: TreeNode = {
      type: getNodeType(dirtyChild),
      status: 'pruned',
    };

    if (nodeData.type === 'element') {
      const el = dirtyChild as Element;
      nodeData.tagName = el.tagName.toLowerCase();
      nodeData.attributes = getAttributes(el);
    } else if (nodeData.type === 'text') {
      nodeData.textContent = dirtyChild.textContent || '';
    } else if (nodeData.type === 'comment') {
      nodeData.textContent = dirtyChild.textContent || '';
    }

    // Attempt to match with current clean node
    const candidateClean = cleanChildren[cleanCursor];
    
    if (candidateClean && isMatch(dirtyChild, candidateClean)) {
      nodeData.status = 'kept';
      
      // If element, check for pruned attributes
      if (nodeData.type === 'element') {
        const dirtyAttrs = (dirtyChild as Element).getAttributeNames();
        const cleanAttrs = (candidateClean as Element).getAttributeNames();
        const prunedAttrs = dirtyAttrs.filter(a => !cleanAttrs.includes(a));
        
        if (prunedAttrs.length > 0) {
          nodeData.status = 'modified';
          nodeData.prunedAttributes = prunedAttrs;
        }
        
        // Recurse for children
        nodeData.children = compareNodes(dirtyChild, candidateClean);
      } else {
         // Text nodes are leaves
      }

      cleanCursor++;
    } else {
      // No match found at cursor, assume pruned
      nodeData.status = 'pruned';
      // If it's an element that was pruned, we still want to show its structure as pruned
      if (nodeData.type === 'element') {
          // If the node itself is pruned, all children are implicitly pruned.
          // We can just populate children blindly as pruned.
          nodeData.children = buildPrunedSubtree(dirtyChild);
      }
    }
    
    // Filter out empty text nodes that are just whitespace to reduce noise,
    // unless they were pruned (which might be interesting) or meaningful.
    if (nodeData.type === 'text' && !nodeData.textContent?.trim() && nodeData.status === 'kept') {
        continue;
    }

    result.push(nodeData);
  }

  return result;
}

function buildPrunedSubtree(node: Node): TreeNode[] {
    const result: TreeNode[] = [];
    node.childNodes.forEach(child => {
        const type = getNodeType(child);
        const childNode: TreeNode = {
            type,
            status: 'pruned',
        };
        if (type === 'element') {
            const el = child as Element;
            childNode.tagName = el.tagName.toLowerCase();
            childNode.attributes = getAttributes(el);
            childNode.children = buildPrunedSubtree(child);
        } else {
            childNode.textContent = child.textContent || '';
        }
        
        if (type === 'text' && !childNode.textContent?.trim()) return;
        result.push(childNode);
    });
    return result;
}

function isMatch(dirty: Node, clean: Node): boolean {
  if (dirty.nodeType !== clean.nodeType) return false;
  
  if (dirty.nodeType === Node.ELEMENT_NODE) {
    return (dirty as Element).tagName === (clean as Element).tagName;
  }
  
  if (dirty.nodeType === Node.TEXT_NODE) {
      // DOMPurify preserves text usually. 
      // If exact match fails, it might be due to whitespace normalization.
      return (dirty.textContent || '').trim() === (clean.textContent || '').trim();
  }
  
  return true;
}

function getNodeType(node: Node): 'element' | 'text' | 'comment' {
  if (node.nodeType === Node.ELEMENT_NODE) return 'element';
  if (node.nodeType === Node.COMMENT_NODE) return 'comment';
  return 'text';
}

function getAttributes(el: Element): Record<string, string> {
  const attrs: Record<string, string> | any = {};
  for (let i = 0; i < el.attributes.length; i++) {
    const attr: any = el.attributes[i];
    attrs[attr.name] = attr.value;
  }
  return attrs;
}
