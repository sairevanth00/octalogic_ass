import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234!@#$ASDF',
  database: 'Vehicle'
});

export default connection;