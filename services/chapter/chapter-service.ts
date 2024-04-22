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
}
