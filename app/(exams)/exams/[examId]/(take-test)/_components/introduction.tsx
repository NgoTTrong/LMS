import { IExam } from "@/interfaces/exam/exam-interface";
import img from "next/image";

type Props = {
    exam: IExam;
};
const ExamIntroduction = ({ exam }: Props) => {
    return (
        <section className="w-full flex flex-col gap-4 items-center">
            {exam && (
                <>
                    <img
                        src={exam?.thumbnail!}
                        alt="thumb"
                        className="w-[300px] aspect-video object-cover rounded-lg"
                    />
                    <h1 className="text-xl font-semibold">{exam?.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: exam?.introduction ?? "",
                        }}
                        className="text-base"
                    />
                </>
            )}
        </section>
    );
};

export default ExamIntroduction;
