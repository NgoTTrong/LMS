export interface ICourse {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId?: string;
	title: string;
	description?: string;
	imageUrl?: string;
	price?: number;
	isPublished: boolean;
	categoryId?: string;
	attachments: IAttachment[];
	chapters: IChapter[];
	category?: ICategoryCourse;
}
export interface ICategoryCourse {
	id: string;
	name: string;
}

export interface IAttachment {
	id: string;
	name: string;
	url: string;
	courseId: number;
	createdAt: Date;
	updatedAt: Date;
}
export interface IChapter {
	id: string;
	title: string;
	isPublished: boolean;
	isFree: boolean;
	description?: string;
	videoUrl?: string;
	userProgress: {
		id: string;
		isCompleted: boolean;
	}[];
}
