import React from "react";
import { useAuth } from "../../providers/auth.provider";
import useFetchReceipient from "../../hooks/useFetchReceipient";
import {
  useChat,
  UserChat as UserChatType,
} from "../../providers/chat.provider";

function UserChat({ chat }: { chat: UserChatType }) {
  const { user } = useAuth();
  const { updateCurrentChat, onlineUsers } = useChat();
  const { recipientUser } = useFetchReceipient(chat, user);

  const isOnline = onlineUsers.some((ou) => ou.userId === recipientUser?._id);

  return (
    <div
      className="flex items-center justify-between p-3 cursor-pointer"
      onClick={() => updateCurrentChat(chat)}
    >
      <div className="flex items-center">
        <img
          src="https://picsum.photos/200"
          alt="avatar"
          className="mr-2 rounded-full w-7 h-7"
        />

        <div className="flex flex-col">
          <span className="font-semibold">{recipientUser?.name}</span>
          <span className="text-sm">Message</span>
        </div>
      </div>
      <div className="relative flex flex-col items-end gap-1">
        <div className="text-sm">12/12/2022</div>
        <div className="h-5 text-sm text-center text-white bg-blue-600 rounded-full min-w-5">
          2
        </div>
        <span
          className={
            isOnline
              ? "absolute w-2 h-2 bg-green-700 rounded-full -right-2 -top-2"
              : ""
          }
        ></span>
      </div>
    </div>
  );
}

export default UserChat;
