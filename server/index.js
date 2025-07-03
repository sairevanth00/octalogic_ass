import express from 'express';
// const express = require('express');
import connection from './config/dbConnection.js';
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

const app = express();
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // your React frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or auth headers
}));

const port = 4500;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
app.use(express.json());
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/user", userRoutes)
