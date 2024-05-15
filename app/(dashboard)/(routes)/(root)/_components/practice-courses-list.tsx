import { ICourse } from "@/interfaces/course/course-interface";
import { IPracticeCourse } from "@/interfaces/practice-course/practice-course-interface";
import CourseCard from "./course-card";

type Props = {
    items: IPracticeCourse[];
};

const PracticeCoursesList = ({ items }: Props) => {
    return (
        <main>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item, idx) => {
                    return (
                        <CourseCard
                            key={"practice-course-" + idx}
                            item={item}
                        />
                    );
                })}
            </div>

            {items.length == 0 && (
                <div className="text-center text-sm text-muted-foreground mt=10">
                    No Practice Courses found
                </div>
            )}
        </main>
    );
};

export default PracticeCoursesList;
