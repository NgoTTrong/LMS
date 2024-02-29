import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { IPart3, IPart3Question } from "@/interfaces/part-3/part-3-interface";

const part3Routes = {
    create: apiEndpoint + "/part3/create",
    getOne: apiEndpoint + "/part3",
    createQuestion: apiEndpoint + "/part3/create-question",
    updateQuestion: apiEndpoint + "/part3/update-question",
};

export default class Part3Service {
    static createPart3 = async (title: string, userId: string) => {
        try {
            const response = await RequestAPI.call<IPart3>(part3Routes.create, {
                method: "POST",
                headers: {
                    Authorization: userId,
                },
                data: {
                    title: title,
                },
            });
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static createQuestion = async (
        part3Id: string,
        question: {
            content: string;
            optionA: string;
            optionB: string;
            optionC: string;
            optionD?: string;
        },
        correctAnswer: "A" | "B" | "C" | "D",
        topicId: string,
        explaination: string,
        imageUrl: string,
        audioUrl: string
    ) => {
        try {
            const response = await RequestAPI.call(
                part3Routes.createQuestion + "/" + part3Id,
                {
                    method: "POST",
                    data: {
                        part3Id,
                        question,
                        correctAnswer,
                        topicId,
                        explaination,
                        imageUrl,
                        audioUrl,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static updateQuestion = async (
        part3QuestionId?: string,
        question?: {
            id: string;
            content?: string;
            optionA?: string;
            optionB?: string;
            optionC?: string;
            optionD?: string;
        },
        explain?: {
            id: string;
            correctAnswer?: "A" | "B" | "C" | "D";
            explaination?: string;
        },
        topicId?: string,
        imageUrl?: string,
        audioUrl?: string
    ) => {
        try {
            const response = await RequestAPI.call<IPart3Question>(
                part3Routes.updateQuestion + "/" + part3QuestionId,
                {
                    method: "PATCH",
                    data: {
                        question,
                        explain,
                        topicId,
                        imageUrl,
                        audioUrl,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static getOne = async (part3Id: string, userId: string) => {
        try {
            const response = await RequestAPI.call<IPart3>(
                part3Routes.getOne + "/" + part3Id,
                {
                    method: "GET",
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
    static getAllPart3 = async (userId: string) => {
        try {
            const response = await RequestAPI.call<IPart3[]>(
                part3Routes.getOne,
                {
                    method: "GET",
                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };

    static updatePart3 = async (
        part3Id: string,
        updateData: {
            title?: string;
            introduction?: string;
            thumbnail?: string;
        }
    ) => {
        try {
            const response = await RequestAPI.call(
                part3Routes.getOne + "/" + part3Id,
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
    static reorderQuestions = async (
        part3Id: string,
        updateData: { id: string; position: number }[]
    ) => {
        try {
            const response = await RequestAPI.call(
                apiEndpoint + "/part3/" + part3Id + "/questions/reorder",
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
}
