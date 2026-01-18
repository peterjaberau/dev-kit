'use client';
import { SortableTree } from '..';
import { treeData } from './data/virtual';

interface DataContent {
  name: string;
  visible: boolean;
  isLeaf: boolean;
}

export const SortableTreeVirtual = () => {
  return (
    <div style={{ width: 340 }}>
      <SortableTree<DataContent>
        treeData={treeData as any}
        renderContent={(item) => <div>{item.id}</div>}
        SHOW_STORE_IN_DEVTOOLS
        virtual={{
          height: 480,
        }}
        onTreeDataChange={(data) => {
          console.log('MODIFY：', data);
        }}
      />
    </div>
  );
};
