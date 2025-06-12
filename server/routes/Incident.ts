import { Router} from 'express';
import { createIncident, deleteIncident, getIncidentById, getIncidents, updateIncident } from '../controllers/Incident';

const router = Router();

router.post('/', createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.put('/:id', updateIncident);
router.delete('/:id', deleteIncident);

export default router;
