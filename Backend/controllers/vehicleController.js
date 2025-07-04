import asyncHandler from "express-async-handler";
import pool from "../db.js";

/**
 * Method to get Vehiles by no of wheels count.
 * @param {*} wheelsCount 
 * @param {*} res 
 */
const getVehiclesByNoOfWheels = async (wheelsCount, res) => {
  const query = "SELECT * FROM vehicle_table WHERE no_of_wheels = ?";
  const [rowsByWheels] = await pool.query(query, [Number(wheelsCount)]);
  if (!rowsByWheels) {
    res.status(404);
    throw new Error("Vehicles Not Found!");
  }
  res.status(200).json(rowsByWheels);
};

/**
 * Method to get vehicles.
 * @param {*} res 
 */
const getVehicles = async (res) => {
  const query = "SELECT * FROM vehicle_table";
  const [rows] = await pool.query(query);
  if (!rows) {
    res.status(404);
    throw new Error("Vehicles Not Found!");
  }
  res.status(200).json(rows);
};

/**
 * Method to get vehicles in all possible ways.
 * @param {*} req
 * @param {*} res
 */
const getAllVehicles = (req, res) => {
  const noOfWheels = req.query.no_of_wheels;
  if (noOfWheels) {
    getVehiclesByNoOfWheels(noOfWheels, res);
  } else {
    getVehicles(res);
  }
};

/**
 * Method to get all Vehile Types.
 */
const getAllVehicleTypes = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    "SELECT DISTINCT vehicle_type FROM vehicle_table;"
  );
  if (!rows) {
    res.status(404);
    throw new Error("Vehicles Not Found!");
  }
  const uniqueVehicleTypes = rows.map((item) => item.vehicle_type);
  res.status(200).json(uniqueVehicleTypes);
});

/**
 * Method to get no of wheels data.
 */
const getNoOfWheels = asyncHandler(async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM wheels_table");
  if (!rows) {
    res.status(404);
    throw new Error("Wheels Not Found!");
  }
  res.status(200).json(rows);
});

/**
 * Method to post the booked details to booking_table.
 */
const postBookingDetails = asyncHandler(async (req, res) => {
  const { vehicle_id, user_id, booking_from, booking_to } = req.body;

  if (!vehicle_id || !user_id || !booking_from || !booking_to) {
    res
      .status(400)
      .send({
        message:
          "All fields (vehicle_id, user_id, booking_from, booking_to) are required",
      });
    throw new Error(
      "All fields (vehicle_id, user_id, booking_from, booking_to) are required"
    );
  }
  const query =
    "INSERT INTO `Vehicle`.`booking_table` (`vehicle_id`, `user_id`, `booking_from`, `booking_to`) VALUES (?,?,?,?)";
  const query2 = `UPDATE vehicle_table SET booking_status = ? WHERE id = ?`;
  const [result2] = await pool.query(query2, [1, vehicle_id]);
  const [result] = await pool.query(query, [
    vehicle_id,
    user_id,
    booking_from,
    booking_to,
  ]);

  if (result.affectedRows == 0 || result2.affectedRows == 0) {
    res.status(404);
    throw new Error("Failed to confirm booking!");
  }
  res
    .status(200)
    .json({
      booking_id: result.insertId,
      vehicle_id,
      message: "Booking confirmed Successfully!",
    });
});

/**
 * Method to get all details of booking Info in single API.
 */
const getBookingDetails = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const query = `
    SELECT 
      b.booking_id,
      b.booking_from,
      b.booking_to,
      u.id AS user_id,
      u.first_name,
      u.last_name,
      v.id AS vehicle_id,
      v.no_of_wheels,
      v.vehicle_type,
      v.vehicle_model,
      v.booking_status
    FROM booking_table b
    JOIN users_table u ON b.user_id = u.id
    JOIN vehicle_table v ON b.vehicle_id = v.id
    WHERE b.booking_id = ?
  `;

  try {
    const [rows] = await pool.query(query, [bookingId]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export {
  getAllVehicles,
  getAllVehicleTypes,
  getNoOfWheels,
  postBookingDetails,
  getBookingDetails,
};
