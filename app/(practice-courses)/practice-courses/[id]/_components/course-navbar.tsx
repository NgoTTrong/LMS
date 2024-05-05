import NavbarRoutes from "@/components/navbar/navbar-routes";
import { ICourse } from "@/interfaces/course/course-interface";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { IPracticeCourse } from "@/interfaces/practice-course/practice-course-interface";

type Props = {
	course: IPracticeCourse;
	progress: number | null;
};
const CourseNavbar = ({ course, progress }: Props) => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<CourseMobileSidebar course={course} progress={progress} />
			<NavbarRoutes />
		</div>
	);
};

export default CourseNavbar;
