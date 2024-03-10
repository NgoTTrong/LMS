import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ExamSidebar from "./_components/exam-sidebar";
import ExamNavbar from "./_components/exam-navbar";
import HeaderBar from "./_components/header-bar";

type Props = {
	children: React.ReactNode;
	params: {
		courseId: string;
	};
};

const ExamLayout = async ({ children, params }: Props) => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}
	return (
		<main className="w-full h-full min-h-screen flex flex-col items-center">
			<HeaderBar />
			{children}
		</main>
	);
};

export default ExamLayout;
