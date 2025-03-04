
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("LINK", {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;