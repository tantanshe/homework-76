import React from 'react';
import {Message} from '../../types';
import {Container, Card, CardContent, Typography} from '@mui/material';
import dayjs from 'dayjs';

interface MessagesProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesProps> = ({messages}) => {
  return (
    <Container maxWidth="sm" sx={{mt: 4}}>
      {messages.map((message) => (
        <Card key={message.id} sx={{mb: 3}}>
          <CardContent>
            <Typography variant="h6" component="div">
              {message.author}
            </Typography>
            <Typography variant="body1" sx={{mt: 1}}>
              {message.message}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{mt: 1}}>
              {dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MessagesList;