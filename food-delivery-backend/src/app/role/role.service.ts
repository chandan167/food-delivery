import { Role } from '../../models/role.model';

export interface RoleService{
    create(role:Role): Promise<Role>
    findById(id:string): Promise<Role |null>
    deleteById(id:string): Promise<Role |null>
    findAll(): Promise<Role[]>
    
}