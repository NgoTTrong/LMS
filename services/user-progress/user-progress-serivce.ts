import { IUserProgress } from "@/interfaces/user-progress/user-progress-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const userProgressRoutes = {
    update: apiEndpoint + "/user-progress/create-or-update",
};

export default class UserProgressService {
    static update = async (
        userId: string,
        updateData: {
            chapterId: string;
            isCompleted?: boolean;
        }
    ) => {
        try {
            const response = await RequestAPI.call<IUserProgress>(
                userProgressRoutes.update,
                {
                    method: "POST",
                    data: updateData,
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
}
