import 'reflect-metadata';
import {InversifyExpressServer, getRouteInfo} from 'inversify-express-utils';
import express, { Application, NextFunction, Request, Response } from 'express';
import {NotFound, HttpError} from 'http-errors';
import * as prettyjson from 'prettyjson';
import morgan from 'morgan';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { container } from './container';
import {debug} from './utils/debugger';
import { environment } from './config/environment';
const log = debug.extend('server');

// declare metadata by @controller annotation
import './app/user/user.controller';
import './app/permission/permission.controller';
import './app/role/role.controller';



const app:Application = express();

const server = new InversifyExpressServer(container, null, {rootPath: '/api/v1'}, app);

server.setConfig((app:Application) =>{
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(morgan('dev'));
});

server.setErrorConfig((app:Application) =>{
	app.use((req:Request, res:Response, next:NextFunction) =>{
		next(new NotFound('Route not found'));
	});
	app.use((error:any, req:Request, res:Response, next:NextFunction) => {
		const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
		const message = error.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
		if(error instanceof HttpError){
			return res.status(status).json({message: message});
		}

		if(!environment.isProduction){
			return res.status(status).json({message: message, stack: error.stack});
		}
		log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)});
	});
});

export const application  = server.build();
const routeInfo = getRouteInfo(container);

log(prettyjson.render({ routes: routeInfo }));