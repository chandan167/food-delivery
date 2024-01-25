import { User } from '../../models/user.model';


export interface UserRepo{
    create(user: User): Promise<User>;
    findById(id: string): Promise<User|null>;
    findByEmail(email: string): Promise<User|null>;
    findByPhone(phone: string): Promise<User|null>;
    deleteById(id: string): Promise<User|null>;
}