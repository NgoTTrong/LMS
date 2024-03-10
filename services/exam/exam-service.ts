import {
	IExam,
	IExamCategory,
	IExamDetail,
} from "@/interfaces/exam/exam-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const examRoutes = {
	getAll: apiEndpoint + "/exam",
	getExamDetail: apiEndpoint + "/exam/detail",
	getAllCategories: apiEndpoint + "/exam-category",
};

export default class ExamService {
	static createExam = async (
		title: string,
		categoryId: string,
		userId: string
	) => {
		try {
			const response = await RequestAPI.call<IExam>(examRoutes.getAll, {
				method: "POST",
				data: {
					title,
					categoryId,
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
	static getAll = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IExam[]>(examRoutes.getAll, {
				method: "GET",
				headers: {
					Authorization: userId,
				},
			});
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return [];
	};

	static getAllCategory = async () => {
		try {
			const response = await RequestAPI.call<IExamCategory[]>(
				examRoutes.getAllCategories,
				{
					method: "GET",
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return [];
	};

	static getExamById = async (examId: string) => {
		try {
			const response = await RequestAPI.call<IExam>(
				examRoutes.getAll + "/" + examId,
				{ method: "GET" }
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static getExamDetailById = async (examId: string) => {
		try {
			const response = await RequestAPI.call<IExamDetail>(
				examRoutes.getExamDetail + "/" + examId,
				{ method: "GET" }
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static updateExam = async (
		examId: string,
		updateInfo: {
			title?: string;
			introduction?: string;
			thumbnail?: string;
			categoryId?: string;
			part1Id?: string;
			part2Id?: string;
			part3Id?: string;
			part4Id?: string;
			part5Id?: string;
			part6Id?: string;
			part7Id?: string;
		}
	) => {
		try {
			const response = await RequestAPI.call<IExam>(
				examRoutes.getAll + "/" + examId,
				{ method: "PATCH", data: updateInfo }
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
}
