import Banner from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/title-form";
import { redirect } from "next/navigation";
import ExamService from "@/services/exam/exam-service";
import { currentUser } from "@clerk/nextjs";
import CategoryForm from "./_components/category-form";
import IntroductionForm from "./_components/introduction-form";
import ThumbnailForm from "./_components/thumbnail-form";
import Part1Form from "./_components/part1-form";
import Part2Form from "./_components/part2-form";
import Part3Form from "./_components/part3-form";
import Part4Form from "./_components/part4-form";
import Part5Form from "./_components/part5-form";
import Part6Form from "./_components/part6-form";
import Part7Form from "./_components/part7-form";

type Props = {
    params: {
        examId: string;
    };
};

const ExamIdPage = async ({ params }: Props) => {
    const { examId } = params;
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const exam = await ExamService.getById(examId);
    if (!exam) {
        redirect("/");
    }
    const categories = await ExamService.getAllCategory();
    return (
        <>
            <Banner label="This exam is unpublished. It will not be visible to the students" />
            <main className="p-6">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium ">Exam setup</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <section>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your exam </h2>
                        </div>
                        <TitleForm initialData={exam} examId={exam.id} />
                        <IntroductionForm initialData={exam} examId={exam.id} />
                        <CategoryForm
                            initialData={exam}
                            examId={examId}
                            options={categories.map((category) => ({
                                label: category?.name,
                                value: String(category?.id),
                            }))}
                        />
                        <ThumbnailForm initialData={exam} examId={exam.id} />
                    </section>
                    <section className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">Exam part</h2>
                            </div>
                        </div>
                        <Part1Form initialData={exam} examId={exam.id} />
                        <Part2Form initialData={exam} examId={exam.id} />
                        <Part3Form initialData={exam} examId={exam.id} />
                        <Part4Form initialData={exam} examId={exam.id} />
                        <Part5Form initialData={exam} examId={exam.id} />
                        <Part6Form initialData={exam} examId={exam.id} />
                        <Part7Form initialData={exam} examId={exam.id} />
                    </section>
                </div>
            </main>
        </>
    );
};

export default ExamIdPage;
