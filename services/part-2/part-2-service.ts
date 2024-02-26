import { IPart2, IPart2Question } from "@/interfaces/part-2/part-2-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part2Routes = {
	create: apiEndpoint + "/part2/create",
	getOne: apiEndpoint + "/part2",
	createQuestion: apiEndpoint + "/part2/create-question",
	updateQuestion: apiEndpoint + "/part2/update-question",
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
		},
		correctAnswer: "A" | "B" | "C" | "D",
		topicId: string,
		explaination: string,
		imageUrl: string,
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
		part2QuestionId?: string,
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
			const response = await RequestAPI.call<IPart2Question>(
				part2Routes.updateQuestion + "/" + part2QuestionId,
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
