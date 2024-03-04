"use client";

import { IconBadge } from "@/components/icon-badge";
import { CheckCircle2, Clock2, SquarePen } from "lucide-react";
import { useState } from "react";

const IntroduceHeader = () => {
    const [isDone, setDone] = useState<boolean>(true);
    const [isChecked, setChecked] = useState<boolean>(true);
    return (
        <div className="w-full mb-[40px]">
            <span className=" bg-[#EEEEEE] rounded-2xl text-sm p-2 font-medium">
                # TOEIC
            </span>
            <div className="flex items-center mt-4">
                <h1 className=" text-4xl font-bold">
                    Practice Set 2023 TOEIC Test 1
                </h1>
                {isDone && (
                    <CheckCircle2 size={30} color="#79df34" className="ml-2 " />
                )}
            </div>

            <ul className="my-6 flex gap-3 text-md">
                <button
                    onClick={() => setChecked(!isChecked)}
                    className={`p-2 rounded-2xl  ${
                        isChecked
                            ? "text-[#264c94] bg-[#E8F2FF] font-semibold"
                            : "bg-[#f1f1f1]"
                    }   hover:brightness-90`}
                >
                    Exam information
                </button>
                <button
                    onClick={() => setChecked(!isChecked)}
                    className={`p-2 rounded-2xl  ${
                        !isChecked
                            ? "text-[#264c94] bg-[#E8F2FF] font-semibold"
                            : "bg-[#f1f1f1]"
                    }  hover:brightness-90`}
                >
                    Answer
                </button>
            </ul>

            <div className="flex flex-col justify-start">
                <span className="flex items-center my-1">
                    <Clock2 size={19} />
                    <span className="ml-2 ">
                        Exam time: 120 minutes | 7 exam parts | 200 questions |
                        2140 comments
                    </span>
                </span>
                <span className="flex items-center my-1">
                    <SquarePen size={19} />
                    <span className="ml-2 ">
                        1270557 People have practiced this exam
                    </span>
                </span>
            </div>
        </div>
    );
};

export default IntroduceHeader;
