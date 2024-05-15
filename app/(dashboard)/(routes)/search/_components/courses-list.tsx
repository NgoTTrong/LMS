import { ICourse } from "@/interfaces/course/course-interface";
import CourseCard from "./course-card";
import ExamCard from "./exam-card";

type Props = {
    items: {
        course: ICourse;
        progress: number | null;
    }[];
};

const CoursesList = ({ items }: Props) => {
    return (
        <main className="">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item, idx) => {
                    return <CourseCard key={"course-" + idx} item={item} />;
                })}
            </div>

            {items.length == 0 && (
                <div className="text-center text-sm text-muted-foreground mt=10">
                    No Courses found
                </div>
            )}
        </main>
    );
};

export default CoursesList;
