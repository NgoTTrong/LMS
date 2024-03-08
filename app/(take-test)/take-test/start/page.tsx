import QuestionSidebar from "./_components/question-sidebar";
import TestingSection from "./_components/testing-section";
import TimerBar from "./_components/timer-bar";

const StartPage = () => {
	return (
		<main className="w-full h-full flex-1 flex flex-col relative overflow-x-hidden">
			<TimerBar />
			<QuestionSidebar />
			<TestingSection />
		</main>
	);
};

export default StartPage;
