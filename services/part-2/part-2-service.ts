import { IPart2, IPart2Question } from "@/interfaces/part-2/part-2-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part2Routes = {
	create: apiEndpoint + "/part2/create",
	getOne: apiEndpoint + "/part2",
	createQuestion: apiEndpoint + "/part2/create-question",
	updateQuestion: apiEndpoint + "/part2/update-question",
	deleteQuestion: apiEndpoint + "/part2/delete-question",
};

export default class Part2Service {
	static createPart2 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart2>(part2Routes.create, {
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
		part2Id: string,
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

		audioUrl: string
	) => {
		try {
			const response = await RequestAPI.call(
				part2Routes.createQuestion + "/" + part2Id,
				{
					method: "POST",
					data: {
						part2Id,
						question,
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
	static deleteQuestion = async (part2QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part2Routes.deleteQuestion + "/" + part2QuestionId,
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
		part2QuestionId?: string,
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

		audioUrl?: string
	) => {
		try {
			const response = await RequestAPI.call<IPart2Question>(
				part2Routes.updateQuestion + "/" + part2QuestionId,
				{
					method: "PATCH",
					data: {
						question,
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
	static getOne = async (part2Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart2>(
				part2Routes.getOne + "/" + part2Id,
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
	static getAllPart2 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart2[]>(
				part2Routes.getOne,
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

	static updatePart2 = async (
		part2Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part2Routes.getOne + "/" + part2Id,
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
		part2Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part2/" + part2Id + "/questions/reorder",
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
