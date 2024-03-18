import { Part7Question } from "@/interfaces/exam/exam-interface";
import examStore from "@/stores/exam/exam-store";
import { useEffect, useState } from "react";
import GroupPart7Testing from "./group-part7-testing";

const Part7Testing = () => {
    const { exam, currentQuestion } = examStore();
    const [question, setQuestion] = useState<Part7Question>();
    useEffect(() => {
        if (currentQuestion) {
            const idx = exam?.part7?.part7Questions?.findIndex((_question) =>
                _question?.groupPart7Questions?.some(
                    (e) => e?.questionId == currentQuestion
                )
            );

            if (idx != undefined && idx != -1) {
                setQuestion(exam?.part7?.part7Questions?.[idx]);
            }
        }
    }, [currentQuestion]);

    return (
        question && (
            <section className="grid grid-cols-2 gap-6 w-full h-full">
                <div className="flex flex-col gap-6 items-start">
                    {question?.imageUrls &&
                        question?.imageUrls?.map((img, idx) => (
                            <img
                                src={img}
                                alt="Part 1 image"
                                className="w-[250px] object-cover"
                                key={"part-6-img-" + idx}
                            />
                        ))}
                </div>
                <div className="flex w-full flex-col gap-4 pb-6">
                    {question && <GroupPart7Testing part7Question={question} />}
                </div>
            </section>
        )
    );
};

export default Part7Testing;
