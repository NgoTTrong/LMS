import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const paymentRoutes = {
	getUserPayment: apiEndpoint + "/payment/user-payment-course",
	purchaseCourse: apiEndpoint + "/payment/purchase",
	analytics: apiEndpoint + "/payment/analytics",
};

export default class PaymentService {
	static getUserPaymentCourse = async (courseId: string) => {
		try {
			const response = await RequestAPI.call(
				paymentRoutes.getUserPayment,
				{
					method: "POST",
					data: {
						courseId: courseId,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};
	static purchaseCourse = async (courseId: string) => {
		try {
			const response = await RequestAPI.call(
				paymentRoutes.purchaseCourse,
				{
					method: "POST",
					data: {
						courseId,
					},
				}
			);
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return null;
	};

	static getAnalytics = async () => {
		try {
			const response = await RequestAPI.call<{
				data: { title: string; total: number }[];
				totalSales: number;
				totalRevenue: number;
			}>(paymentRoutes.analytics, {
				method: "GET",
			});
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return {
			data: [],
			totalSales: 0,
			totalRevenue: 0,
		};
	};
}
