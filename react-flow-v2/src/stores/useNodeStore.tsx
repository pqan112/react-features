import { type Node } from "@xyflow/react";
import { create } from "zustand";

interface NodeState {
  selectedNode: Node | null;
  nodeLabel: string;
  setSelectedNode: (node: Node | null) => void;
  setNodeLabel: (label: string) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  selectedNode: null,
  nodeLabel: "",
  setSelectedNode: (node) => set({ selectedNode: node }),
  setNodeLabel: (label) => set({ nodeLabel: label }),
}));
