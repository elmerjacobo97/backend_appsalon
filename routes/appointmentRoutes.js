import express from "express";
import {
  createAppointment,
  getAppointmentByDate,
} from "../controllers/appointment.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createAppointment)
  .get(authMiddleware, getAppointmentByDate);

export default router;
