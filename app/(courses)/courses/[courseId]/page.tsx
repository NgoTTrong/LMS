import CourseService from "@/services/course/courseService";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
	params,
}: {
	params: {
		courseId: string;
	};
}) => {
	const course = await CourseService.getCourseByUser(params.courseId);
	if (!course) {
		redirect("/");
	}
	return redirect(
		`/courses/${course?.id}/chapters/${course?.chapters?.[0]?.id}`
	);
};

export default CourseIdPage;
