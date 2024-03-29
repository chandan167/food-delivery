import { NotFound } from 'http-errors';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { ServiceIdentifier } from '../../config/service-identifier';
import { RoleService } from './role.service';
import { Role } from '../../models/role.model';
import { StatusCodes } from 'http-status-codes';
import { HttpRequest, validation } from '../../decorator/validation';
import { CreateRoleDto } from './dto/CreateRoleDto';


@controller('/role')
export class RoleController extends BaseHttpController{

	constructor(
        @inject(ServiceIdentifier.RoleService) private roleService: RoleService
	){
		super();
	}
    @httpPost('/', validation(CreateRoleDto, HttpRequest.Body))
	async createRole(){
		const body = this.httpContext.request.body as Role;
		const role = await this.roleService.create(body);
		return this.httpContext.response.status(StatusCodes.CREATED).json({role});
	}

    @httpGet('/:id')
    async getRoleById(){
    	const {id} = this.httpContext.request.params;
    	const role = await this.roleService.findById(id);
    	if(!role) throw new NotFound('role not found');
    	return this.httpContext.response.json({role});
    }

    @httpGet('/')
    async getRoles(){
    	const roles = await this.roleService.findAll();
    	return this.httpContext.response.json({roles});
    }

    @httpDelete('/:id')
    async deleteRole(){
    	const {id} = this.httpContext.request.params;
    	const role = await this.roleService.deleteById(id);
    	if(!role) throw new NotFound('role not found');
    	return this.httpContext.response.json({role});
    }
}