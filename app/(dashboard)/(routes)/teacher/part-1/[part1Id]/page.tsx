import { IconBadge } from "@/components/icon-badge";
import Part1Service from "@/services/part-1/part-1-service";
import { currentUser } from "@clerk/nextjs";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import IntroductionForm from "./_components/introduction-form";
import ThumbnailForm from "./_components/thumbnail-form";
import QuestionsForm from "./_components/questions-form";

type Props = {
	params: {
		part1Id: string;
	};
};
const Part1IdPage = async ({ params }: Props) => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}
	const part1 = await Part1Service.getOne(params.part1Id, user.id);
	if (!part1) {
		redirect("/");
	}
	const requiredFields = [
		part1?.introduction,
		part1?.title,
		part1?.thumbnail,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isComplete = requiredFields.every(Boolean);
	return (
		<main className="p-6">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-2xl font-medium ">Part 1 setup</h1>
					<span>Complete all fields ({completionText})</span>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
				<section>
					<div className="flex items-center gap-x-2">
						<IconBadge icon={LayoutDashboard} />
						<h2 className="text-xl">Customize your part 1 </h2>
					</div>
					<TitleForm initialData={part1} part1Id={part1.id} />
					<IntroductionForm initialData={part1} part1Id={part1.id} />
					<ThumbnailForm initialData={part1} part1Id={part1.id} />
				</section>
				<section className="space-y-6">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={ListChecks} />
							<h2 className="text-xl">Part 1 questions</h2>
						</div>
						<QuestionsForm initialData={part1} part1Id={part1.id} />
					</div>
				</section>
			</div>
		</main>
	);
};

export default Part1IdPage;
