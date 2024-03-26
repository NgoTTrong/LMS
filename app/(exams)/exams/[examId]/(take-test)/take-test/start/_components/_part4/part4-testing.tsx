import { useAudio } from "@/hooks/use-audio";
import { Part4Question } from "@/interfaces/exam/exam-interface";
import { formatTime } from "@/lib/functions";
import examStore from "@/stores/exam/exam-store";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import GroupPart4Testing from "./group-part4-testing";
import Image from "next/image";

const Part4Testing = () => {
    const { exam, currentQuestion } = examStore();
    const { playing, toggle, setAudio, duration } = useAudio();
    const [question, setQuestion] = useState<Part4Question>();
    useEffect(() => {
        if (currentQuestion) {
            const idx = exam?.part4?.part4Questions?.findIndex((_question) =>
                _question?.groupPart4Questions?.some(
                    (e) => e?.questionId == currentQuestion
                )
            );

            if (idx != undefined && idx != -1) {
                setQuestion(exam?.part4?.part4Questions?.[idx]);
                setAudio(
                    new Audio(exam?.part4?.part4Questions?.[idx]?.audioUrl)
                );
            }
        }
    }, [currentQuestion]);

    return (
        question && (
            <section className="grid grid-cols-2 gap-6 w-full h-full">
                <div className="flex flex-col gap-6 items-start">
                    {question?.imageUrls?.[0] && (
                        <Image
                            src={question?.imageUrls?.[0]}
                            alt="Part 4 image"
                            className="w-[250px] object-cover"
                        />
                    )}
                    {playing ? (
                        <h1
                            onClick={() => toggle()}
                            className="flex items-center gap-4 font-medium text-base"
                        >
                            <PauseCircle className="w-12 h-12" />
                            {formatTime(duration)}
                        </h1>
                    ) : (
                        <h1
                            onClick={() => toggle()}
                            className="flex items-center gap-4 font-medium text-base"
                        >
                            <PlayCircle className="w-12 h-12" />
                            {formatTime(duration)}
                        </h1>
                    )}
                </div>
                <div className="flex w-full flex-col gap-4 pb-6">
                    {question && <GroupPart4Testing part4Question={question} />}
                </div>
            </section>
        )
    );
};

export default Part4Testing;
