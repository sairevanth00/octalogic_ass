import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234!@#$ASDF',
  database: 'Vehicle',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other files like app.js
export default pool;