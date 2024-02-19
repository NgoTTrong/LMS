import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";

type ResponseAPI<T> = {
	statusCode: HttpStatusCode;
	message?: string;
	data: T;
};
// FIXME: Have a problem with this function, root cause is we have 2 sides call to backend but it not have token
export default class RequestAPI {
	static call = async <T>(
		url: string,
		{ method = "POST", ...config }: AxiosRequestConfig
	): Promise<ResponseAPI<T>> => {
		const response = await axios({
			method,
			baseURL: url,
			...config,
			headers: {
				...config.headers,
				"Content-Type": "application/json; charset=utf-8",
			},
		});
		return {
			statusCode: response.status,
			message: response.statusText,
			data: response.data,
		};
	};
}
