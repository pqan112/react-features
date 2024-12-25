import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextType {
  type: string | null; // Value can be `null` or any other type
  setType: Dispatch<SetStateAction<string | null>>; // Function to set the value
}

const DnDContext = createContext<ContextType | undefined>(undefined);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  const context = useContext(DnDContext);

  if (!context) {
    throw new Error("useDnD must be used within a DnDProvider");
  }
  return context;
};
