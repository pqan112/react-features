/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth.provider";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { UserType } from "../models/auth.model";

export interface UserChat {
  createdAt: string;
  members: Array<string>;
  updatedAt: string;
  _id: string;
}

export type User = Omit<UserType, "token">;

export interface Message {
  chatId: string;
  createdAt: string;
  senderId: string;
  text: string;
  updatedAt: string;
}

interface ChatContextProps {
  userChats: UserChat[];
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  potentialChats: UserType[];
  currentChat: UserChat | null;
  messagesError: string | null;
  isMessagesLoading: boolean;
  messages: Message[];
  setUserChats: (chats: UserChat[]) => void;
  setIsUserChatsLoading: (isLoading: boolean) => void;
  setUserChatsError: (error: string) => void;
  setPotentialChats: (users: UserType[]) => void;
  createChat: (firstId: string, secondId: string) => void;
  updateCurrentChat: (chat: UserChat) => void;
  setMessagesError: (error: string) => void;
  setIsMessagesLoading: (isLoading: boolean) => void;
  setMessages: (messages: Message[]) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  // potentialChats are social network friends

  const [potentialChats, setPotentialChats] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<UserChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const { user } = useAuth();

  console.log("messages", messages);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getRequest(`${baseUrl}/users`);
      if (res.error) {
        return console.log(res.message);
      }
      const pChats = res.data.filter((u: User) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats, user?._id]);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      const res = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if (res.error) {
        return setMessagesError(res.message as string);
      }

      setMessages(res.data);
    };

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat: any) => {
    console.log(chat);
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId: string, secondId: string) => {
    const res = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );
    if (res.error) {
      return console.log(res.message);
    }

    setUserChats((prev) => [...prev, res.data]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        currentChat,
        isMessagesLoading,
        messagesError,
        messages,
        updateCurrentChat,
        setUserChats,
        setIsUserChatsLoading,
        setUserChatsError,
        setPotentialChats,
        createChat,
        setIsMessagesLoading,
        setMessagesError,
        setMessages,
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
