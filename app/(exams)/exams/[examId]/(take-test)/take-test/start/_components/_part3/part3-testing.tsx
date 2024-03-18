import { useAudio } from "@/hooks/use-audio";
import { Part3Question } from "@/interfaces/exam/exam-interface";
import { formatTime } from "@/lib/functions";
import examStore from "@/stores/exam/exam-store";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import GroupPart3Testing from "./group-part3-testing";

const Part3Testing = () => {
    const { exam, currentQuestion } = examStore();
    const { playing, toggle, setAudio, duration } = useAudio();
    const [question, setQuestion] = useState<Part3Question>();
    useEffect(() => {
        if (currentQuestion) {
            const idx = exam?.part3?.part3Questions?.findIndex((_question) =>
                _question?.groupPart3Questions?.some(
                    (e) => e?.questionId == currentQuestion
                )
            );

            if (idx != undefined && idx != -1) {
                setQuestion(exam?.part3?.part3Questions?.[idx]);
                setAudio(
                    new Audio(exam?.part3?.part3Questions?.[idx]?.audioUrl)
                );
            }
        }
    }, [currentQuestion]);

    return (
        question && (
            <section className="grid grid-cols-2 gap-6 w-full h-full">
                <div className="flex flex-col gap-6 items-start">
                    {question?.imageUrls?.[0] && (
                        <img
                            src={question?.imageUrls?.[0]}
                            alt="Part 1 image"
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
                    {question && <GroupPart3Testing part3Question={question} />}
                </div>
            </section>
        )
    );
};

export default Part3Testing;
