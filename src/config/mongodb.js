
import mongoose from 'mongoose';
import { CONFIG } from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URI, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        setTimeout(connectDB, 8080);
    }
};

export default connectDB;