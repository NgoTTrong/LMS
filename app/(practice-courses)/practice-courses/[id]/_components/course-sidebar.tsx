import CourseSidebarItem from "./course-sidebar-item";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IPracticeCourse } from "@/interfaces/practice-course/practice-course-interface";

type Props = {
	course: IPracticeCourse;
	progress: number | null;
};

const CourseSidebar = async ({ course, progress }: Props) => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}

	return (
		<section className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="p-8 flex flex-col border-b">
				<h1>{course?.name}</h1>
			</div>
			<div className="flex flex-col w-full ">
				{course?.PracticeCourseChapter?.map((chapter, idx) => {
					return (
						<CourseSidebarItem
							key={"chapter-" + idx}
							isCompleted={
								chapter?.chapter?.userProgress?.[0]?.isCompleted
							}
							chapterId={chapter?.chapterId}
							practiceCourseId={chapter?.practiceCourseId}
							chapter={chapter?.chapter}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default CourseSidebar;
