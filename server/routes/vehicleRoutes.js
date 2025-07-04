import express from 'express';
import { getAllVehicles, getNoOfWheels, postBookingDetails, getBookingDetails } from '../controllers/vehicleController.js';
const router = express.Router();



router.get("/", getAllVehicles);
router.get("/wheels", getNoOfWheels);
router.get("/booking_details/:id", getBookingDetails);
router.post("/booking_confirm", postBookingDetails);

export default router;