import { IconBadge } from "@/components/icon-badge";
import Part2Service from "@/services/part-2/part-2-service";
import { currentUser } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import IntroductionForm from "./_components/introduction-form";
import ThumbnailForm from "./_components/thumbnail-form";
import QuestionsForm from "./_components/questions-form";
import AudioForm from "./_components/audio-form";

type Props = {
    params: {
        part2Id: string;
    };
};
const Part2IdPage = async ({ params }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }
    const part2 = await Part2Service.getOne(params.part2Id, user.id);
    if (!part2) {
        redirect("/");
    }
    const requiredFields = [
        part2?.introduction,
        part2?.title,
        part2?.thumbnail,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);
    return (
        <main className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium ">Part 2 setup</h1>
                    <span>Complete all fields ({completionText})</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <section>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your part 2 </h2>
                    </div>
                    <TitleForm initialData={part2} part2Id={part2.id} />
                    <IntroductionForm initialData={part2} part2Id={part2.id} />
                    <ThumbnailForm initialData={part2} part2Id={part2.id} />
                    <AudioForm initialData={part2} part2Id={part2.id} />
                </section>
                <section className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">Part 2 questions</h2>
                        </div>
                        <QuestionsForm initialData={part2} part2Id={part2.id} />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Part2IdPage;
