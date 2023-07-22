import { Pool } from 'pg';

interface Users {
    id: number;
    name: string;
    surname: string;
    email: string;
    pwd: string;
}

const pool = new Pool();

const getAllUsers = async (): Promise<Users[]> => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();

    return result.rows;
};

const createUser = async (users: Users): Promise<Users> => {
    const { name, surname, email, pwd } = users;
    const client = await pool.connect();
    const result = await client.query(
        'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, surname, email, pwd]
    );
    client.release();

    return result.rows[0];
};

export { Users, getAllUsers, createUser };