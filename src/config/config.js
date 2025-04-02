import { config } from 'dotenv';
import { PERSISTENCE } from '../common/constants/persistence.js';

config();

export const CONFIG= {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI,
    PERSISTENCE: process.env.PERSISTENCE || PERSISTENCE.MONGODB,
    MAIL: {
      USER: process.env.NODEMAILER_USER,
      PASSWORD: process.env.NODEMAILER_PASSWORD,
      HOST: process.env.NODEMAILER_HOST,
      PORT: process.env.NODEMAILER_PORT,
      FROM: process.env.NODEMAILER_FROM,
    },
}