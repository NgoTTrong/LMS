import {
  IAttachment,
  ICategoryCourse,
  ICourse,
} from "@/interfaces/course/course-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const courseRoutes = {
  createCourse: apiEndpoint + "/course",
  getCategories: apiEndpoint + "/category-course",
  addAttachment: apiEndpoint,
  addChapter: apiEndpoint,
};

export default class CourseService {
  static createCourse = async ({ title }: { title: string }) => {
    try {
      const response = await RequestAPI.call<ICourse>(
        courseRoutes.createCourse,
        {
          method: "POST",
          data: { title },
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
  static getCourseById = async (courseId: number) => {
    try {
      const response = await RequestAPI.call<ICourse>(
        courseRoutes.createCourse + "/" + courseId,
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
  static updateCourseById = async (
    courseId: number,
    updateInfo: {
      title?: string;
      description?: string;
      imageUrl?: string;
      categoryId?: number;
      price?: number;
      url?: string;
    }
  ) => {
    try {
      const response = await RequestAPI.call(
        courseRoutes.createCourse + "/" + courseId,
        {
          data: updateInfo,
          method: "PATCH",
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
  static getAllCategoryCourse = async () => {
    try {
      const response = await RequestAPI.call<ICategoryCourse[]>(
        courseRoutes.getCategories,
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
  static addAttachment = async (courseId: number, url: string) => {
    try {
      const response = await RequestAPI.call<IAttachment>(
        courseRoutes.addAttachment + "/course/" + courseId + "/attachment",
        {
          method: "POST",
          data: { url },
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
  static deleteAttachment = async (attachmentId: number) => {
    try {
      const response = await RequestAPI.call<IAttachment>(
        courseRoutes.addAttachment + "/course/attachment/" + attachmentId,
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
  static addChapter = async (
    courseId: number,
    chapterInfo: { title?: string }
  ) => {
    try {
      const response = await RequestAPI.call<IAttachment>(
        courseRoutes.addAttachment + "/course/" + courseId + "/chapters",
        {
          method: "POST",
          data: chapterInfo,
        }
      );
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {}
    return null;
  };
}
