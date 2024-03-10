import CourseService from "@/services/course/courseService";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ExamLayout from "./layout";

const ExamIdPage = async ({
    params,
}: {
    params: {
        examId: string;
    };
}) => {
    const user = await currentUser();

    console.log(params.examId);
    if (!user) {
        redirect("/");
    }
    return redirect(`/exams/${params.examId}/introduction`);
};

export default ExamIdPage;
