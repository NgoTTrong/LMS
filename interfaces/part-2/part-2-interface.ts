import { IQuestion } from "../question/question-interface";

export interface IPart2 {
	id: string;
	createdAt: Date;
	title?: string;
	thumbnail?: string;
	introduction?: string;
	creatorId?: string;
	numOfQuestions?: number;
	duration?: number;
	part2Questions: IPart2Question[];
}

export interface IPart2Question {
	id: string;
	audioUrl: string;
	questionId: string;
	part2Id: string;
	explainId: string;
	topicId: string;
	position: number;
	explain: {
		id: string;
		explain: string;
		answer: "A" | "B" | "C" | "D";
	};
	question: IQuestion;
}
