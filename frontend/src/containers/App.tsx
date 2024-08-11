import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Message} from '../types';
import MessageForm from '../components/MessageForm/MessageForm';
import MessagesList from '../components/MessagesList/MessagesList';

const url = 'http://localhost:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get<Message[]>(url);
      setMessages(response.data.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()));
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  useEffect(() => {
    void fetchMessages();

    const newIntervalMsg = setInterval(() => {
      void fetchMessages();
    }, 3000);

    return () => {
      clearInterval(newIntervalMsg);
    };
  }, []);

  const handleSendMessage = async (message: string, author: string) => {
    try {
      await axios.post(url, {message, author});
      void fetchMessages();
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