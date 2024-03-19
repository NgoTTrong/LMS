import { IPart7, IPart7Question } from "@/interfaces/part-7/part-7-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part7Routes = {
	create: apiEndpoint + "/part7/create",
	getOne: apiEndpoint + "/part7",
	createQuestion: apiEndpoint + "/part7/create-question",
	updateQuestion: apiEndpoint + "/part7/update-question",
	deleteQuestion: apiEndpoint + "/part7/delete-question",
	deletePart7: apiEndpoint + "/part7"
};

export default class Part7Service {
	static createPart7 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart7>(part7Routes.create, {
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
	static deleteQuestion = async (part7QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part7Routes.deleteQuestion + "/" + part7QuestionId,
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
		part7Id: string,
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
				part7Routes.createQuestion + "/" + part7Id,
				{
					method: "POST",
					data: {
						part7Id,
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
		part7QuestionId?: string,
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
			const response = await RequestAPI.call<IPart7Question>(
				part7Routes.updateQuestion + "/" + part7QuestionId,
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
	static getOne = async (part7Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart7>(
				part7Routes.getOne + "/" + part7Id,
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
	static getAllPart7 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart7[]>(
				part7Routes.getOne,
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

	static updatePart7 = async (
		part7Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part7Routes.getOne + "/" + part7Id,
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
		part7Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part7/" + part7Id + "/questions/reorder",
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
	

	static deletePart7 = async (part7Id: string)=>{
		try{
			const response = await RequestAPI.call(part7Routes.deletePart7 +"/"+part7Id,{
				method: "DELETE",
			})
			if(response?.data) return response?.data;
		}
		catch(error){}
		return null;
	}
}
