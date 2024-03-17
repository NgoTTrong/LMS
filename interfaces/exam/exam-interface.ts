export interface IExam {
	id: string;
	title: string;
	isPublished: boolean;
	thumbnail?: string;
	introduction?: string;
	categoryId: string;
	category: {
		name: string;
	}
	part1: {
		id: string;
		title: string;
	};
	part2: {
		id: string;
		title: string;
	};
	part3: {
		id: string;
		title: string;
	};

	part4: {
		id: string;
		title: string;
	};
	part5: {
		id: string;
		title: string;
	};
	part6: {
		id: string;
		title: string;
	};
	part7: {
		id: string;
		title: string;
	};
}

export interface IExamCategory {
	id: string;
	name: string;
	background?: string;
	color?: string;
}

export interface IExamDetail {
	title?: string;
	id: string;
	isPublished?: boolean;
	introduction?: string;
	categoryId?: string;
	thumbnail: string;
	part1?: Part1;
	part2?: Part2;
	part3?: Part3;
	part4?: Part4;
	part5?: Part5;
	part6?: Part6;
	part7?: Part7;
}

export interface Part1 {
	title?: string;
	id: string;
	part1Questions: Part1Question[];
}

export interface Part1Question {
	id: string;
	imageUrls: string[];
	audioUrl: string;
	questionId: string;
	part1Id: string;
	position: number;
	question: IExamQuestion;
}

export interface IExamQuestion {
	id: string;
	optionA: string;
	optionB: string;
	optionC: string;
	optionD?: string;
	content: string;
}

export interface Part2 {
	title: string;
	id: string;
	part2Questions: Part2Question[];
}

export interface Part2Question {
	id: string;
	createdAt: string;
	questionId: string;
	audioUrl: string;
	part2Id: string;
	position: number;
	question: IExamQuestion;
}

export interface Part3 {
	title: string;
	id: string;
	part3Questions: Part3Question[];
}

export interface Part3Question {
	id: string;
	createdAt: string;
	audioUrl: string;
	imageUrls: string[];
	part3Id: string;
	position: number;
	groupPart3Questions: GroupPart3Question[];
}

export interface GroupPart3Question {
	part3QuestionId: string;
	questionId: string;
	position: number;
	question: IExamQuestion;
}

export interface Part4 {
	title: string;
	id: string;
	part4Questions: Part4Question[];
}

export interface Part4Question {
	id: string;
	createdAt: string;
	audioUrl: string;
	imageUrls: string[];
	part4Id: string;
	position: number;
	groupPart4Questions: GroupPart4Question[];
}

export interface GroupPart4Question {
	part4QuestionId: string;
	questionId: string;
	position: number;
	question: IExamQuestion;
}

export interface Part5 {
	title: string;
	id: string;
	part5Questions: Part5Question[];
}

export interface Part5Question {
	id: string;
	createdAt: string;
	part5Id: string;
	questionId: string;
	position: number;
	question: IExamQuestion;
}

export interface Part6 {
	title: string;
	id: string;
	part6Questions: Part6Question[];
}

export interface Part6Question {
	id: string;
	createdAt: string;
	imageUrls: string[];
	part6Id: string;
	position: number;
	groupPart6Questions: GroupPart6Question[];
}

export interface GroupPart6Question {
	part6QuestionId: string;
	questionId: string;
	position: number;
	question: IExamQuestion;
}

export interface Part7 {
	title: string;
	id: string;
	part7Questions: Part7Question[];
}

export interface Part7Question {
	id: string;
	createdAt: string;
	imageUrls: string[];
	part7Id: string;
	position: number;
	groupPart7Questions: GroupPart7Question[];
}

export interface GroupPart7Question {
	part7QuestionId: string;
	questionId: string;
	position: number;
	question: IExamQuestion;
}
