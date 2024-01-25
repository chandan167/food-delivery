import { dbConnected } from './config/database';
import { environment } from './config/environment';
import { application } from './server';
import {debug} from './utils/debugger';

const log = debug.extend('server:index');

application.listen(environment.PORT, () => {
	dbConnected();
	log('Server is running on port %d', environment.PORT);
	console.log(`Server is running on port : ${environment.PORT}`);
});