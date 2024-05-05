import {
	IPracticeCourse,
	IPracticeCourseChapter,
} from "@/interfaces/practice-course/practice-course-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { IUserProgress } from "@/interfaces/user-progress/user-progress-interface";
import { IChapterQuestion } from "@/interfaces/course/course-interface";

const practiceCourseRoutes = {
	getAllPracticeCourse: apiEndpoint + "/practice-course",
	getProgress: apiEndpoint + "/practice-course/progress",
	getChapterDetailById: apiEndpoint + "/practice-course/detail",
};

export default class PracticeCourseService {
	static getAllCourses = async (userId: string) => {
		try {
			const response = await RequestAPI.call<{
				completedCourses: IPracticeCourse[];
				inCompletedCourses: IPracticeCourse[];
			}>(practiceCourseRoutes.getAllPracticeCourse, {
				method: "GET",
				headers: {
					Authorization: userId,
				},
			});
			if (response?.data) {
				return response?.data;
			}
		} catch (error) {}
		return {
			completedCourses: [],
			inCompletedCourses: [],
		};
	};

	static getPracticeCourseById = async (id: string, userId: string) => {
		try {
			const response = await RequestAPI.call<IPracticeCourse>(
				practiceCourseRoutes.getAllPracticeCourse + "/" + id,
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
				practiceCourseRoutes.getProgress + "/" + courseId,
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
	static getChapterDetailById = async (
		courseId: string,
		chapterId: string,
		userId: string
	) => {
		try {
			const response = await RequestAPI.call<{
				chapter: IPracticeCourseChapter;
				nextChapter: IPracticeCourseChapter;
				course: IPracticeCourse;
				userProgress: IUserProgress;
				questions: IChapterQuestion[];
			}>(practiceCourseRoutes.getChapterDetailById, {
				method: "POST",
				data: {
					practiceCourseId: courseId,
					chapterId: chapterId,
				},
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
}
