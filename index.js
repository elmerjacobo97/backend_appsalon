import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import servicesRoutes from "./routes/servicesRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Configuración dotenv
dotenv.config();

// Configuración de la app
const app = express();

// Leer los datos del body
app.use(express.json());

// Conectar a la base de datos
await connectDB();

// Configurar CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

const whiteList = [process.env.FRONTEND_URL];
if (process.argv[2] === "--postman") {
  whiteList.push(undefined);
}

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Definir una ruta
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(
    colors.white.bold.bgCyan(`Servidor corriendo en el puerto: ${PORT}`),
  );
});
