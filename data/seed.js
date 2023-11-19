import dotenv from 'dotenv';
import colors from 'colors';
import db from '../config/db.js';
import Services from '../models/Services.js';
import { services } from './beautyServices.js';

dotenv.config();

await db()

async function seedDB() {
  try {
    await Services.insertMany(services);
    console.log(colors.cyan.bold('Servicios creados correctamente'));
    process.exit(); // por default es cero
  } catch (error) {
    console.log(colors.red.bold(`Error al crear los servicios: ${ error }`));
    process.exit(1);
  }
}


async function clearDB() {
  try {
    await Services.deleteMany();
    console.log(colors.cyan.bold('Servicios eliminados correctamente'));
    process.exit();
  } catch (error) {
    console.log(colors.red.bold(`Error al eliminar los servicios: ${ error }`));
    process.exit(1);
  }
}

if (process.argv[2] === '--import') {
  await seedDB();
} else {
  await clearDB();
}
