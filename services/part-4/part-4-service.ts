import { IPart4, IPart4Question } from "@/interfaces/part-4/part-4-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part4Routes = {
	create: apiEndpoint + "/part4/create",
	getOne: apiEndpoint + "/part4",
	createQuestion: apiEndpoint + "/part4/create-question",
	updateQuestion: apiEndpoint + "/part4/update-question",
	deleteQuestion: apiEndpoint + "/part4/delete-question",
};

export default class Part4Service {
	static createPart4 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart4>(part4Routes.create, {
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
	static deleteQuestion = async (part4QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part4Routes.deleteQuestion + "/" + part4QuestionId,
				{
					method: "Delete",
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static createQuestion = async (
		part4Id: string,
		questions: {
			content: string;
			optionA: string;
			optionB: string;
			optionC: string;
			optionD?: string;
			answer: "A" | "B" | "C" | "D";
			topicId: string;
			explain: string;
		}[],
		audioUrl: string,
		imageUrl?: string
	) => {
		try {
			const response = await RequestAPI.call(
				part4Routes.createQuestion + "/" + part4Id,
				{
					method: "POST",
					data: {
						part4Id,
						questions,
						audioUrl,
						imageUrl,
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
		part4QuestionId?: string,
		questions?: {
			id: string;
			content?: string;
			optionA?: string;
			optionB?: string;
			optionC?: string;
			optionD?: string;
			answer?: "A" | "B" | "C" | "D";
			explain?: string;
			topicId?: string;
		}[],
		imageUrl?: string,
		audioUrl?: string
	) => {
		try {
			const response = await RequestAPI.call<IPart4Question>(
				part4Routes.updateQuestion + "/" + part4QuestionId,
				{
					method: "PATCH",
					data: {
						questions,
						audioUrl,
						imageUrl,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static getOne = async (part4Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart4>(
				part4Routes.getOne + "/" + part4Id,
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
	static getAllPart4 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart4[]>(
				part4Routes.getOne,
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

	static updatePart4 = async (
		part4Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part4Routes.getOne + "/" + part4Id,
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
		part4Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part4/" + part4Id + "/questions/reorder",
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
