import CourseService from "@/services/course/courseService";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params,
}: {
    params: {
        courseId: string;
    };
}) => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const course = await CourseService.getCourseByUser(
        params.courseId,
        user.id
    );
    if (!course) {
        redirect("/");
    }
    return redirect(
        `/courses/${course?.id}/chapters/${course?.chapters?.[0]?.id}`
    );
};

export default CourseIdPage;
