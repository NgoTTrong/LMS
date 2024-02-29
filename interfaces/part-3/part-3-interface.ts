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
    imageUrls: string[];
    questionId: string;
    part3Id: string;
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
