import { IQuestion } from "../question/question-interface";

export interface IPart6 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part6Questions: IPart6Question[];
}

export interface IPart6Question {
	id: string;
	imageUrls: string[];
	part6Id: string;
	position: number;
	groupPart6Questions: IMappingPart6Question[];
}
export interface IMappingPart6Question {
	part6QuestionId: string;
	questionId: string;
	position?: number;
	question: IQuestion;
}
