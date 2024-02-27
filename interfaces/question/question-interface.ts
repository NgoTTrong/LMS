export interface IQuestion {
	id: string;
	createdAt?: Date;
	content: string;
	optionA: string;
	optionB: string;
	optionC: string;
	optionD?: string;
	topicId?: string;
	answer: "A" | "B" | "C" | "D";
	topic?: ITopic;
	explain?: string;
}

export interface ITopic {
	id: string;
	name: string;
}
