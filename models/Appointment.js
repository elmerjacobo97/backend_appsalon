import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId de Mongoose
      ref: "Services", // Referencia al modelo de Servicios
    },
  ],
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId de Mongoose
    ref: "User", // Referencia al modelo de Usuario
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
