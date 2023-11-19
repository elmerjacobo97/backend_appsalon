import Services from '../models/Services.js';
import { handleNotFoundError, validateObjectId } from '../utils/index.js';

const createService = async (req, res) => {
  const { name, price } = req.body;

  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios');
    return res.status(400).json({
      msg: error.message
    })
  }

  try {
    const service = new Services({ name, price });
    const savedService = await service.save();
    res.json({
      msg: 'Servicio creado correctamente',
      service: savedService
    })
  } catch (error) {
    console.log('Error al crear el servicio', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    })
  }
}


const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    console.log('Error al obtener los servicios', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    })
  }
}

const getServiceById = async (req, res) => {
  const { id } = req.params;

  // Validar que sea un id de mongo
  if (validateObjectId(id, res)) {
    return;
  }

  try {
    const service = await Services.findById(id);

    // Validar que exista el servicio
    if (!service) {
      return handleNotFoundError('El servicio no existe', res);
    }

    res.json(service);
  } catch (error) {
    console.log('Error al obtener el servicio', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    })
  }
}

const updateService = async (req, res) => {

  const { id } = req.params;

  // Validar que sea un id de mongo
  if (validateObjectId(id, res)) {
    return;
  }

  try {
    const service = await Services.findById(id);

    // Validar que exista el servicio
    if (!service) {
      return handleNotFoundError('El servicio no existe', res);
    }

    // Escribimos en el objeto los nuevos valores
    service.name = req.body.name || service.name;
    service.price = req.body.price || service.price;

    // Guardamos en la base de datos
    const updatedService = await service.save();

    // Respuesta con los datos actualizados
    res.json({
      msg: 'Servicio actualizado correctamente',
      service: updatedService
    })
  } catch (error) {
    console.log('Error al obtener el servicio', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    })
  }
}

const deleteService = async (req, res) => {
  const { id } = req.params;

  // Validar que sea un id de mongo
  if (validateObjectId(id, res)) {
    return;
  }

  try {
    const service = await Services.findById(id);

    if (!service) {
      return handleNotFoundError('El servicio no existe', res);
    }

    await service.deleteOne();

    res.json({
      msg: 'Servicio eliminado correctamente'
    })
  } catch (error) {
    console.log('Error al eliminar el servicio', error);
    res.status(500).json({
      msg: 'Error interno del servidor'
    })
  }
}



export {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService
}
