import { Pool } from 'pg';

interface Message {
  id: number;
  fromUser: number;
  toUser: number;
  date: Date;
  text: string;
  /* file: Buffer; */
}

const pool = new Pool();



const createMessage = async (message: Message): Promise<Message> => {
  const { fromUser, toUser, date, text, /* file */ } = message;
  const client = await pool.connect();
  const result = await client.query(
    'INSERT INTO messages (fromUser, toUser, date, text) VALUES ($1, $2, $3, $4) RETURNING *',
    [fromUser, toUser, date, text, /* file */]
  );
  client.release();

  return result.rows[0];
};

export { Message, getAllMessages, createMessage };const getAllMessages = async (): Promise<Message[]> => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM messages');
  client.release();

  return result.rows;
};