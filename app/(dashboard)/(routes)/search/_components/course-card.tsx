import CourseProgress from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { ICourse } from "@/interfaces/course/course-interface";
import { formatNumberWithCommas } from "@/lib/functions";
import { BookOpen } from "lucide-react";
import img from "next/image";
import Link from "next/link";

type Props = {
    item: {
        course: ICourse;
        progress: number | null;
    };
};
const CourseCard = ({ item }: Props) => {
    return (
        <Link data-aos="zoom-in" href={`/courses/${item?.course?.id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 w-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <img
                        src={item?.course?.imageUrl!}
                        alt={item?.course?.title}
                        className="object-cover w-full"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <span className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {item?.course?.title}
                    </span>
                    <p className="text-xs text-muted-foreground">
                        {item?.course?.category?.name}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {item?.course?.chapters?.length}{" "}
                                {item?.course?.chapters?.length == 1
                                    ? "Chapter"
                                    : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {item?.progress != null ? (
                        <CourseProgress
                            size="sm"
                            value={item?.progress}
                            variant={
                                item?.progress == 100 ? "success" : "default"
                            }
                        />
                    ) : (
                        <p>{formatNumberWithCommas(item?.course?.price)}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
