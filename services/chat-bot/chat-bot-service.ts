import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const chatbotRoutes = {
	sendMessage: apiEndpoint + "/chat-bot",
};
export default class ChatbotService {
	static sendMessage = async (message: string) => {
		try {
			const response = await RequestAPI.call<string>(
				chatbotRoutes.sendMessage,
				{
					method: "POST",
					data: {
						message,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return "";
	};
}
