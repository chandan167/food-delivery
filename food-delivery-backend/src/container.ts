import { UserM, UserModel } from './models/user.model';
import {Container} from 'inversify';
import { EnvType, environment } from './config/environment';
import { ServiceIdentifier } from './config/service-identifier';
import { UserServiceImp } from './app/user/user.service.imp';
import { UserService } from './app/user/user.service';
import { UserRepo } from './app/user/user.repo';
import { UserRepoImp } from './app/user/user.repo.imp';
import { RoleServiceImp } from './app/role/role.service.imp';
import { RoleService } from './app/role/role.service';
import { RoleRepoImp } from './app/role/role.repo.imp';
import { RoleRepo } from './app/role/role.repo';
import { RoleM, RoleModel } from './models/role.model';

export const container = new Container();

// environment
container.bind<EnvType>(ServiceIdentifier.EnvType).toConstantValue(environment);
// user 
container.bind<UserService>(ServiceIdentifier.UserService).to(UserServiceImp);
container.bind<UserRepo>(ServiceIdentifier.UserRepo).to(UserRepoImp);
container.bind<UserM>(ServiceIdentifier.UserModel).toConstructor(UserModel);
// role
container.bind<RoleService>(ServiceIdentifier.RoleService).to(RoleServiceImp);
container.bind<RoleRepo>(ServiceIdentifier.RoleRepo).to(RoleRepoImp);
container.bind<RoleM>(ServiceIdentifier.RoleModel).toConstructor(RoleModel);
