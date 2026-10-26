import { Router } from 'express';
import {
  deleteCommentController,
  updateCommentController,
} from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);
router.patch('/:id', updateCommentController);
router.delete('/:id', deleteCommentController);

export default router;
