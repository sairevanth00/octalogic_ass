import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',       // your DB host
  user: 'root',            // your DB username
  password: '1234!@#$ASDF',
  database: 'Vehicle'
});

export default connection;