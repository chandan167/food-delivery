import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import express, { Application, NextFunction, Request, Response } from 'express';
import {NotFound, HttpError} from 'http-errors';
import { container } from './container';
import morgan from 'morgan';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

// declare metadata by @controller annotation
import './app/user/user.controller'

const app:Application = express()

let server = new InversifyExpressServer(container, null, {rootPath: '/api/v1'}, app);

server.setConfig((app:Application) =>{
    app.use(morgan('dev'))
})

server.setErrorConfig((app:Application) =>{
    app.use((req:Request, res:Response, next:NextFunction) =>{
        next(new NotFound('Route not found'))
    })
    app.use((error:any, req:Request, res:Response, next:NextFunction) => {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        if(error instanceof HttpError){
            return res.status(status).json({message: message})
        }
    })
})

const application  = server.build();

application.listen(3000, () => {
    console.log('Server is running on port 3000')
})