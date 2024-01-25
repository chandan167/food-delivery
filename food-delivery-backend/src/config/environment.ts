import { cleanEnv, num, str } from 'envalid';
import { config } from 'dotenv';

config({});

export const environment = cleanEnv(process.env, {
	NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production', 'staging'] }),
	PORT: num({default: 3000}),
	MONGO_URI: str({default: 'mongodb://127.0.0.1:27017/food_delivery_development'})
});

export type EnvType = typeof environment;