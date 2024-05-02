import { IconBadge } from "@/components/icon-badge";
import CourseService from "@/services/course/courseService";
import {
	CircleDollarSign,
	File,
	LayoutDashboard,
	ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";
import Banner from "@/components/banner";
import Actions from "./_components/actions";
import { auth, currentUser } from "@clerk/nextjs";

const CourseIdPage = async ({
	params,
}: {
	params: {
		courseId: string;
	};
}) => {
	const { courseId } = params;
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	const course = await CourseService.getCourseById(courseId, user.id);
	if (!course) {
		console.log(course);
		redirect("/");
	}
	const categories = await CourseService.getAllCategoryCourse();
	const requiredFields = [
		course?.description,
		course?.title,
		course?.categoryId,
		course?.imageUrl,
		course?.price,
		course?.chapters?.some((chapter) => chapter?.isPublished),
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isComplete = requiredFields.every(Boolean);
	return (
		<>
			{!course?.isPublished && (
				<Banner label="This course is unpublished. It will not be visible to the students" />
			)}
			<main className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h1 className="text-2xl font-medium ">Course setup</h1>
						<span>Complete all fields ({completionText})</span>
					</div>
					<Actions
						disabled={!isComplete}
						courseId={params?.courseId}
						isPublished={course?.isPublished}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<section>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Customize your course </h2>
						</div>
						<TitleForm initialData={course} courseId={courseId} />
						<DescriptionForm
							initialData={course}
							courseId={courseId}
						/>
						<ImageForm initialData={course} courseId={courseId} />
						<CategoryForm
							initialData={course}
							courseId={courseId}
							options={categories.map((category) => ({
								label: category?.name,
								value: String(category?.id),
							}))}
						/>
					</section>
					<section className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Course chapters</h2>
							</div>
							<ChaptersForm
								initialData={course}
								courseId={courseId}
							/>
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CircleDollarSign} />
								<h2 className="text-xl">Sell your course</h2>
							</div>
							<PriceForm
								initialData={course}
								courseId={courseId}
							/>
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={File} />
								<h2 className="text-xl">
									Resourses & Attachments
								</h2>
							</div>
							<AttachmentForm
								initialData={course}
								courseId={courseId}
							/>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default CourseIdPage;
