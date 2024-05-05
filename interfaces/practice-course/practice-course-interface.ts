import { IChapter } from "../course/course-interface";

export interface IPracticeCourse {
	id: string;
	createdAt: Date;
	userId: string;
	name: string;
	thumbnail: string;
	point: number;
	progress: number;
	PracticeCourseChapter: IPracticeCourseChapter[];
}
export interface IPracticeCourseChapter {
	chapterId: string;
	practiceCourseId: string;
	createdAt: Date;
	chapter: IChapter;
}
