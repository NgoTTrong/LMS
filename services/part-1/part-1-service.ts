import { IPart1 } from "@/interfaces/part-1/part-1-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const part1Routes = {
	create: apiEndpoint + "/part1/create",
	getOne: apiEndpoint + "/part1",
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
}
