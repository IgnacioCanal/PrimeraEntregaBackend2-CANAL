import { mongodbDaos } from "./mongodb/index.js";
import { memoryDaos } from "./memory/index.js";
import { CONFIG } from "../config/config.js";
import { PERSISTENCE } from "../common/constants/persistence.js";

const daos = CONFIG.PERSISTENCE === PERSISTENCE.MONGODB ? mongodbDaos : memoryDaos;

export const { productDao, cartDao, userDao, ticketDao } = daos;