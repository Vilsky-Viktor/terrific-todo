import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todoRoutes';
import { connectDB } from './config/database';
import logger from './config/logger';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);

    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

connectDB();

export default app;
