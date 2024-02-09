import {
  IAttachment,
  IChapter,
  ICourse,
} from "@/interfaces/course/course-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { IPayment } from "@/interfaces/payment/payment-interface";
import { IUserProgress } from "@/interfaces/user-progress/user-progress-interface";

const chapterRoutes = {
  getChapterById: apiEndpoint + "/chapter",
  getChapterDetailById: apiEndpoint + "/chapter/detail",
};
export default class ChapterService {
  static getChapterDetailById = async (
    courseId: number,
    chapterId: number,
    userId: number
  ) => {
    try {
      const response = await RequestAPI.call<{
        chapter: IChapter;
        nextChapter: IChapter;
        attachments: IAttachment[];
        payment: IPayment;
        course: ICourse;
        userProgress: IUserProgress;
      }>(chapterRoutes.getChapterDetailById, {
        method: "POST",
        data: {
          courseId: Number(courseId),
          chapterId: Number(chapterId),
          userId: Number(userId),
        },
      });
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
  static getChapterById = async (chapterId: number) => {
    try {
      const response = await RequestAPI.call<IChapter>(
        chapterRoutes.getChapterById + "/" + chapterId,
        {
          method: "GET",
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
  static updateChapterId = async (
    chapterId: number,
    updateData: {
      title?: string;
      description?: string;
      isFree?: boolean;
      videoUrl?: string;
      isPublished?: boolean;
    }
  ) => {
    try {
      const response = await RequestAPI.call<IChapter>(
        chapterRoutes.getChapterById + "/" + chapterId,
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
  static deleteChapter = async (chapterId: number, courseId: number) => {
    try {
      const response = await RequestAPI.call<IChapter>(
        chapterRoutes.getChapterById + "/" + chapterId + "/courses/" + courseId,
        {
          method: "DELETE",
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
}
