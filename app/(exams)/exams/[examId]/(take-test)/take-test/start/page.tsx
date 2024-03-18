"use client";
import { useEffect, useState } from "react";
import QuestionSidebar from "./_components/question-sidebar";
import TestingSection from "./_components/testing-section";
import TimerBar from "./_components/timer-bar";
import ExamService from "@/services/exam/exam-service";
import LoadingModal from "@/components/loading/loading-modal";
import { IExamDetail } from "@/interfaces/exam/exam-interface";
import examStore from "@/stores/exam/exam-store";

type Props = {
    params: {
        examId: string;
    };
};
const StartPage = ({ params }: Props) => {
    const {
        exam,
        setExam,
        currentPart,
        currentQuestion,
        setCurrentPart,
        setCurrentQuestion,
    } = examStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchExamDetail = async () => {
            setIsLoading(true);
            const _exam = await ExamService.getExamDetailById(params?.examId);
            if (_exam) {
                setExam(_exam);
                if (_exam?.part1) {
                    setCurrentPart(1);
                    setCurrentQuestion(
                        _exam?.part1?.part1Questions?.[0]?.questionId
                    );
                } else if (_exam?.part2) {
                    setCurrentPart(2);
                    setCurrentQuestion(
                        _exam?.part2?.part2Questions?.[0]?.questionId
                    );
                } else if (_exam?.part3) {
                    setCurrentPart(3);
                    setCurrentQuestion(
                        _exam?.part3?.part3Questions?.[0]
                            ?.groupPart3Questions?.[0]?.questionId
                    );
                } else if (_exam?.part4) {
                    setCurrentPart(4);
                    setCurrentQuestion(
                        _exam?.part4?.part4Questions?.[0]
                            ?.groupPart4Questions?.[0]?.questionId
                    );
                } else if (_exam?.part5) {
                    setCurrentPart(5);
                    setCurrentQuestion(
                        _exam?.part5?.part5Questions?.[0]?.questionId
                    );
                } else if (_exam?.part6) {
                    setCurrentPart(6);
                    setCurrentQuestion(
                        _exam?.part6?.part6Questions?.[0]
                            ?.groupPart6Questions?.[0]?.questionId
                    );
                } else if (_exam?.part7) {
                    setCurrentPart(7);
                    setCurrentQuestion(
                        _exam?.part7?.part7Questions?.[0]
                            ?.groupPart7Questions?.[0]?.questionId
                    );
                }
            }
            setIsLoading(false);
        };
        fetchExamDetail();
    }, [params?.examId]);

    return (
        <main className="w-full h-full max-h-full flex-1 flex flex-col items-center relative overflow-x-hidden">
            {exam && (
                <>
                    <TimerBar />
                    <QuestionSidebar examDetail={exam} />
                    {currentPart && currentQuestion && <TestingSection />}
                </>
            )}

            {isLoading && <LoadingModal />}
        </main>
    );
};

export default StartPage;
