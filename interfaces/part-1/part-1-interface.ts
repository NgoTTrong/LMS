import { IQuestion } from "../question/question-interface";

export interface IPart1 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part1Questions: IPart1Question[];
}

export interface IPart1Question {
	id: string;
	audioUrl: string;
	imageUrls: string[];
	questionId: string;
	part1Id: string;
	position: number;
	question: IQuestion;
}
