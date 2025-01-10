import React from "react";
import { useAuth } from "../../providers/auth.provider";
import useFetchReceipient from "../../hooks/useFetchReceipient";
import {
  useChat,
  UserChat as UserChatType,
} from "../../providers/chat.provider";
import { getUnreadNotifications } from "../../utils/unreadNotifications";
import useFetchMessage from "../../hooks/useFetchMessage";
import moment from "moment";

function UserChat({ chat }: { chat: UserChatType }) {
  const { user } = useAuth();
  const {
    updateCurrentChat,
    onlineUsers,
    notifications,
    markThisUserNotificationsAsRead,
  } = useChat();
  const { recipientUser } = useFetchReceipient(chat, user);

  const { latestMessage } = useFetchMessage(chat);

  const unreadNotifications = getUnreadNotifications(notifications);
  const thisUserNotifications = unreadNotifications.filter(
    (n) => n.senderId === recipientUser?._id
  );
  const isOnline = onlineUsers.some((ou) => ou.userId === recipientUser?._id);

  const truncateText = (text: string) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  return (
    <div
      className="flex items-center justify-between p-3 cursor-pointer"
      // onClick={() => updateCurrentChat(chat)}

      onClick={() => {
        updateCurrentChat(chat);
        if (thisUserNotifications.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="flex items-center">
        <img
          src="https://picsum.photos/200"
          alt="avatar"
          className="mr-2 rounded-full w-7 h-7"
        />

        <div className="flex flex-col">
          <span className="font-semibold">{recipientUser?.name}</span>
          <div className="text-sm">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-end gap-1">
        <div className="text-sm">
          {moment(latestMessage?.createdAt).format("DD/MM/YYYY")}
        </div>
        <div
          className={
            thisUserNotifications.length > 0
              ? "h-5 text-sm text-center text-white bg-blue-600 rounded-full min-w-5"
              : ""
          }
        >
          {thisUserNotifications.length > 0
            ? thisUserNotifications.length
            : null}
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
