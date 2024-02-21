import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CourseService from "@/services/course/courseService";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}
	const data = await CourseService.getAllCourses(user.id);

	return (
		<main className="p-6">
			<DataTable columns={columns} data={data} />
		</main>
	);
};

export default CoursesPage;
