import { BaseHttpController, controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import {NotFound} from 'http-errors';
import { UserService } from './user.service';
import { inject } from 'inversify';
import { ServiceIdentifier } from '../../config/service-identifier';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/user.model';
import { HttpRequest, validation } from '../../decorator/validation';
import { CreateUserDto } from './dto/CreateUserDto';

@controller('/user')
export class UserController extends BaseHttpController{

	constructor(
        @inject(ServiceIdentifier.UserService) private userService: UserService
	){
		super();
	}

    @httpPost('/', validation(CreateUserDto, HttpRequest.Body))
	async createHandler(){
		const {roleId, ...rest} = this.httpContext.request.body as CreateUserDto ;

		const user = await this.userService.create({...rest, role:roleId} as any);
		return this.httpContext.response.status(StatusCodes.CREATED).json({user});
	}

    @httpGet('/:id')
    async getByIdHandler(){
    	const {id} = this.httpContext.request.params;
    	const user = await this.userService.findById(id);
    	if(!user) throw new NotFound('user not found');
    	return this.httpContext.response.json({user});
    }

	@httpDelete('/:id')
    async deleteByIdHandler(){
    	const {id} = this.httpContext.request.params;
    	const user = await this.userService.deleteById(id);
    	if(!user) throw new NotFound('user not found');
    	return this.httpContext.response.json({user});
    }
}