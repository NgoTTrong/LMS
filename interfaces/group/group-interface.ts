import { IUser } from "../user/user-interface";

export interface IGroup {
	id: string;
	createdAt: Date;
	creatorId: string;
	image: string;
	title: string;
	description: string;
	password: string;
	isPublic: boolean;
	creator: IUser;
}
