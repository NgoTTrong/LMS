import { IPart1, IPart1Question } from "@/interfaces/part-1/part-1-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part1Routes = {
	create: apiEndpoint + "/part1/create",
	getOne: apiEndpoint + "/part1",
	createQuestion: apiEndpoint + "/part1/create-question",
	updateQuestion: apiEndpoint + "/part1/update-question",
	deleteQuestion: apiEndpoint + "/part1/delete-question",
};

export default class Part1Service {
	static createPart1 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart1>(part1Routes.create, {
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
		part1Id: string,
		question: {
			content: string;
			optionA: string;
			optionB: string;
			optionC: string;
			optionD?: string;
			answer: "A" | "B" | "C" | "D";
			topicId: string;
			explain: string;
		},
		imageUrl: string,
		audioUrl: string
	) => {
		try {
			const response = await RequestAPI.call(
				part1Routes.createQuestion + "/" + part1Id,
				{
					method: "POST",
					data: {
						part1Id,
						question,
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
	static deleteQuestion = async (part1QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part1Routes.deleteQuestion + "/" + part1QuestionId,
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
	static updateQuestion = async (
		part1QuestionId?: string,
		question?: {
			id: string;
			content?: string;
			optionA?: string;
			optionB?: string;
			optionC?: string;
			optionD?: string;
			answer?: "A" | "B" | "C" | "D";
			explain?: string;
			topicId?: string;
		},

		imageUrl?: string,
		audioUrl?: string
	) => {
		try {
			const response = await RequestAPI.call<IPart1Question>(
				part1Routes.updateQuestion + "/" + part1QuestionId,
				{
					method: "PATCH",
					data: {
						question,
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
	static getOne = async (part1Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart1>(
				part1Routes.getOne + "/" + part1Id,
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
	static getAllPart1 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart1[]>(
				part1Routes.getOne,
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

	static updatePart1 = async (
		part1Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part1Routes.getOne + "/" + part1Id,
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
		part1Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part1/" + part1Id + "/questions/reorder",
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
