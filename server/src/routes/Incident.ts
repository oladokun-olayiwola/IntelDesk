import { Router} from 'express';
import { createIncident, deleteIncident, getSingleIncident, getAllIncidents, updateIncident } from '../controllers/Incident';

const router = Router();

router.post('/', createIncident);
router.get('/', getAllIncidents);
router.get('/:id', getSingleIncident);
router.put('/:id', updateIncident);
router.delete('/:id', deleteIncident);

export default router;
