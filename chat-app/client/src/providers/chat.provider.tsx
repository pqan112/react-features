import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth.provider";
import { baseUrl, getRequest } from "../utils/services";

interface ChatContextProps {
  userChats: string | null;
  isUserChatsLoading: boolean | null;
  userChatsError: string | null;
  setUserChats: (chats: string) => void;
  setIsUserChatsLoading: (isLoading: boolean) => void;
  setUserChatsError: (error: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userChats, setUserChats] = useState<string | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        const res = await getRequest(`${baseUrl}/chats/${user._id}`);

        setIsUserChatsLoading(false);
        if (res?.error) {
          return setUserChatsError(res.message as string);
        }

        setUserChats(res.data);
      }
    };
    getUserChats();
  }, [user]);

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
