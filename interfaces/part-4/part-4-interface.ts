import { IQuestion } from "../question/question-interface";

export interface IPart4 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	audioUrl?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part4Questions: IPart4Question[];
}

export interface IPart4Question {
	id: string;
	audioUrl: string;
	imageUrls: string[];
	part4Id: string;
	position: number;
	groupPart4Questions: IMappingPart4Question[];
}
export interface IMappingPart4Question {
	part4QuestionId: string;
	questionId: string;
	position?: number;
	question: IQuestion;
}
