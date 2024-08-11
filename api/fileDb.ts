import {promises as fs} from 'fs';
import {Message} from './types';

const fileName = './db.json';
let data: Message[] = [];
const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getMessages() {
    return data;
  },
  async addMessage(item: Message) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const message = {
      id,
      ...item,
      datetime
    }
    data.push(message);
    await this.save();
    return message;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data));
  }
};

export default fileDb;