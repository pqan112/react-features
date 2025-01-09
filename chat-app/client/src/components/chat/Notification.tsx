import React, { useState } from "react";
import { useChat } from "../../providers/chat.provider";
import { getUnreadNotifications } from "../../utils/unreadNotifications";
import { useAuth } from "../../providers/auth.provider";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useChat();

  const unreadNotifications = getUnreadNotifications(notifications);

  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return { ...n, senderName: sender?.name };
  });

  console.log("unreadNotifications", unreadNotifications);
  console.log("modifiiedNotifications", modifiedNotifications);

  return (
    <div className="relative ">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        🔔
      </div>
      {unreadNotifications?.length === 0 ? null : (
        <span className="absolute h-5 text-sm text-center text-white bg-blue-600 rounded-full -top-1 -right-1 min-w-5">
          {unreadNotifications?.length}
        </span>
      )}
      {isOpen ? (
        <div className="absolute right-0 p-3 border border-gray-400 rounded-md top-full w-96">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Notifications</h3>
            <span
              className="cursor-pointer"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all as read
            </span>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span>No notification yet...</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => (
              <div
                key={index}
                onClick={() => {
                  markNotificationAsRead(n, userChats, user, notifications);
                  setIsOpen(false);
                }}
              >
                <span>{`${n.senderName} sent you a new message`}</span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default Notification;
