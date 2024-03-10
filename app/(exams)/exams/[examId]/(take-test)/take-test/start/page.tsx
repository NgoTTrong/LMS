"use client";
import { useEffect, useState } from "react";
import QuestionSidebar from "./_components/question-sidebar";
import TestingSection from "./_components/testing-section";
import TimerBar from "./_components/timer-bar";
import ExamService from "@/services/exam/exam-service";
import LoadingModal from "@/components/loading/loading-modal";
import { IExamDetail } from "@/interfaces/exam/exam-interface";

type Props = {
	params: {
		examId: string;
	};
};
const StartPage = ({ params }: Props) => {
	const [exam, setExam] = useState<IExamDetail>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchExamDetail = async () => {
			setIsLoading(true);
			const _exam = await ExamService.getExamDetailById(params?.examId);
			if (_exam) setExam(_exam);
			setIsLoading(false);
		};
		fetchExamDetail();
	}, [params?.examId]);
	return (
		<main className="w-full h-full flex-1 flex flex-col items-center relative overflow-x-hidden">
			{exam && (
				<>
					<TimerBar />
					<QuestionSidebar examDetail={exam} />
					<TestingSection />
				</>
			)}

			{isLoading && <LoadingModal />}
		</main>
	);
};

export default StartPage;
