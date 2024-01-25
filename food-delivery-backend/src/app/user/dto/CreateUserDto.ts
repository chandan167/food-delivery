/* eslint-disable no-mixed-spaces-and-tabs */
import {IsEmail, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    	name!: string;
    
   
    @IsEmail()
    @IsNotEmpty()
    	email!:string;

    @IsOptional()
    	phone!:string;

    @IsNotEmpty()
    	password!: string;
}