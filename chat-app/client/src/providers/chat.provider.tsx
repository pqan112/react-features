import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth.provider";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { User } from "../models/auth.model";

export interface UserChat {
  createdAt: string;
  members: Array<string>;
  updatedAt: string;
  _id: string;
}

interface ChatContextProps {
  userChats: UserChat[];
  isUserChatsLoading: boolean | null;
  userChatsError: string | null;
  potentialChats: User[];
  setUserChats: (chats: UserChat[]) => void;
  setIsUserChatsLoading: (isLoading: boolean) => void;
  setUserChatsError: (error: string) => void;
  setPotentialChats: (users: User[]) => void;
  createChat: (firstId: string, secondId: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  // potentialChats are social network friends
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [potentialChats, setPotentialChats] = useState<any>([]);

  const { user } = useAuth();

  console.log("user", user);

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

  const createChat = useCallback(
    async (firstId: string, secondId: string) => {
      const res = await postRequest(
        `${baseUrl}/chats/${user?._id}`,
        JSON.stringify([firstId, secondId])
      );
      if (res.error) {
        return console.log(res.message);
      }

      setUserChats((prev) => [...prev, res.data]);
    },
    [user]
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        setUserChats,
        setIsUserChatsLoading,
        setUserChatsError,
        setPotentialChats,
        createChat,
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
