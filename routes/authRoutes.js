import express from "express";
import {
  login,
  register,
  user,
  verifyAccount,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación y registro
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);

// Área privada. requiere JWT
router.get("/user", authMiddleware, user);

export default router;
