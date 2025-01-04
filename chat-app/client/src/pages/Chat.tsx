import React from "react";
import { useChat } from "../providers/chat.provider";

function Chat() {
  const { userChats, isUserChatsLoading, userChatsError } = useChat();
  console.log(userChats);
  return <div>Chat</div>;
}

export default Chat;
