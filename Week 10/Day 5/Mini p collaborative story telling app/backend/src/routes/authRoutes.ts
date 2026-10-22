import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { login, logout, refresh, register } from '../controllers/authController.js';
import { requireTrustedOrigin } from '../middleware/requireTrustedOrigin.js';

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts. Please try again later.' },
});

router.use(requireTrustedOrigin);
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', authLimiter, refresh);
router.post('/logout', logout);

export default router;
