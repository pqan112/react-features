import React, { createContext, useContext, useState } from "react";

interface ChatContextProps {
  userChats: string | null;
  isUserChatsLoading: boolean | null;
  userChatsError: string | null;
  setUserChats: (chats: string) => void;
  setIsUserChatsLoading: (isLoading: boolean) => void;
  setUserChatsError: (error: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userChats, setUserChats] = useState<string | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        setUserChats,
        setIsUserChatsLoading,
        setUserChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
