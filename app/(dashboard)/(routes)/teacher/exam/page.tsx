import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import ExamService from "@/services/exam/exam-service";

const ExamPage = async () => {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	const exams = await ExamService.getAll(user?.id);

	return (
		<main className="p-6">
			<DataTable data={exams} columns={columns} />
		</main>
	);
};

export default ExamPage;
