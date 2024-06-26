import { redirect } from "next/navigation";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";
import { currentUser } from "@clerk/nextjs";
import PracticeCourseService from "@/services/practice-course/practice-course-service";

type Props = {
	children: React.ReactNode;
	params: {
		id: string;
	};
};

const CourseLayout = async ({ children, params }: Props) => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}
	const course = await PracticeCourseService.getPracticeCourseById(
		params?.id,
		user.id
	);
	if (!course) {
		redirect("/");
	}
	const progressCount = await PracticeCourseService.getProgress(
		params?.id,
		user.id
	);

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar course={course} progress={progressCount} />
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
				<CourseSidebar course={course} progress={progressCount} />
			</div>
			<main className="md:pl-80 h-full pt-[80px]">{children}</main>
		</div>
	);
};

export default CourseLayout;
