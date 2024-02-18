import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CourseService from "@/services/course/courseService";

const CoursesPage = async () => {
	const data = await CourseService.getAllCourses();

	return (
		<main className="p-6">
			<DataTable columns={columns} data={data} />
		</main>
	);
};

export default CoursesPage;
