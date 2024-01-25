import { inject, injectable } from 'inversify';
import { Role } from '../../models/role.model';
import { RoleService } from './role.service';
import { ServiceIdentifier } from '../../config/service-identifier';
import { RoleRepo } from './role.repo';

@injectable()
export class RoleServiceImp implements RoleService{
	constructor(
        @inject(ServiceIdentifier.RoleRepo) private roleRepo: RoleRepo
	){}
	async create(role: Role): Promise<Role> {
		return await this.roleRepo.create(role);
	}
	async findById(id: string): Promise<Role | null> {
		return await this.roleRepo.findById(id);
	}
	async deleteById(id: string): Promise<Role | null> {
		return await this.roleRepo.deleteById(id);
	}
    
}