import { Part6Question } from "@/interfaces/exam/exam-interface";
import examStore from "@/stores/exam/exam-store";
import { getCurrentQuestionPosition } from "../../_helper/get-current-question-position";
import { Button } from "@/components/ui/button";
import { getNextPart } from "../../_helper/get-next-part";
import { getNextPartQuestion } from "../../_helper/get-next-part-question";
import { getPrevPart } from "../../_helper/get-prev-part";
import { getPrevPartQuestion } from "../../_helper/get-prev-part-question";

type Props = {
    part6Question: Part6Question;
};
const GroupPart6Testing = ({ part6Question }: Props) => {
    const {
        exam,
        pushResult,
        result,
        currentPart,
        currentQuestion,
        setCurrentPart,
        setCurrentQuestion,
    } = examStore();
    const check = (questionId: string) => {
        const idx = result?.findIndex((e) => e?.questionId == questionId);
        if (idx == -1) {
            return null;
        }
        return result?.[idx]?.option;
    };
    const handleNext = () => {
        const questionIdx =
            exam?.part6?.part6Questions?.findIndex((question) =>
                question?.groupPart6Questions.some(
                    (e) => e?.questionId == currentQuestion
                )
            ) ?? -1;
        if (questionIdx == (exam?.part6?.part6Questions?.length ?? 0) - 1) {
            const nextPart = getNextPart(exam!, 6);
            const nextPartQuestion = getNextPartQuestion(exam!, 6);
            setCurrentPart(nextPart);
            setCurrentQuestion(nextPartQuestion);
        } else {
            setCurrentQuestion(
                exam?.part6?.part6Questions?.[questionIdx + 1]
                    ?.groupPart6Questions?.[0]?.questionId ?? null
            );
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handlePrev = () => {
        const questionIdx =
            exam?.part6?.part6Questions?.findIndex((question) =>
                question?.groupPart6Questions?.some(
                    (e) => e?.questionId == currentQuestion
                )
            ) ?? -1;
        if (questionIdx != 0 && questionIdx != -1) {
            setCurrentQuestion(
                exam?.part6?.part6Questions?.[questionIdx - 1]
                    ?.groupPart6Questions?.[0]?.questionId ?? null
            );
        } else {
            if (exam) {
                setCurrentPart(getPrevPart(exam, 6));
                setCurrentQuestion(getPrevPartQuestion(exam, 6));
            }
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <main className="flex flex-col gap-6 items-end">
            {part6Question?.groupPart6Questions?.map((group, idx) => {
                return (
                    <form
                        key={"group-part-6-" + idx}
                        className="w-[80%] flex flex-col gap-4 items-end"
                    >
                        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg h-fit w-full">
                            {exam && (
                                <h1>
                                    Question{" "}
                                    {getCurrentQuestionPosition(
                                        group?.questionId,
                                        exam
                                    )}
                                </h1>
                            )}
                            <h1>Q: {group?.question?.content}</h1>
                            <div
                                onClick={() => {
                                    pushResult(group?.questionId, "A");
                                }}
                                className={`flex items-center gap-4 ${
                                    check(group?.questionId) == "A" &&
                                    "bg-sky-200"
                                } rounded-lg p-2`}
                            >
                                <input
                                    type="radio"
                                    className="w-4 h-4"
                                    id={`group-${idx}-optionA`}
                                    readOnly
                                    checked={check(group?.questionId) == "A"}
                                />
                                <label htmlFor={`group-${idx}-optionA`}>
                                    {group?.question?.optionA}
                                </label>
                            </div>
                            <div
                                onClick={() => {
                                    pushResult(group?.questionId, "B");
                                }}
                                className={`flex items-center gap-4 ${
                                    check(group?.questionId) == "B" &&
                                    "bg-sky-200"
                                } rounded-lg p-2`}
                            >
                                <input
                                    type="radio"
                                    className="w-4 h-4"
                                    id={`group-${idx}-optionB`}
                                    readOnly
                                    checked={check(group?.questionId) == "B"}
                                />
                                <label htmlFor={`group-${idx}-optionB`}>
                                    {group?.question?.optionB}
                                </label>
                            </div>
                            <div
                                onClick={() => {
                                    pushResult(group?.questionId, "C");
                                }}
                                className={`flex items-center gap-4 ${
                                    check(group?.questionId) == "C" &&
                                    "bg-sky-200"
                                } rounded-lg p-2`}
                            >
                                <input
                                    type="radio"
                                    className="w-4 h-4"
                                    id={`group-${idx}-optionC`}
                                    readOnly
                                    checked={check(group?.questionId) == "C"}
                                />
                                <label htmlFor={`group-${idx}-optionC`}>
                                    {group?.question?.optionC}
                                </label>
                            </div>
                            <div
                                onClick={() => {
                                    pushResult(group?.questionId, "D");
                                }}
                                className={`flex items-center gap-4 ${
                                    check(group?.questionId) == "D" &&
                                    "bg-sky-200"
                                } rounded-lg p-2`}
                            >
                                <input
                                    type="radio"
                                    className="w-4 h-4"
                                    id={`group-${idx}-optionD`}
                                    readOnly
                                    checked={check(group?.questionId) == "D"}
                                />
                                <label htmlFor={`group-${idx}-optionD`}>
                                    {group?.question?.optionD}
                                </label>
                            </div>
                        </div>
                    </form>
                );
            })}
            <div className="flex gap-4 items-center w-fit">
                <Button
                    onClick={handlePrev}
                    className="w-fit"
                    type="button"
                    variant={"outline"}
                >
                    Previous
                </Button>

                <Button onClick={handleNext} className="w-fit" type="button">
                    Next
                </Button>
            </div>
        </main>
    );
};

export default GroupPart6Testing;
