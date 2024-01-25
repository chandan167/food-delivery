import { inject, injectable } from 'inversify';
import { Role } from '../../models/role.model';
import { RoleService } from './role.service';
import { ServiceIdentifier } from '../../config/service-identifier';
import { RoleRepo } from './role.repo';
import { Permission } from '../../config/permissions';

@injectable()
export class RoleServiceImp implements RoleService{
	constructor(
        @inject(ServiceIdentifier.RoleRepo) private roleRepo: RoleRepo
	){}
	async findAll(): Promise<Role[]> {
		return await this.roleRepo.findAll();
	}
	async create(role: Role): Promise<Role> {
		const permissions: string[] = Object.values(Permission);
		role.permissions = role.permissions?.filter(permission => permissions.includes(permission)) || [];
		return await this.roleRepo.create(role);
	}
	async findById(id: string): Promise<Role | null> {
		return await this.roleRepo.findById(id);
	}
	async deleteById(id: string): Promise<Role | null> {
		return await this.roleRepo.deleteById(id);
	}
    
}