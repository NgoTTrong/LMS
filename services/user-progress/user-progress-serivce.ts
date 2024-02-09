import { IUserProgress } from "@/interfaces/user-progress/user-progress-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const userProgressRoutes = {
  update: apiEndpoint + "/user-progress/create-or-update",
};

export default class UserProgressService {
  static update = async (updateData: {
    chapterId: number;
    userId: number;
    isCompleted?: boolean;
  }) => {
    try {
      const response = await RequestAPI.call<IUserProgress>(
        userProgressRoutes.update,
        {
          method: "POST",
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
