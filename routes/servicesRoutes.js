import { Router } from 'express';
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from '../controllers/services.controller.js';

const router =  Router();

// router.post('/', createService)
// router.get('/', getServices)
// router.get('/:id', getServiceById)
// router.put('/:id', updateService)
// router.delete('/:id', deleteService)

// Agrupar rutas
router.route('/')
  .post(createService)
  .get(getServices)

router.route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService)


export default router
