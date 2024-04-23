export interface IUserProgress {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isCompleted: boolean;
    chapterId: string;
    userId: string;
    answers: { questionId: string; answer: string }[];
}
