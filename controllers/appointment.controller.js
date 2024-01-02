import Appointment from "../models/Appointment.js";
import { endOfDay, formatISO, isValid, parse, startOfDay } from "date-fns";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();

  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();

    res
      .status(201)
      .json({ msg: "Tu reservación se ha realizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear la cita" });
  }
};

const getAppointmentByDate = async (req, res) => {
  const { date } = req.query;

  const newDate = parse(date, "dd/MM/yyyy", new Date());

  if (!isValid(newDate)) {
    return res.status(400).json({ msg: "Fecha inválida" });
  }

  const isoDate = formatISO(newDate);

  try {
    const appointment = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)),
        $lte: endOfDay(new Date(isoDate)),
      },
    }).select("time");
    res.json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener las citas" });
  }
};

export { createAppointment, getAppointmentByDate };
