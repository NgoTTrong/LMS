import { IQuestion } from "../question/question-interface";

export interface IPart5 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part5Questions: IPart5Question[];
}

export interface IPart5Question {
	id: string;
	questionId: string;
	part5Id: string;
	position: number;
	question: IQuestion;
}
