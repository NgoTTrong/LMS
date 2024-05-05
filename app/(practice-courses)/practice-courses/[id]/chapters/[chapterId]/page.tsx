import Banner from "@/components/banner";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import CourseProgressButton from "./_components/course-progress-button";
import { currentUser } from "@clerk/nextjs";
import QuestionCard from "./_components/question-card";
import PracticeCourseService from "@/services/practice-course/practice-course-service";

const ChapterIdPage = async ({
	params,
}: {
	params: {
		id: string;
		chapterId: string;
	};
}) => {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	const chapterData = await PracticeCourseService.getChapterDetailById(
		params.id,
		params.chapterId,
		user.id
	);
	if (!chapterData || !chapterData?.course || !chapterData?.chapter) {
		redirect("/");
	}
	const completeOnEnd = !chapterData?.userProgress?.isCompleted;
	return (
		<main>
			{chapterData?.userProgress?.isCompleted && (
				<Banner
					label="You already completed this chapter."
					variant={"success"}
				/>
			)}

			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				<div className="p-4">
					<VideoPlayer
						chapterId={chapterData?.chapter?.chapterId}
						videoUrl={chapterData?.chapter?.chapter?.videoUrl!}
						title={chapterData?.chapter?.chapter?.title}
						courseId={chapterData?.course?.id}
						nextChapterId={chapterData?.nextChapter?.chapterId}
						completeOnEnd={completeOnEnd}
					/>
				</div>
				<div className="">
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">
							{chapterData?.chapter?.chapter?.title}
						</h2>

						<CourseProgressButton
							courseId={chapterData?.course?.id}
							chapterId={chapterData?.chapter?.chapterId}
							nextChapterId={chapterData?.nextChapter?.chapterId}
							isCompleted={chapterData?.userProgress?.isCompleted}
							point={chapterData?.course?.point}
						/>
					</div>
					<Separator />
					<Preview
						value={chapterData?.chapter?.chapter?.description!}
					/>

					{!!chapterData?.questions?.length && (
						<>
							<Separator />
							<div className="p-4 flex flex-col gap-4 w-full">
								{chapterData?.questions?.map(
									(question, idx) => {
										return (
											<QuestionCard
												chapterId={
													chapterData?.chapter
														?.chapterId
												}
												question={question}
												key={"question-" + idx}
												index={idx + 1}
												answers={
													chapterData?.userProgress
														?.answers
												}
											/>
										);
									}
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default ChapterIdPage;
