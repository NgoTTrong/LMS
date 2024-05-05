import { ILeaderBoard } from "@/interfaces/leaderboard/leaderboard-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const leaderBoardRoutes = {
	getLeaderBoard: apiEndpoint + "/leaderboard",
	receivePoint: apiEndpoint + "/leaderboard/receive-point",
};

export default class LeaderBoardService {
	static getLeaderBoard = async (userId: string) => {
		try {
			const response = await RequestAPI.call<{
				user: ILeaderBoard;
				leaderBoard: ILeaderBoard[];
			}>(leaderBoardRoutes.getLeaderBoard, {
				method: "GET",
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
	static receicePoint = async (userId: string, point: number) => {
		try {
			const response = await RequestAPI.call(
				leaderBoardRoutes.receivePoint,
				{
					method: "POST",
					headers: {
						Authorization: userId,
					},
					data: { point },
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
}
