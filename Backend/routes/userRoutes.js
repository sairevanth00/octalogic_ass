import express from 'express';
import { addUserDetails } from '../controllers/userController.js';
const router = express.Router();

router.post("/", addUserDetails);

export default router