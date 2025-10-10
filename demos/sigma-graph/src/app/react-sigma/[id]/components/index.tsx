'use client'
import dynamic from 'next/dynamic'

const Complete = dynamic(() => import('../../components/Complete'), { ssr: false });
const CustomerRender = dynamic(() => import('../../components/CustomRender'), { ssr: false });
const Demo = dynamic(() => import('../../components/Demo'), { ssr: false });
const DragNdrop = dynamic(() => import('../../components/DragNdrop'), { ssr: false });
const Events = dynamic(() => import('../../components/Events'), { ssr: false });
const External = dynamic(() => import('../../components/External'), { ssr: false });
const GraphSearch = dynamic(() => import('../../components/GraphSearch'), { ssr: false });
const LayoutCircular = dynamic(() => import('../../components/LayoutCircular'), { ssr: false });
const LayoutFA2 = dynamic(() => import('../../components/LayoutFA2'), { ssr: false });
const LayoutFA2Control = dynamic(() => import('../../components/LayoutFA2Control'), { ssr: false });
const LoadGraphWithHook = dynamic(() => import('../../components/LoadGraphWithHook'), { ssr: false });
const LoadGraphWithProp = dynamic(() => import('../../components/LoadGraphWithProp'), { ssr: false });
const Minimap = dynamic(() => import('../../components/Minimap'), { ssr: false });
const MultiDirectedGraph = dynamic(() => import('../../components/MultiDirectedGraph'), { ssr: false });
const Multiple = dynamic(() => import('../../components/Multiple'), { ssr: false });
const NodeBorder = dynamic(() => import('../../components/NodeBorder'), { ssr: false });
const NodeImage = dynamic(() => import('../../components/NodeImage'), { ssr: false });
const UpdateGraphReference = dynamic(() => import('../../components/UpdateGraphReference'), { ssr: false });



export const WidgetMap: any = {
  'complete': Complete,
  'custom-render': CustomerRender,
  'demo': Demo,
  'drag-n-drop': DragNdrop,
  'events': Events,
  'external': External,
  'graph-search': GraphSearch,
  'layout-circular': LayoutCircular,
  'layout-fa2': LayoutFA2,
  'layout-fa2-control': LayoutFA2Control,
  'load-graph-hook': LoadGraphWithHook,
  'load-graph-prop': LoadGraphWithProp,
  'minimap': Minimap,
  'multi-directed-graph': MultiDirectedGraph,
  'multiple': Multiple,
  'node-border': NodeBorder,
  'node-image': NodeImage,
  'update-graph-reference': UpdateGraphReference,
}
