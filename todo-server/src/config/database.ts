import mongoose from 'mongoose';
import logger from './logger';
import config from './settings';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongo_uri as string);
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};