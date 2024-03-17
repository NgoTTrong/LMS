import { IPart6, IPart6Question } from "@/interfaces/part-6/part-6-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part6Routes = {
	create: apiEndpoint + "/part6/create",
	getOne: apiEndpoint + "/part6",
	createQuestion: apiEndpoint + "/part6/create-question",
	updateQuestion: apiEndpoint + "/part6/update-question",
	deleteQuestion: apiEndpoint + "/part6/delete-question",
	deletePart6: apiEndpoint + "/part6"
};

export default class Part6Service {
	static createPart6 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart6>(part6Routes.create, {
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
	static deleteQuestion = async (part6QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part6Routes.deleteQuestion + "/" + part6QuestionId,
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
		part6Id: string,
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
		imageUrl?: string
	) => {
		try {
			const response = await RequestAPI.call(
				part6Routes.createQuestion + "/" + part6Id,
				{
					method: "POST",
					data: {
						part6Id,
						questions,
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
		part6QuestionId?: string,
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
	) => {
		try {
			const response = await RequestAPI.call<IPart6Question>(
				part6Routes.updateQuestion + "/" + part6QuestionId,
				{
					method: "PATCH",
					data: {
						questions,
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
	static getOne = async (part6Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart6>(
				part6Routes.getOne + "/" + part6Id,
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
	static getAllPart6 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart6[]>(
				part6Routes.getOne,
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

	static updatePart6 = async (
		part6Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part6Routes.getOne + "/" + part6Id,
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
		part6Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part6/" + part6Id + "/questions/reorder",
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

	static deletePart6 = async (part6Id: string)=>{
		try{
			const response = await RequestAPI.call(part6Routes.deletePart6 +"/"+part6Id,{
				method: "DELETE",
			})
			if(response?.data) return response?.data;
		}
		catch(error){}
		return null;
	}
}
