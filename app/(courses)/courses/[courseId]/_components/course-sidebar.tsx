import { ICourse } from "@/interfaces/course/course-interface";
import PaymentService from "@/services/payment/payment-service";
import CourseSidebarItem from "./course-sidebar-item";
import { Progress } from "@/components/ui/progress";
import CourseProgress from "@/components/course-progress";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
    course: ICourse;
    progress: number | null;
};

const CourseSidebar = async ({ course, progress }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }
    const payment = await PaymentService.getUserPaymentCourse(
        course?.id,
        user.id
    );

    return (
        <section className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1>{course?.title}</h1>
                {payment && (
                    <div className="mt-10">
                        <CourseProgress
                            value={progress ?? 0}
                            variant={"success"}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full ">
                {course?.chapters?.map((chapter, idx) => {
                    return (
                        <CourseSidebarItem
                            key={"chapter-" + idx}
                            id={chapter?.id}
                            label={chapter?.title}
                            isCompleted={
                                chapter?.userProgress?.[0]?.isCompleted
                            }
                            courseId={course?.id}
                            isLocked={!chapter?.isFree && !payment}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default CourseSidebar;
