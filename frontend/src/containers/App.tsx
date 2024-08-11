import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Message} from '../types';
import MessageForm from '../components/MessageForm/MessageForm';
import MessagesList from '../components/MessagesList/MessagesList';

const url = 'http://localhost:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [intervalMsg, setIntervalMsg] = useState<number | null>(null);

  const fetchMessages = async (datetime?: string) => {
    try {
      const response = await axios.get<Message[]>(url, {
        params: datetime ? {datetime} : {},
      });
      setMessages((prev) => {
        const newMessages = datetime ? [...prev, ...response.data] : response.data;
        return newMessages.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
      });
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  useEffect(() => {
    void fetchMessages();

    const newIntervalMsg = setInterval(() => {
      const lastMessage = messages[messages.length - 1];
      void fetchMessages(lastMessage?.datetime);
    }, 3000);
    setIntervalMsg(newIntervalMsg);

    return () => {
      if (intervalMsg) {
        clearInterval(intervalMsg);
      }
    };
  }, [messages]);

  const handleSendMessage = async (message: string, author: string) => {
    try {
      await axios.post(url, {message, author});
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <>
      <MessageForm onSendMessage={handleSendMessage}/>
      <MessagesList messages={messages}/>
    </>
  );
};

export default App;