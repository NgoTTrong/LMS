import PracticeCourseService from "@/services/practice-course/practice-course-service";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
	params,
}: {
	params: {
		id: string;
	};
}) => {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	const course = await PracticeCourseService.getPracticeCourseById(
		params.id,
		user.id
	);
	if (!course) {
		redirect("/");
	}
	return redirect(
		`/practice-courses/${course?.id}/chapters/${course?.PracticeCourseChapter?.[0]?.chapterId}`
	);
};

export default CourseIdPage;
