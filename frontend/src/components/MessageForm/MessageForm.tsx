import React, {useState} from 'react';
import {TextField, Button, Container, Box} from '@mui/material';

interface MessageFormProps {
  onSendMessage: (message: string, author: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && author) {
      onSendMessage(message, author);
      setMessage('');
      setAuthor('');
    } else {
      console.log('Both fields are required to fill.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={submitMessage} sx={{mt: 3}}>
        <TextField
          label="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{mt: 2}}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default MessageForm;