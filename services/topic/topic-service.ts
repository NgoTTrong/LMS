import { ITopic } from "@/interfaces/topic/topic-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const topicRoutes = {
	getAllTopics: apiEndpoint + "/topic",
};

export default class TopicService {
	static getAllTopics = async () => {
		try {
			const response = await RequestAPI.call<ITopic[]>(
				topicRoutes.getAllTopics,
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
	static generateSeeds = async () => {
		try {
			await RequestAPI.call(topicRoutes.getAllTopics, {
				method: "POST",
				data: {
					names: [
						"Các thì",
						"Thì hiện tại đơn (Present Simple)",
						"Thì hiện tại tiếp diễn (Present Progressive)",
						"Thì hiện tại hoàn thành (Present Perfect)",
						"Thì quá khứ đơn (Past Simple)",
						"Thì quá khứ tiếp diễn (Past Progressive)",
						"Thì quá khứ hoàn thành (Past Perfect)",
						"Thì tương lai đơn (Future Simple)",
						"Thì tương lai tiếp diễn (Future Progressive)",
						"Thì tương lai hoàn thành (Future Perfect)",
						"Câu điều kiện loại 1 (First Conditional)",
						"Câu điều kiện loại 2 (Second Conditional)",
						"Câu điều kiện loại 3 (Third Conditional)",
						"Câu điều kiện hỗn hợp (Mixed Conditionals)",
						"Câu điều kiện",
						"Câu bị động",
						"Cấu trúc câu bị động với động từ to be",
						"Cấu trúc câu bị động với get",
						"Cấu trúc câu bị động với have",
						"Modal verbs",
						"Can",
						"Could",
						"May",
						"Might",
						"Must",
						"Should",
						"Will",
						"Would",
						"Danh từ và tính từ",
						"Danh từ đếm được và danh từ không đếm được",
						"Tính từ so sánh",
						"Mạo từ (a, an, the)",
						"Đại từ",
						"Đại từ nhân xưng",
						"Đại từ sở hữu",
						"Đại từ chỉ định",
						"Đại từ quan hệ",
						"Đại từ bất định",
						"Giới từ",
						"Giới từ chỉ nơi chốn",
						"Giới từ chỉ thời gian",
						"Giới từ chỉ mục đích",
						"Giới từ chỉ phương tiện",
						"Liên từ",
						"Liên từ nối",
						"Liên từ phối hợp",
						"Liên từ tương phản",
						"Liên từ nguyên nhân",
						"Liên từ kết quả",
						"Cấu trúc câu",
						"Cấu trúc câu đơn",
						"Cấu trúc câu ghép",
						"Cấu trúc câu phức",
						"Photographs",
						"Questions & Responses",
						"Short Conversations",
						"Short Talks",
						"Incomplete Sentences",
						"Text Completion",
						"Reading Comprehension",
					],
				},
			});
		} catch (error) {}
	};
}
