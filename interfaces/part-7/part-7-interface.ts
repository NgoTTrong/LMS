import { IQuestion } from "../question/question-interface";

export interface IPart7 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part7Questions: IPart7Question[];
}

export interface IPart7Question {
	id: string;
	imageUrls: string[];
	part7Id: string;
	position: number;
	groupPart7Questions: IMappingPart7Question[];
}
export interface IMappingPart7Question {
	part7QuestionId: string;
	questionId: string;
	position?: number;
	question: IQuestion;
}
