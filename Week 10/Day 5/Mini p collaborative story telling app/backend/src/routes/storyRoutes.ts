import { Router } from 'express';
import {
  createStoryController,
  deleteStoryController,
  listStories,
  updateStoryController,
} from '../controllers/storyController.js';
import {
  createCommentController,
  listCommentsController,
} from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);
router.get('/', listStories);
router.post('/', createStoryController);
router.get('/:storyId/comments', listCommentsController);
router.post('/:storyId/comments', createCommentController);
router.patch('/:id', updateStoryController);
router.delete('/:id', deleteStoryController);

export default router;
