"use client";
import { useClientAuth } from "@/hooks/use-client-auth";
import { IChapterQuestion } from "@/interfaces/course/course-interface";
import ChapterService from "@/services/chapter/chapter-service";
import { useEffect, useState } from "react";

type Props = {
    question: IChapterQuestion;
    chapterId: string;
    index: number;
    answers: { questionId: string; answer: string }[];
};
const QuestionCard = ({ question, chapterId, index, answers }: Props) => {
    const [choosen, setChoosenQuestion] = useState<string | null>(null);
    const user = useClientAuth();
    const handleAnswer = async (answer: string) => {
        await ChapterService.answerQuestion(
            user?.userId,
            chapterId,
            question?.id,
            answer
        );
    };
    useEffect(() => {
        const idx = answers?.findIndex((e) => e?.questionId == question?.id);
        if (idx != -1) {
            setChoosenQuestion(answers[idx]?.answer);
        }
    }, [answers]);
    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="">
                <b>Question {" " + index}:</b> {question?.question?.content}
            </p>
            {question?.audioUrl && (
                <audio
                    src={question?.audioUrl}
                    controls
                    className="w-full max-w-[500px]"
                ></audio>
            )}
            {question?.imageUrl && (
                <img
                    alt=""
                    className="w-full object-cover max-w-[500px] rounded-lg"
                    src={question?.imageUrl}
                />
            )}
            <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg h-fit w-full">
                <div
                    onClick={() => {
                        setChoosenQuestion("A");
                        handleAnswer("A");
                    }}
                    className={`flex items-center gap-4 ${
                        choosen == "A" && "bg-sky-200"
                    } rounded-lg p-2`}
                >
                    <input
                        type="radio"
                        className="w-4 h-4"
                        id="optionA"
                        readOnly
                        checked={choosen == "A"}
                    />
                    <label htmlFor="optionA">
                        {question?.question?.optionA}
                    </label>
                </div>
                <div
                    onClick={() => {
                        setChoosenQuestion("B");
                        handleAnswer("B");
                    }}
                    className={`flex items-center gap-4 ${
                        choosen == "B" && "bg-sky-200"
                    } rounded-lg p-2`}
                >
                    <input
                        type="radio"
                        className="w-4 h-4"
                        id="optionB"
                        readOnly
                        checked={choosen == "B"}
                    />
                    <label htmlFor="optionB">
                        {" "}
                        {question?.question?.optionB}
                    </label>
                </div>
                <div
                    onClick={() => {
                        setChoosenQuestion("C");
                        handleAnswer("C");
                    }}
                    className={`flex items-center gap-4 ${
                        choosen == "C" && "bg-sky-200"
                    } rounded-lg p-2`}
                >
                    <input
                        type="radio"
                        className="w-4 h-4"
                        id="optionC"
                        readOnly
                        checked={choosen == "C"}
                    />
                    <label htmlFor="optionC">
                        {" "}
                        {question?.question?.optionC}
                    </label>
                </div>
                <div
                    onClick={() => {
                        setChoosenQuestion("D");
                        handleAnswer("D");
                    }}
                    className={`flex items-center gap-4 ${
                        choosen == "D" && "bg-sky-200"
                    } rounded-lg p-2`}
                >
                    <input
                        type="radio"
                        className="w-4 h-4"
                        id="optionD"
                        readOnly
                        checked={choosen == "D"}
                    />
                    <label htmlFor="optionD">
                        {" "}
                        {question?.question?.optionD}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
