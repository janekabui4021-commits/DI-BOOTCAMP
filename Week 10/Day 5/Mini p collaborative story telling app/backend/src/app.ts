import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import contributorRoutes from './routes/contributorRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

if (env.isProduction) app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '128kb' }));
app.use(cookieParser());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/contributors', contributorRoutes);
app.use('/api/comments', commentRoutes);
app.use((_request, response) => {
  response.status(404).json({ message: 'Endpoint not found.' });
});
app.use(errorHandler);
