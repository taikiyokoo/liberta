// components/hooks/useChat.ts
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { getChatroom, getMessages } from 'pages/api/chatroom';
import { Message, User } from 'interfaces';

const useChat = (chatroomId: string, currentUser: User | undefined) => {
const [messages, setMessages] = useState<Message[]>([]);
const [inputValue, setInputValue] = useState('');
const chatChannelRef = useRef<any>(null);
const [user, setUser] = useState<User>();
const [isLoading,setIsLoading] = useState<boolean>(true);

const [cableState,setCable] = useState<any>(null);

const loadCable =  async()=> {
    const { default: actionCable } = await import('actioncable');
    const cable = actionCable.createConsumer('ws://localhost:3001/cable');
    setCable(cable)
    chatChannelRef.current = cable.subscriptions.create(
        {
          channel: 'ChatChannel',
          chatroom_id: parseInt(chatroomId),
        },
        {
          received: (data: Message) => {
            console.log("Received event:", data);
            setMessages((prevMessages) => {
                // すでに存在するメッセージの場合、ステートを更新しない
                if (prevMessages.some((message) => message.id === data.id)) {
                  return prevMessages;
                }
                // それ以外の場合、新しいメッセージを追加
                return [...prevMessages, data];
              });
          },
        }
      );
}

  const handleGetMessages = async () => {
    try {
      const res = await getMessages(chatroomId);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUser = async (id: string) => {
    try {
      const res = await getChatroom(id);
      const users = res.data;
      const otherUser: User[] = users.filter((user: User) => user.id !== currentUser?.id);
      setUser(otherUser[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCable();
    handleGetMessages();
    handleGetUser(chatroomId);
    setIsLoading(false);
    return () => {
      if (chatChannelRef.current) {
        chatChannelRef.current.unsubscribe();
      }
    };
  }, [chatroomId]);

  const handleSendMessage = () => {
    if (inputValue === '') return;
    const subscription = (cableState.subscriptions as any).subscriptions.find(
      (sub: any) => sub.identifier === `{"channel":"ChatChannel","chatroom_id":${chatroomId}}`
    );
    if (subscription) {
      subscription.perform('send_message', {
        chatroom_id: chatroomId,
        userId: currentUser?.id,
        content: inputValue,
      });
      setInputValue('');
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { messages, handleSendMessage, handleChangeContent, inputValue, user,isLoading };
};

export default useChat;
