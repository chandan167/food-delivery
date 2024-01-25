import { Document, Types, Schema, model, Model } from 'mongoose';


export interface Role extends Document{
    name: string;
    permissions: Array<string>;
    createdAt: Date;
    updatedAt: Date
}

const roleSchema = new Schema<Role>({
	name: {type: String, required: true, unique: true, lowercase: true, trim: true},
	permissions: [{type: String, required: true, default: null, lowercase: true, trim: true}]
}, {
	timestamps: true,
	toJSON: {
		transform(doc, ret, options) {
			ret.id = ret._id;
			return ret;
		},
	}
});

export const RoleModel = model<Role>('Role', roleSchema);
export type RoleM = Model<Role>;