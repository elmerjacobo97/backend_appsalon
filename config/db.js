import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.white.bold.bgGreen(`Base de datos conectada: ${ conn.connection.host }`));
  } catch (error) {
    console.log(colors.white.bold.bgRed(`Error al conectar la base de datos: ${ error }`));
    process.exit(1); // Detener la app si hay un error
  }
}

export default connectDB
