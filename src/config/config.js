import { config } from 'dotenv';

config();

export const CONFIG= {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI
}