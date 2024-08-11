import express from 'express';
import fileDb from '../fileDb';
import {IMessage, Message} from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getMessages();
  const queryDate = req.query.datetime as string;
  if (queryDate) {
    const date = new Date(queryDate);
    if (isNaN(date.getTime())) {
      return res.status(400).send({'error': 'Invalid date format'});
    }
    const filteredMessages = (messages as IMessage[]).filter(message => new Date(message.datetime) > date);
    return res.send(filteredMessages);
  }
  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(400).send({'error': 'Author and message must be present in the request'});
  }
  const message: Message = {
    author: req.body.author,
    message: req.body.message,
  };
  const savedMessage = await fileDb.addMessage(message);
  res.send(savedMessage);
});

export default messagesRouter;