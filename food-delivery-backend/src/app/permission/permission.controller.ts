import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { Permission } from './../../config/permissions';

@controller('/permission')
export class PermissionController extends BaseHttpController{

    @httpGet('/')
	getPermissions(){
		return this.httpContext.response.json({permission: Permission});
	}
}