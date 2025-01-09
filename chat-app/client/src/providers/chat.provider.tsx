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
import { io } from "socket.io-client";

export interface UserChat {
  createdAt: string;
  members: Array<string>;
  updatedAt: string;
  _id: string;
}

export interface Notification {
  senderId: string;
  isRead: boolean;
  date: string;
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
  sendTextMessageError: string | null;
  newMessage: Message | null;
  onlineUsers: any[];
  notifications: Array<Notification>;
  allUsers: User[];
  setUserChats: (chats: UserChat[]) => void;
  setIsUserChatsLoading: (isLoading: boolean) => void;
  setUserChatsError: (error: string) => void;
  setPotentialChats: (users: UserType[]) => void;
  createChat: (firstId: string, secondId: string) => void;
  updateCurrentChat: (chat: UserChat) => void;
  setMessagesError: (error: string) => void;
  setIsMessagesLoading: (isLoading: boolean) => void;
  setMessages: (messages: Message[]) => void;
  sendTextMessage: (
    textMessage: string,
    sender: UserType,
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => void;
  setSendTextMessageError: (text: string) => void;
  setNewMessage: (message: Message) => void;
  setNotifications: (notification: Notification[]) => void;
  setAllUsers: (users: User[]) => void;
  markAllNotificationsAsRead: (notifications: Notification[]) => void;
  markNotificationAsRead: (
    n: Notification & { senderName: string | undefined },
    userChats: UserChat[],
    user: any,
    notifications: any
  ) => void;
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
  const [sendTextMessageError, setSendTextMessageError] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res: any) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user?._id]);

  // send Message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res: any) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res: any) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [newMessage, socket, currentChat]);

  // todo

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
      setAllUsers(res.data);
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

  const updateCurrentChat = useCallback((chat: UserChat) => {
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

  const sendTextMessage = useCallback(
    async (
      textMessage: string,
      sender: UserType,
      currentChatId: string,
      setTextMessage: (text: string) => void
    ) => {
      if (!textMessage) return console.log("you must type something");

      const res = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );

      if (res.error) {
        return setSendTextMessageError(res.message as string);
      }
      setNewMessage(res.data);
      setMessages((prev) => [...prev, res.data]);
      setTextMessage("");
    },
    []
  );

  const markAllNotificationsAsRead = useCallback(
    (notifications: Notification[]) => {
      const mNotifications = notifications.map((n) => {
        return { ...n, isRead: true };
      });

      setNotifications(mNotifications);
    },
    []
  );

  const markNotificationAsRead = useCallback(
    (
      n: Notification & { senderName: string | undefined },
      userChats: UserChat[],
      user: UserType,
      notifications: Notification[]
    ) => {
      const desiredChat = userChats.find((chat) => {
        const chatMembers = [user?._id, n.senderId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });

        return isDesiredChat;
      });

      //mark notification as read
      const mNotifications = notifications.map((el) => {
        if (n.senderId === el.senderId) {
          return { ...n, isRead: true };
        } else {
          return el;
        }
      });

      updateCurrentChat(desiredChat as UserChat);
      setNotifications(mNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        allUsers,
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        currentChat,
        isMessagesLoading,
        messagesError,
        messages,
        sendTextMessageError,
        newMessage,
        onlineUsers,
        notifications,
        updateCurrentChat,
        setUserChats,
        setIsUserChatsLoading,
        setUserChatsError,
        setPotentialChats,
        createChat,
        setIsMessagesLoading,
        setMessagesError,
        setMessages,
        sendTextMessage,
        setSendTextMessageError,
        setNewMessage,
        setNotifications,
        setAllUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
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
