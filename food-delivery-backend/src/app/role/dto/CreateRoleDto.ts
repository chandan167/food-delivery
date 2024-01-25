import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto{
    @IsNotEmpty()
    	name!:string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    	permissions: string[] = [];
}