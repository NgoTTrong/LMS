import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";
import { IPracticeCourse } from "@/interfaces/practice-course/practice-course-interface";

type Props = {
	course: IPracticeCourse;
	progress: number | null;
};

const CourseMobileSidebar = async ({ course, progress }: Props) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			<SheetContent className="p-0 bg-white w-72" side="left">
				<CourseSidebar course={course} progress={progress} />
			</SheetContent>
		</Sheet>
	);
};

export default CourseMobileSidebar;
