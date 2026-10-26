import { Router } from 'express';
import {
  addContributorController,
  deleteContributorController,
  listContributorsController,
} from '../controllers/contributorController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);
router.post('/', addContributorController);
router.get('/:story_id', listContributorsController);
router.delete('/:id', deleteContributorController);

export default router;
