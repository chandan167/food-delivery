import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import {UnprocessableEntity} from 'http-errors';

export class Helper{
	static validateMongoObjectId(id:string){
		if(!mongoose.Types.ObjectId.isValid(id)){
			throw new UnprocessableEntity(`Invalid id : ${id}`);
		}
	}

	static async hashPassword(password:string){
		const salt = await bcrypt.genSalt();
		return await bcrypt.hash(password, salt);
	}
}