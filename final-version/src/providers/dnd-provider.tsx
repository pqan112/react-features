import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextType {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

export const DnDContext = createContext<ContextType>({
  type: "default",
  setType: () => {},
});

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string>("default");

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {children}
    </DnDContext.Provider>
  );
};
