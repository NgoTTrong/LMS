import { Progress } from "@/components/ui/progress";
import examStore from "@/stores/exam/exam-store";
import { calcExamLength } from "../_helper/calc-exam-length";

const TimerBar = () => {
    const { exam, result } = examStore();

    return (
        exam && (
            <section className="w-full">
                <Progress
                    className="w-full rounded-none h-[8px]"
                    value={Math.floor(
                        (result?.length * 100) / calcExamLength(exam)
                    )}
                />
            </section>
        )
    );
};

export default TimerBar;
