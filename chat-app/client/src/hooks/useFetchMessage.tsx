import { useEffect, useState } from "react";
import { Message, useChat, UserChat } from "../providers/chat.provider";
import { baseUrl, getRequest } from "../utils/services";

function useFetchMessage(chat: UserChat) {
  const { newMessage, notifications } = useChat();
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);

  useEffect(() => {
    const getMessage = async () => {
      const res = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (res.error) {
        return console.log("Error getting messages...", res.message);
      }

      setLatestMessage(res.data[res.data.length - 1]);
    };

    getMessage();
  }, [newMessage, notifications]);

  return { latestMessage };
}

export default useFetchMessage;
