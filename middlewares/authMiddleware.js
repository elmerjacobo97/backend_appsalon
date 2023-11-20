import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        "-password -verified -token -__v",
      );
      next();
    } catch {
      const error = new Error("Token no válido. Acceso denegado");
      return res.status(401).json({
        msg: error.message,
      });
    }
  } else {
    const error = new Error("No hay token en la petición. Acceso denegado");
    return res.status(401).json({
      msg: error.message,
    });
  }
};

export default authMiddleware;
