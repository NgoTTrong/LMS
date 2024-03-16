import { IFlashcard } from "@/interfaces/flashcard/flashcard-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const flashcardRoutes = {
    getAll: apiEndpoint + "/flashcard",
    create: apiEndpoint + "/flashcard/create",
    getOne: apiEndpoint + "/flashcard",
    createWord: apiEndpoint + "/flashcard/create-word",
    update: apiEndpoint + "/flashcard",
    delete: apiEndpoint + "/flashcard",
};

export default class FlashcardService {
    static createFlashcard = async (
        title: string,
        description: string,
        userId: string
    ) => {
        try {
            const response = await RequestAPI.call<IFlashcard>(
                flashcardRoutes.create,
                {
                    method: "POST",
                    headers: {
                        Authorization: userId,
                    },
                    data: {
                        title: title,
                        description: description,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static createWord = async (
        term: string,
        define: string,
        flashcardId: string
    ) => {
        try {
            const response = await RequestAPI.call<IFlashcard>(
                flashcardRoutes.createWord + "/" + flashcardId,
                {
                    method: "POST",
                    data: {
                        term,
                        define,
                    },
                }
            );

            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static updateFlashcard = async (
        title: string,
        description: string,
        flashCardId: string
    ) => {
        try {
            const response = await RequestAPI.call<IFlashcard>(
                flashcardRoutes.update + "/" + flashCardId,
                {
                    method: "PUT",
                    data: {
                        title,
                        description,
                    },
                }
            );

            if (response?.data) return response?.data;
        } catch (error) {}
        return null;
    };

    static getAllFlashcard = async (userId: string) => {
        try {
            
            const response = await RequestAPI.call<IFlashcard[]>(
                flashcardRoutes.getAll,
                {
                    method: "GET",
                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) return response?.data;
        } catch (error) {}
        return null;
    };

    static getOneFlashcard = async (flashCardId: string) => {
        try {
            const response = await RequestAPI.call<IFlashcard>(
                flashcardRoutes.getOne + "/" + flashCardId,
                {
                    method: "GET",
                }
            );

            if (response?.data) return response?.data;
        } catch (error) {}
        return null;
    };

    static deleteFlashcard = async (userId: string, flashCardId: string) => {
        try {
            const response = await RequestAPI.call(
                flashcardRoutes.delete + "/" + flashCardId,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: userId,
                    },
                }
            );
        } catch (error) {}
        return null;
    };
}
