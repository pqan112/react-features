import { useEffect, useState } from "react";
import { User, UserChat } from "../providers/chat.provider";
import { baseUrl, getRequest } from "../utils/services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetchReceipient(chat: UserChat, user: any) {
  const [recipientUser, setRecipientUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recipientId = chat?.members.find((mem) => mem !== user._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const res = await getRequest(`${baseUrl}/users/find/${recipientId}`);
      if (res.error) {
        return setError(res.message as string);
      }

      setRecipientUser(res.data);
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
}

export default useFetchReceipient;
