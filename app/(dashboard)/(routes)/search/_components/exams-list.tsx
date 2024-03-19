import { ICourse } from "@/interfaces/course/course-interface";
import CourseCard from "./course-card";
import ExamCard from "./exam-card";
import { IExam } from "@/interfaces/exam/exam-interface";

type Props = {
    exams: IExam[];
};

const ExamsList = ({ exams }: Props) => {
    return (
        <main>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {exams.map((exam, idx) => {
                    return <ExamCard key={"exam-" + idx} exam={exam} />;
                })}
            </div>

            {exams.length == 0 && (
                <div className="text-center text-sm text-muted-foreground mt=10">
                    No Exams found
                </div>
            )}
        </main>
    );
};

export default ExamsList;
