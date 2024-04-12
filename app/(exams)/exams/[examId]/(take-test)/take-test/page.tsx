import { useServerAuth } from "@/hooks/use-server-auth";
import StartScreen from "../_components/start-screen";
import ExamService from "@/services/exam/exam-service";
import { redirect } from "next/navigation";
import ExamIntroduction from "../_components/introduction";
import IntroductSections from "../_components/introduction-sections";
import TakeTestSection from "../_components/take-test-section";

type Props = {
    params: {
        examId: string;
    };
};
const TakeTestPage = async ({ params }: Props) => {
    const user = await useServerAuth();
    const exam = await ExamService.getExamById(params?.examId);
    if (!exam) {
        redirect("/");
    }
    return (
        <main className="max-w-[1440px] flex-1 flex w-full h-full mt-6 gap-6 px-6">
            <IntroductSections />
            <TakeTestSection />
            {/* <ExamIntroduction exam={exam} />
			<StartScreen examId={exam?.id} /> */}
        </main>
    );
};

export default TakeTestPage;
