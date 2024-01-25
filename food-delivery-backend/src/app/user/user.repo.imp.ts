import { inject, injectable } from 'inversify';
import { Conflict } from 'http-errors';
import { User, UserM } from '../../models/user.model';
import { UserRepo } from './user.repo';
import { ServiceIdentifier } from '../../config/service-identifier';
import { Helper } from '../../utils/helper';

@injectable()
export class UserRepoImp implements UserRepo{
	constructor(
        @inject(ServiceIdentifier.UserModel) private userModel: UserM
	){}
    
	async create(user: User): Promise<User> {
		const userExist = await this.findByEmail(user.email);
		if(userExist) throw new Conflict('email is already used');
		if(user.phone){
			const userExist = await this.findByPhone(user.phone);
			if(userExist) throw new Conflict('phone is already used');
		}
		user.password = await Helper.hashPassword(user.password);
		const newUser = await this.userModel.create(user);
		return newUser;
	}

	async findById(id: string): Promise<User | null> {
		Helper.validateMongoObjectId(id);
		return await this.userModel.findById(id);
	}
    
	async findByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({email});
	}

	async findByPhone(phone: string): Promise<User | null> {
		return this.userModel.findOne({phone});
	}

	async deleteById(id: string): Promise<User | null> {
		Helper.validateMongoObjectId(id);
		return await this.userModel.findByIdAndDelete(id);
	}
}