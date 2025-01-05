import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { useChat } from "../providers/chat.provider";

function Chat() {
  const { userChats, isUserChatsLoading } = useChat();
  return (
    <div>
      <PotentialChats />
      {!userChats?.length ? null : (
        <div className="flex justify-between gap-4">
          <div className="h-[calc(100vh_-_24px)] w-72 p-2">
            {isUserChatsLoading && <p>Loading chats...</p>}

            {userChats?.map((chat) => (
              <UserChat key={chat._id} chat={chat} />
            ))}
          </div>
          <div className="flex-grow">ChatBox</div>
        </div>
      )}
    </div>
  );
}

export default Chat;
