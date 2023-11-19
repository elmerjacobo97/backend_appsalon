import express from "express";
import {
  login,
  register,
  verifyAccount,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Rutas de autenticación y registro
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);

export default router;
