import { Document, Schema, model, Model } from 'mongoose';
import { RoleModel } from './role.model';


export interface User extends Document{
    name: string;
    email: string;
    phone: string|null;
    avatar: string|null
    password: string;
    roleId: Schema.Types.ObjectId;
    permissions: Array<string>;
    createdAt: Date;
    updatedAt: Date
}

const userSchema = new Schema<User>({
	name: {type: String, required: true, lowercase: true, trim: true},
	email: {type: String, required: true, unique: true,lowercase: true, trim: true},
	phone: {type: String, default: null},
	avatar: {type: String, default: null},
	password: {type: String, required: true},
	roleId : {type: Schema.Types.ObjectId, ref: RoleModel.name, required: true, default: null},
	permissions: [{type: String, required: true, default: null, lowercase: true, trim: true}]
}, {
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			delete ret.password;
			ret.id = ret._id;
			return ret;
		},
	}
});

export const UserModel = model<User>('User', userSchema);
export type UserM = Model<User>;