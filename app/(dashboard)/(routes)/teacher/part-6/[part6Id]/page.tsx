import { IconBadge } from "@/components/icon-badge";
import Part6Service from "@/services/part-6/part-6-service";
import { currentUser } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import IntroductionForm from "./_components/introduction-form";
import ThumbnailForm from "./_components/thumbnail-form";
import QuestionsForm from "./_components/questions-form";

type Props = {
    params: {
        part6Id: string;
    };
};
const Part6IdPage = async ({ params }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }
    const part6 = await Part6Service.getOne(params.part6Id, user.id);
    if (!part6) {
        redirect("/");
    }
    const requiredFields = [
        part6?.introduction,
        part6?.title,
        part6?.thumbnail,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <main className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium ">Part 6 setup</h1>
                    <span>Complete all fields ({completionText})</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <section>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your part 6 </h2>
                    </div>
                    <TitleForm initialData={part6} part6Id={part6.id} />
                    <IntroductionForm initialData={part6} part6Id={part6.id} />
                    <ThumbnailForm initialData={part6} part6Id={part6.id} />
                </section>
                <section className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">Part 6 questions</h2>
                        </div>
                        <QuestionsForm initialData={part6} part6Id={part6.id} />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Part6IdPage;
