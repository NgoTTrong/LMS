import CourseService from "@/services/course/courseService";
import Categories from "./_components/categories";
import SearchInput from "@/components/navbar/search-input";
import CoursesList from "./_components/courses-list";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryItem from "./_components/category-item";
import { ICategoryCourse } from "@/interfaces/course/course-interface";
import ExamService from "@/services/exam/exam-service";

type Props = {
	searchParams: {
		title?: string;
		categoryId?: string;
	};
};
const SearchPage = async ({ searchParams }: Props) => {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	let categories = await CourseService.getAllCategoryCourse();
	// const data = await ExamService.getAllByUser(user?.id);
	// console.log(data);
	let courses = await CourseService.getAllCoursesByUser(
		user.id,
		searchParams?.title,
		searchParams?.categoryId
	);

	// let categories: ICategoryCourse[] = [
	//     {
	//         id: "1",
	//         name: "Full Test",
	//     },
	//     {
	//         id: "2",
	//         name: "Quick Test",
	//     },
	// ];

	return (
		<>
			<div className="px-6 pt-6 md:hidden md:mb-6 block">
				<SearchInput />
			</div>
			<main className="p-6 space-y-4">
				<Categories items={categories} />
				<CoursesList items={courses} />
			</main>
		</>
	);
};

export default SearchPage;
