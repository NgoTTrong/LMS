import CourseProgress from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { ICourse } from "@/interfaces/course/course-interface";
import { IPracticeCourse } from "@/interfaces/practice-course/practice-course-interface";
import { formatNumberWithCommas } from "@/lib/functions";
import { BookOpen } from "lucide-react";
import Link from "next/link";

type Props = {
    item: IPracticeCourse;
};
const CourseCard = ({ item }: Props) => {
    return (
        <Link data-aos="zoom-in" href={`/practice-courses/${item?.id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 w-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <img
                        src={item?.thumbnail!}
                        alt={item?.name}
                        className="object-cover w-full"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <span className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {item?.name}
                    </span>
                    <p className="text-xs text-muted-foreground"></p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {item?.PracticeCourseChapter?.length}{" "}
                                {item?.PracticeCourseChapter?.length == 1
                                    ? "Chapter"
                                    : "Chapters"}
                            </span>
                        </div>
                    </div>
                    <CourseProgress
                        size="sm"
                        value={item?.progress}
                        variant={item?.progress == 100 ? "success" : "default"}
                    />
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
