"use client";
import CourseProgress from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { ICourse } from "@/interfaces/course/course-interface";
import { IExam } from "@/interfaces/exam/exam-interface";
import { formatNumberWithCommas } from "@/lib/functions";
import {
    BookOpen,
    CheckCircle,
    Clock2,
    MessageCircle,
    SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
    exam: IExam;
};
const ExamCard = ({ exam }: Props) => {
    const [isDone, setDone] = useState<boolean>(true);
    return (
        <Link data-aos="zoom-in" href={`/exams/${exam?.id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 w-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        src={exam?.thumbnail ?? ""}
                        alt={exam?.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <span className="flex items-center">
                        {isDone && (
                            <CheckCircle
                                size={20}
                                color="#79df34"
                                className="mr-3"
                            />
                        )}
                        <span className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                            {exam?.title}
                        </span>
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                        #{exam?.category?.name}
                    </p>
                    <div className="my-3 flex items-start gap-x-2 text-sm md:text-xs  flex-col">
                        <ol className="flex items-center gap-x-1 text-slate-500">
                            <li className="flex items-center">
                                <IconBadge size="sm" icon={Clock2} />
                                <span className="ml-1">120 minutes</span>
                            </li>
                            <li className=" mx-1">|</li>
                            <li className="flex items-center">
                                <IconBadge size="sm" icon={SquarePen} />
                                <span className="ml-1">10000</span>
                            </li>
                            <li className=" mx-1">|</li>
                            <li className="flex items-center">
                                <IconBadge size="sm" icon={MessageCircle} />
                                <span className="ml-1">9669</span>
                            </li>
                        </ol>
                        <ol className="flex items-center gap-x-1 text-slate-500 mt-2">
                            <li className="flex items-center">
                                <span className="ml-1 font-semibold">
                                    7 PARTS
                                </span>
                            </li>
                            <li className=" mx-1">|</li>
                            <li className="flex items-center">
                                <span className="ml-1 font-semibold">
                                    200 QUESTIONS
                                </span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ExamCard;
