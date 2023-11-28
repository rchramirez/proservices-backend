import * as dotenv from 'dotenv';

// Configuramos las variables de ambiente
dotenv.config();

export const PORT = process.env.PORT || 3300
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'proservicesdb'
export const DB_PORT = process.env.DB_PORT || 3306