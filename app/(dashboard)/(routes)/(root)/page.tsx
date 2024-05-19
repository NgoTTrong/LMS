import CourseService from "@/services/course/courseService";
import CoursesList from "../search/_components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";
import { currentUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExamService from "@/services/exam/exam-service";
import { redirect } from "next/navigation";
import HistoriesList from "./_components/histories-list";
import PracticeCourseService from "@/services/practice-course/practice-course-service";
import PracticeCoursesList from "./_components/practice-courses-list";

const Dashboard = async () => {
	const user = await currentUser();
	if (!user?.id) {
		redirect("/search");
	}
	const { completedCourses, inCompletedCourses } =
		await CourseService.getDashboardCoursesByUser(user?.id);
	const histories = await ExamService.getHistories(user?.id);
	const {
		completedCourses: completedPracticeCourses,
		inCompletedCourses: inCompletedPracticeCourses,
	} = await PracticeCourseService.getAllCourses(user?.id);
	return (
		<main className="p-6 space-y-4">
			<Tabs defaultValue="course">
				<TabsList className="px-0 mx-0 w-full overflow-auto">
					<TabsTrigger
						value="course"
						defaultChecked={true}
						className="flex justify-center items-center"
					>
						<span className="text-lg">Course</span>
					</TabsTrigger>
					<TabsTrigger
						value="history"
						className="flex justify-center items-center"
					>
						<span className="text-lg"> History</span>
					</TabsTrigger>
					<TabsTrigger
						value="practice"
						className="flex justify-center items-center"
					>
						<span className="text-lg"> Practice</span>
					</TabsTrigger>
				</TabsList>
				<hr />
				<TabsContent value="course" className="w-full">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
						<InfoCard
							icon={Clock}
							label="In Progress"
							numOfItems={inCompletedCourses?.length}
						/>
						<InfoCard
							icon={CheckCircle}
							label="Completed"
							variant="success"
							numOfItems={completedCourses?.length}
						/>
					</div>
					<CoursesList
						items={[...completedCourses, ...inCompletedCourses]}
					/>
				</TabsContent>
				<TabsContent value="history">
					<HistoriesList items={[...histories]} />
				</TabsContent>
				<TabsContent value="practice">
					<PracticeCoursesList
						items={[
							...completedPracticeCourses,
							...inCompletedPracticeCourses,
						]}
					/>
				</TabsContent>
			</Tabs>
		</main>
	);
};

export default Dashboard;
