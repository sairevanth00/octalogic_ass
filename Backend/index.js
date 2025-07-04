import express from 'express';
import connection from './config/dbConnection.js';
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

// Connection to the MY SQL Database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.use(cors());

// Handling the CORS policy from frontend URL's
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(express.json());
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/user", userRoutes)
