import { inject, injectable } from 'inversify';
import {Conflict} from 'http-errors';
import { Role, RoleM } from '../../models/role.model';
import { RoleRepo } from './role.repo';
import { ServiceIdentifier } from '../../config/service-identifier';
import { Helper } from '../../utils/helper';

@injectable()
export class RoleRepoImp implements RoleRepo{
	constructor(
        @inject(ServiceIdentifier.RoleModel) private roleModel: RoleM
	){}
	async findAll(): Promise<Role[]> {
		return await this.roleModel.find();
	}
	async create(role: Role): Promise<Role> {
		const roleExist = await this.roleModel.findOne({name: role.name});
		if(roleExist) throw new Conflict('role is already exist');
		role.permissions = [...new Set(role.permissions)];
		return await this.roleModel.create(role);
	}
	async findById(id: string): Promise<Role | null> {
		Helper.validateMongoObjectId(id);
		return await this.roleModel.findById(id);
	}
	async deleteById(id: string): Promise<Role | null> {
		Helper.validateMongoObjectId(id);
		return await this.roleModel.findByIdAndDelete(id);
	}

}