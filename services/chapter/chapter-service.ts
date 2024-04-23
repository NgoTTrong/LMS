import {
    IAttachment,
    IChapter,
    IChapterQuestion,
    ICourse,
} from "@/interfaces/course/course-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { IPayment } from "@/interfaces/payment/payment-interface";
import { IUserProgress } from "@/interfaces/user-progress/user-progress-interface";

const chapterRoutes = {
    getChapterById: apiEndpoint + "/chapter",
    getChapterDetailById: apiEndpoint + "/chapter/detail",
    addQuestion: apiEndpoint + "/chapter/add-question",
    deleteQuestion: apiEndpoint + "/chapter/delete-question",
    updateQuestion: apiEndpoint + "/chapter/update-question",
    reorderQuestions: apiEndpoint + "/chapter/reorder-questions",
    answerQuestion: apiEndpoint + "/chapter/answer-question",
};
export default class ChapterService {
    static getChapterDetailById = async (
        courseId: string,
        chapterId: string,
        userId: string
    ) => {
        try {
            const response = await RequestAPI.call<{
                chapter: IChapter;
                nextChapter: IChapter;
                attachments: IAttachment[];
                payment: IPayment;
                course: ICourse;
                userProgress: IUserProgress;
                questions: IChapterQuestion[];
            }>(chapterRoutes.getChapterDetailById, {
                method: "POST",
                data: {
                    courseId: courseId,
                    chapterId: chapterId,
                },
                headers: {
                    Authorization: userId,
                },
            });
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static getChapterById = async (chapterId: string) => {
        try {
            const response = await RequestAPI.call<IChapter>(
                chapterRoutes.getChapterById + "/" + chapterId,
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static updateChapterId = async (
        chapterId: string,
        updateData: {
            title?: string;
            description?: string;
            isFree?: boolean;
            videoUrl?: string;
            isPublished?: boolean;
        }
    ) => {
        try {
            const response = await RequestAPI.call<IChapter>(
                chapterRoutes.getChapterById + "/" + chapterId,
                {
                    method: "PATCH",
                    data: updateData,
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static deleteChapter = async (chapterId: string, courseId: string) => {
        try {
            const response = await RequestAPI.call<IChapter>(
                chapterRoutes.getChapterById +
                    "/" +
                    chapterId +
                    "/courses/" +
                    courseId,
                {
                    method: "DELETE",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static addQuestion = async (
        chapterId: string,
        questionInfo: {
            audioUrl?: string;
            imageUrl?: string;
            question: {
                content: string;
                optionA: string;
                optionB: string;
                optionC: string;
                optionD?: string;
                topicId?: string;
                explain?: string;
                answer?: string;
            };
        }
    ) => {
        try {
            const response = await RequestAPI.call<IChapterQuestion>(
                chapterRoutes.addQuestion + "/" + chapterId,
                {
                    method: "POST",
                    data: questionInfo,
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static deleteQuestion = async (questionId: string) => {
        try {
            const response = await RequestAPI.call<IChapterQuestion>(
                chapterRoutes.deleteQuestion + "/" + questionId,
                {
                    method: "DELETE",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static updateQuestion = async (
        questionId: string,
        updateInfo: {
            audioUrl?: string;
            imageUrl?: string;
            question?: {
                id: string;
                content?: string;
                optionA?: string;
                optionB?: string;
                optionC?: string;
                optionD?: string;
                topicId?: string;
                explain?: string;
                answer?: string;
            };
        }
    ) => {
        try {
            const response = await RequestAPI.call<IChapterQuestion>(
                chapterRoutes.updateQuestion + "/" + questionId,
                {
                    method: "PATCH",
                    data: updateInfo,
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static reorderQuestions = async (
        chapterId: string,
        updateData: { id: string; position: number }[]
    ) => {
        try {
            const response = await RequestAPI.call<IChapterQuestion>(
                chapterRoutes.reorderQuestions + "/" + chapterId,
                {
                    method: "POST",
                    data: { reorderData: updateData },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static answerQuestion = async (
        userId: string,
        chapterId: string,
        questionId: string,
        answer: string
    ) => {
        try {
            const response = await RequestAPI.call<IChapterQuestion>(
                chapterRoutes.answerQuestion + "/" + chapterId,
                {
                    method: "POST",
                    data: { questionId, answer },
                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
}
