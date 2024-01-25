import { NextFunction, Request, Response } from 'express';
import { ValidationError, validateOrReject} from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UnprocessableEntity } from 'http-errors';

export enum HttpRequest{
    Body='body',
    Query='query',
    Params='params',
}

export function validation(classRef:any, httpRequest: HttpRequest ) {
	return async (req:Request, res:Response, next:NextFunction) => {
		const obj = plainToClass(classRef, req[httpRequest]);
		try{
			await validateOrReject(obj, {
				stopAtFirstError: true
			});
			next();
		}catch(errors:Array<ValidationError>|any){
			const message:string = Object.values(errors[0].constraints || {})[0] as string;
			next(new UnprocessableEntity(message));
		}
	};
}


