// src/routes/criminalRecord.ts
import { Router } from 'express';
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from '../controllers/CriminalRecord';
import { upload } from '../middlewares/fileUpload';

const router = Router();

router.post('/',   upload.single('photo'), createRecord);
router.get('/', getAllRecords);
router.get('/:id', getRecordById);
router.put('/:id',   upload.single('photo'), updateRecord);
router.delete('/:id', deleteRecord);

export default router;