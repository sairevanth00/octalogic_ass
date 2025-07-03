import asyncHandler from "express-async-handler";
import pool from '../db.js';

const addUserDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  console.log('req.body: ', req.body)
  const query = 'INSERT INTO `Vehicle`.`users_table` (`first_name`, `last_name`) VALUES (?,?)';

  const [result] = await pool.query(query, [
    firstName,
    lastName
  ]);

  console.log('Inserted with ID:', result.insertId);
  if(!result.insertId) {
    res.status(404);
    throw new Error("Failed to add user details!");
  }
  res.status(200).json({id: result.insertId, message: 'User created Successfully!'});
});

export { addUserDetails }