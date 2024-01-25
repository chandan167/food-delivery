import { inject, injectable } from 'inversify';
import { UserService } from './user.service';
import { ServiceIdentifier } from '../../config/service-identifier';
import { UserRepo } from './user.repo';
import { User } from '../../models/user.model';

@injectable()
export class UserServiceImp implements UserService{
	constructor(
        @inject(ServiceIdentifier.UserRepo) private userRepo: UserRepo
	){}
    
	async create(user: User): Promise<User> {
		const newUser = await this.userRepo.create(user);
		return newUser;
	}
    
	async findById(id: string): Promise<User | null> {
		return await this.userRepo.findById(id);
	}
    
	async deleteById(id: string): Promise<User | null> {
		return await this.userRepo.deleteById(id);
	}
}