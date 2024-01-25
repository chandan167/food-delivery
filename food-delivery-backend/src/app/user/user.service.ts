import { User } from '../../models/user.model';

export interface UserService{
    create(user:User): Promise<User>
    findById(id:string): Promise<User |null>
    deleteById(id:string): Promise<User |null>
    
}