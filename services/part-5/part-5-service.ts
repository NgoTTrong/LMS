import { IPart5, IPart5Question } from "@/interfaces/part-5/part-5-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part5Routes = {
	create: apiEndpoint + "/part5/create",
	getOne: apiEndpoint + "/part5",
	createQuestion: apiEndpoint + "/part5/create-question",
	updateQuestion: apiEndpoint + "/part5/update-question",
	deleteQuestion: apiEndpoint + "/part5/delete-question",
	deletePart5: apiEndpoint + "/part5"
};

export default class Part5Service {
	static createPart5 = async (title: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart5>(part5Routes.create, {
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
		part5Id: string,
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
	) => {
		try {
			const response = await RequestAPI.call(
				part5Routes.createQuestion + "/" + part5Id,
				{
					method: "POST",
					data: {
						part5Id,
						question,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static deleteQuestion = async (part5QuestionId: string) => {
		try {
			const response = await RequestAPI.call<string>(
				part5Routes.deleteQuestion + "/" + part5QuestionId,
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
		part5QuestionId?: string,
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

	) => {
		try {
			const response = await RequestAPI.call<IPart5Question>(
				part5Routes.updateQuestion + "/" + part5QuestionId,
				{
					method: "PATCH",
					data: {
						question,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static getOne = async (part5Id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPart5>(
				part5Routes.getOne + "/" + part5Id,
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
	static getAllPart5 = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IPart5[]>(
				part5Routes.getOne,
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

	static updatePart5 = async (
		part5Id: string,
		updateData: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(
				part5Routes.getOne + "/" + part5Id,
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
		part5Id: string,
		updateData: { id: string; position: number }[]
	) => {
		try {
			const response = await RequestAPI.call(
				apiEndpoint + "/part5/" + part5Id + "/questions/reorder",
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


	static deletePart5 = async (part5Id: string)=>{
		try{
			const response = await RequestAPI.call(part5Routes.deletePart5 +"/"+part5Id,{
				method: "DELETE",
			})
			if(response?.data) return response?.data;
		}
		catch(error){}
		return null;
	}
}
