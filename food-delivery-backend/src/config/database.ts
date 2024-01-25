import * as mongoose from 'mongoose';
import {debug} from '../utils/debugger';
import { environment } from './environment';

const Log = debug.extend('database');

export const dbConnected = () => {
	mongoose.connect(environment.MONGO_URI).then(() => {
		Log('Database connected');
	}).catch(error => {
		Log(error);
		setTimeout(() => {
			dbConnected();
		}, 10 * 1000);
	});
};