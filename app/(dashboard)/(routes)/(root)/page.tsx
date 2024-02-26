import CourseService from "@/services/course/courseService";
import CoursesList from "../search/_components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";
import { currentUser } from "@clerk/nextjs";

const Dashboard = async () => {
	const user = await currentUser();
	const { completedCourses, inCompletedCourses } =
		await CourseService.getDashboardCoursesByUser(user?.id);
	return (
		<main className="p-6 space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
			<CoursesList items={[...completedCourses, ...inCompletedCourses]} />
		</main>
	);
};

export default Dashboard;
