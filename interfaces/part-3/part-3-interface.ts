import { IQuestion } from "../question/question-interface";

export interface IPart3 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part3Questions: IPart3Question[];
}

export interface IPart3Question {
	id: string;
	audioUrl: string;
	questionId: string;
	part3Id: string;
	position: number;
	groupPart3Questions: IQuestion[];
}
