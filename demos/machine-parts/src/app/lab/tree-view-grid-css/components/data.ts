export type TreeViewDataNode = {
  id: string;
  label: string;
  meta?: string;
  kind?: string;
  children?: TreeViewDataNode[];
};

export const machinePartTree: TreeViewDataNode[] = [
  {
    id: "line-a",
    label: "Line A packing cell",
    meta: "12",
    kind: "assembly",
    children: [
      {
        id: "line-a/frame",
        label: "Frame assembly",
        meta: "4",
        kind: "assembly",
        children: [
          {
            id: "line-a/frame/base-rail",
            label: "Base rail extrusion",
            meta: "2",
            kind: "part",
          },
          {
            id: "line-a/frame/guard-panels",
            label: "Guard panels",
            meta: "2",
            kind: "part",
          },
        ],
      },
      {
        id: "line-a/drive",
        label: "Drive train",
        meta: "5",
        kind: "assembly",
        children: [
          {
            id: "line-a/drive/motor",
            label: "Servo motor",
            meta: "M-204",
            kind: "part",
          },
          {
            id: "line-a/drive/encoder",
            label: "Rotary encoder",
            meta: "E-118",
            kind: "sensor",
          },
          {
            id: "line-a/drive/coupling",
            label: "Flexible coupling",
            meta: "C-011",
            kind: "part",
          },
        ],
      },
      {
        id: "line-a/inspection",
        label: "Inspection head",
        meta: "3",
        kind: "assembly",
        children: [
          {
            id: "line-a/inspection/camera",
            label: "Line-scan camera",
            meta: "S-402",
            kind: "sensor",
          },
          {
            id: "line-a/inspection/light",
            label: "Diffuse light bar",
            meta: "L-078",
            kind: "part",
          },
        ],
      },
    ],
  },
  {
    id: "spares",
    label: "Service spares",
    meta: "6",
    kind: "assembly",
    children: [
      {
        id: "spares/fasteners",
        label: "Fastener kit",
        meta: "24 pc",
        kind: "fastener",
      },
      {
        id: "spares/belts",
        label: "Timing belts",
        meta: "2",
        kind: "part",
      },
      {
        id: "spares/fuses",
        label: "Control cabinet fuses",
        meta: "10",
        kind: "part",
      },
    ],
  },
];
