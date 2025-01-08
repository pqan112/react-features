import { useState } from "react";
import useFetchReceipient from "../../hooks/useFetchReceipient";
import { useAuth } from "../../providers/auth.provider";
import { useChat, UserChat } from "../../providers/chat.provider";
import InputEmoji from "react-input-emoji";
import { UserType } from "../../models/auth.model";

function ChatBox() {
  const { user } = useAuth();
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useChat();
  const { recipientUser } = useFetchReceipient(currentChat as UserChat, user);
  const [textMessage, setTextMessage] = useState("");

  if (!recipientUser) {
    return <p>No conversation</p>;
  }
  if (isMessagesLoading) {
    return <p>Loading chat...</p>;
  }

  return (
    <div>
      <div className="text-center">{recipientUser.name}</div>
      <div className="space-y-2 h-[calc(100vh_-_42px_-_24px_-_24px_-_52px)] overflow-y-auto">
        {messages &&
          messages.map((message, index) => (
            <div
              className={`${
                message.senderId === user?._id
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
              key={index}
            >
              <div
                className={`p-2 text-white rounded-md max-w-[50%] ${
                  message.senderId === user?._id
                    ? "bg-blue-600 justify-end"
                    : "bg-gray-600"
                }`}
              >
                <p>{message.text}</p>
                <span>{message.createdAt}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center gap-3">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(70, 112, 223, 0.2)"
          shouldConvertEmojiToImage={false}
          shouldReturn
        />
        <button
          onClick={() =>
            sendTextMessage(
              textMessage,
              user as UserType,
              currentChat?._id as string,
              setTextMessage
            )
          }
        >
          📤
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
