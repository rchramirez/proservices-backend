//import dotenv from 'dotenv';

//dotenv.config();

//export const DB_HOST = process.env.DB_HOST || 'roundhouse.proxy.rlwy.net'
//export const DB_USER = process.env.DB_USER || 'root'
//export const DB_PASSWORD = process.env.DB_PASSWORD || 'cAHfaAdCF6HBBEh1cg2gadBAb55115B6'
//export const DB_NAME = process.env.DB_NAME || 'railway'
//export const DB_PORT = process.env.DB_PORT || 16698

import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

switch (process.env.NODE_ENV) {
    case "development":
        console.log("Environment is 'development'")
        configDotenv({
            path: resolve(__dirname, "../.env.development")
        })
        break
    case "test":
        configDotenv({
            path: resolve(__dirname, "../.env.test")
        })
        break
    // Add 'staging' and 'production' cases here as well!
    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}