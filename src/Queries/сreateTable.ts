import pool from '../db';

const createTables = async () => {
  const client = await pool.connect();

  await client
    .query(
      ` 
      create table if not exists users (
        id serial primary key,
        name varchar(40),
        surname varchar(40),
        email varchar(50),
        pwd varchar(100)
    );
    
    create table if not exists messages (
        id serial primary key,
        fromUser int,
        toUser int,
        date date,
        text text
    
    )
        `,
    )
    .catch(error => {
      if (error) console.log(error, 'tables not create');
    });
  console.log('created');
};
export { createTables };