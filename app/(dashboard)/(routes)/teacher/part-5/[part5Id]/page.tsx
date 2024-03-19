import { IconBadge } from "@/components/icon-badge";
import Part5Service from "@/services/part-5/part-5-service";
import { currentUser } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import IntroductionForm from "./_components/introduction-form";
import QuestionsForm from "./_components/questions-form";
import ThumbnailForm from "./_components/thumbnail-form";

type Props = {
    params: {
        part5Id: string;
    };
};
const Part5IdPage = async ({ params }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }
    const part5 = await Part5Service.getOne(params.part5Id, user.id);
    if (!part5) {
        redirect("/");
    }
    const requiredFields = [
        part5?.introduction,
        part5?.title,
        part5?.thumbnail,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);
    return (
        <main className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium ">Part 5 setup</h1>
                    <span>Complete all fields ({completionText})</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <section>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your part 5 </h2>
                    </div>
                    <TitleForm initialData={part5} part5Id={part5.id} />
                    <IntroductionForm initialData={part5} part5Id={part5.id} />
                    <ThumbnailForm initialData={part5} part5Id={part5.id} />
                </section>
                <section className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">Part 5 questions</h2>
                        </div>
                        <QuestionsForm initialData={part5} part5Id={part5.id} />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Part5IdPage;
