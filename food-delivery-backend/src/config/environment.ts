import { cleanEnv, str } from "envalid";
import { config } from 'dotenv';

config({})

export const environment = cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production', 'staging'] }),
})

export type EnvType = typeof environment;