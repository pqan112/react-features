import { type Node } from "@xyflow/react";
import { create } from "zustand";

interface NodeState {
  selectedNode: Node | null;
  label: string;
  bgColor: string;
  textColor: string;
  fontSize: string;
  handleColor: string;
  setSelectedNode: (node: Node | null) => void;
  setLabel: (label: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontSize: (color: string) => void;
  setHandleColor: (color: string) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  selectedNode: null,
  label: "",
  bgColor: "",
  textColor: "",
  fontSize: "",
  handleColor: "",

  setSelectedNode: (node) => set({ selectedNode: node }),
  setLabel: (label) => set({ label: label }),
  setBgColor: (color) => set({ bgColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setFontSize: (fontSize) => set({ fontSize: fontSize }),
  setHandleColor: (color) => set({ handleColor: color }),
}));
