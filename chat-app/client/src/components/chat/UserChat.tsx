import React from "react";
import { useAuth } from "../../providers/auth.provider";
import useFetchReceipient from "../../hooks/useFetchReceipient";
import { UserChat as UserChatType } from "../../providers/chat.provider";

function UserChat({ chat }: { chat: UserChatType }) {
  const { user } = useAuth();
  const { recipientUser } = useFetchReceipient(chat, user);
  console.log(recipientUser);
  return <div>UserChat</div>;
}

export default UserChat;
