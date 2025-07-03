import mysql from 'mysql2/promise';

// Create a connection pool (recommended over single connection)
const pool = mysql.createPool({
  host: 'localhost',           // your MySQL host (usually localhost)
  user: 'root',                // your MySQL username
  password: '1234!@#$ASDF',   // your MySQL password
  database: 'Vehicle',   // your target DB name
  waitForConnections: true,
  connectionLimit: 10,         // max number of connections in the pool
  queueLimit: 0                // unlimited queued requests
});

// Export the pool for use in other files like app.js
export default pool;