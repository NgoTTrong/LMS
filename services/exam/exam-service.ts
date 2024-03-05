import { IEXam } from "@/interfaces/exam/exam-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const examRoutes = {
	getAll: apiEndpoint + "/exam",
};

export default class ExamService {
	static getAll = async (userId: string) => {
		try {
			const response = await RequestAPI.call<IEXam[]>(examRoutes.getAll, {
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
}
