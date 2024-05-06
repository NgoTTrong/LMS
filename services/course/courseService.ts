import {
    IAttachment,
    ICategoryCourse,
    IChapter,
    ICourse,
} from "@/interfaces/course/course-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";

const courseRoutes = {
    createCourse: apiEndpoint + "/course",
    getCourseByUser: apiEndpoint + "/course/by-user",
    getDashboardCourses: apiEndpoint + "/course/get-all-of-user",
    getCoursesByUser: apiEndpoint + "/course/all",
    getCategories: apiEndpoint + "/course-category",
    addAttachment: apiEndpoint,
    addChapter: apiEndpoint,
    getChapterById: apiEndpoint + "/chapter",
    getProgress: apiEndpoint + "/user-progress/all",
};

export default class CourseService {
    static getDashboardCoursesByUser = async (userId?: string) => {
        try {
            const response = await RequestAPI.call<{
                completedCourses: {
                    course: ICourse;
                    progress: number | null;
                }[];
                inCompletedCourses: {
                    course: ICourse;
                    progress: number | null;
                }[];
            }>(courseRoutes.getDashboardCourses + `?userId=${userId}`, {
                method: "GET",
            });
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return { completedCourses: [], inCompletedCourses: [] };
    };
    static getCourseByUser = async (courseId: string, userId: string) => {
        try {
            const response = await RequestAPI.call<ICourse>(
                courseRoutes.getCourseByUser + "/" + courseId,
                {
                    method: "GET",
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
    static getProgress = async (courseId: string, userId: string) => {
        try {
            const response = await RequestAPI.call<number | null>(
                courseRoutes.getProgress + "/" + courseId,
                {
                    method: "GET",
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
    static getAllCoursesByUser = async (
        userId?: string,
        title?: string,
        categoryId?: string
    ) => {
        try {
            const response = await RequestAPI.call<
                {
                    course: ICourse;
                    progress: number | null;
                }[]
            >(courseRoutes.getCoursesByUser, {
                method: "GET",
                params: {
                    title,
                    categoryId,
                    userId,
                },
            });
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static getAllCourses = async (userId: string) => {
        try {
            const response = await RequestAPI.call<ICourse[]>(
                courseRoutes.createCourse,
                {
                    method: "GET",
                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static createCourse = async (
        userId: string,
        { title }: { title: string }
    ) => {
        try {
            const response = await RequestAPI.call<ICourse>(
                courseRoutes.createCourse,
                {
                    method: "POST",
                    data: { title },
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
    static getCourseById = async (courseId: string, userId: string) => {
        try {
            const response = await RequestAPI.call<ICourse>(
                courseRoutes.createCourse + "/" + courseId,
                {
                    method: "GET",
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
    static updateCourseById = async (
        courseId: string,
        updateInfo: {
            title?: string;
            description?: string;
            imageUrl?: string;
            categoryId?: string;
            price?: number;
            url?: string;
            isPublished?: boolean;
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
    static addAttachment = async (courseId: string, url: string) => {
        try {
            const response = await RequestAPI.call<IAttachment>(
                courseRoutes.addAttachment +
                    "/course/" +
                    courseId +
                    "/attachment",
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
    static deleteAttachment = async (attachmentId: string) => {
        try {
            const response = await RequestAPI.call<IAttachment>(
                courseRoutes.addAttachment +
                    "/course/attachment/" +
                    attachmentId,
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
        courseId: string,
        chapterInfo: { title?: string }
    ) => {
        try {
            const response = await RequestAPI.call<IAttachment>(
                courseRoutes.addAttachment +
                    "/course/" +
                    courseId +
                    "/chapters",
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
    static reorderChapters = async (
        courseId: string,
        updateData: { id: string; position: number }[]
    ) => {
        try {
            const response = await RequestAPI.call<IAttachment>(
                courseRoutes.addAttachment +
                    "/course/" +
                    courseId +
                    "/chapters/reorder",
                {
                    method: "POST",
                    data: { reorderData: updateData },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static deleteCourse = async (courseId: string) => {
        try {
            const response = await RequestAPI.call(
                courseRoutes.createCourse + "/" + courseId,
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
