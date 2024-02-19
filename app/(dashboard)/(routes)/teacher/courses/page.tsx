import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CourseService from "@/services/course/courseService";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }
    const data = await CourseService.getAllCourses(userId);

    return (
        <main className="p-6">
            <DataTable columns={columns} data={data} />
        </main>
    );
};

export default CoursesPage;
