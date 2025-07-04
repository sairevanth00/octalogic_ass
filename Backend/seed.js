import mysql from "mysql2/promise";
require("dotenv").config();

const seed = async () => {
  try {
    const pool = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log("Connected to DB... Seeding Data");

    // Clear existing data (optional)
    // await pool.query("DELETE FROM users_table");
    // await pool.query("DELETE FROM vehicle_table");
    // await pool.query("DELETE FROM booking_table");

    // Insert sample users
    await pool.query(`
      INSERT INTO users_table (id, first_name, last_name)
      VALUES
      (1, 'John', 'Doe'),
      (2, 'Jane', 'Smith'),
      (3, 'Alice', 'Johnson')
    `);

    // Insert sample vehicles
    await pool.query(`
      INSERT INTO vehicle_table (id, no_of_wheels, vehicle_type, vehicle_model, booking_status)
      VALUES
      (1, 31, 'sports', 'Yamaha R15', false),
      (2, 32, 'suv', 'Mahindra XUV700', false)
    `);

    // Insert sample bookings
    await pool.query(`
      INSERT INTO booking_table (booking_id, user_id, vehicle_id, booking_from, booking_to)
      VALUES
      (45, 1, 1, '2025-07-01', '2025-07-05')
    `);


    // Insert Sample wheels
    await pool.query(`
      INSERT INTO wheels_table (id, no_of_wheels_in_int, no_of_wheels_in_text) 
      VALUES 
      ('1', '2', 'Two'),
      ('2', '4', 'Four');
    `);

    console.log("Seed data inserted successfully");
    await pool.end();
  } catch (err) {
    console.error("Failed to seed DB:", err);
    process.exit(1);
  }
};

seed();