import CourseService from "@/services/course/courseService";
import Categories from "./_components/categories";
import SearchInput from "@/components/navbar/search-input";
import CoursesList from "./_components/courses-list";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryItem from "./_components/category-item";
import { ICategoryCourse } from "@/interfaces/course/course-interface";
import ExamService from "@/services/exam/exam-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExamsList from "./_components/exams-list";

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
    let courseCategories = await CourseService.getAllCategoryCourse();
    let courses = await CourseService.getAllCoursesByUser(
        user.id,
        searchParams?.title,
        searchParams?.categoryId
    );

    let examCategories = await ExamService.getAllCategory();
    let exams = await ExamService.getAllByUser(user?.id);

    console.log(exams);
    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-6 block">
                <SearchInput />
            </div>
            <main className="p-6 space-y-4">
                <Tabs defaultValue="course">
                    <TabsList className="grid w-[500px] grid-cols-2 h-12 bg-blue-300">
                        <TabsTrigger
                            value="course"
                            defaultChecked={true}
                            className="flex justify-center items-center "
                        >
                            <span className="text-lg"> Course</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="exam"
                            className="flex justify-center items-center"
                        >
                            <span className="text-lg"> Exam</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="course" className="w-full">
                        <Categories items={courseCategories} />
                        <CoursesList items={courses} />
                    </TabsContent>
                    <TabsContent value="exam">
                        <Categories items={examCategories} />
                        <ExamsList exams={exams ?? []} />
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
};

export default SearchPage;
