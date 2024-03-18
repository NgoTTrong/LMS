import { IGroup } from "@/interfaces/group/group-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const groupRoutes = {
	createGroup: apiEndpoint + "/group",
};

export default class GroupService {
	static getAllGroups = async () => {
		try {
			const response = await RequestAPI.call<IGroup[]>(
				groupRoutes.createGroup,
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
	static createGroup = async (
		userId: string,
		groupInfo: {
			title: string;
			description: string;
			password?: string;
			image: string;
		}
	) => {
		try {
			const response = await RequestAPI.call(groupRoutes.createGroup, {
				method: "POST",
				data: groupInfo,

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
}
