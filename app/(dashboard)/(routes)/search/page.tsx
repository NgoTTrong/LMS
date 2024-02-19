import CourseService from "@/services/course/courseService";
import Categories from "./_components/categories";
import SearchInput from "@/components/navbar/search-input";
import CoursesList from "./_components/courses-list";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
    const categories = await CourseService.getAllCategoryCourse();
    const courses = await CourseService.getAllCoursesByUser(
        user.id,
        searchParams?.title,
        searchParams?.categoryId
    );
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
