import Banner from "@/components/banner";
import ChapterService from "@/services/chapter/chapter-service";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CoursePayment from "./_components/course-payment";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: number;
    chapterId: number;
  };
}) => {
  const chapterData = await ChapterService.getChapterDetailById(
    params.courseId,
    params.chapterId,
    1
  );
  if (!chapterData || !chapterData?.course || !chapterData?.chapter) {
    redirect("/");
  }
  const isLocked = !chapterData?.chapter?.isFree && !chapterData?.payment;
  const completeOnEnd =
    !!chapterData?.payment && !chapterData?.userProgress?.isCompleted;
  return (
    <main>
      {chapterData?.userProgress?.isCompleted && (
        <Banner
          label="You already completed this chapter."
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner label="You need to purchase this course to watch this chapter." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterData?.chapter?.id}
            videoUrl={chapterData?.chapter?.videoUrl!}
            title={chapterData?.chapter?.title}
            courseId={chapterData?.course?.id}
            nextChapterId={chapterData?.nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="">
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapterData?.chapter?.title}
            </h2>
            {chapterData?.payment ? (
              <CourseProgressButton
                courseId={chapterData?.course?.id}
                chapterId={chapterData?.chapter?.id}
                nextChapterId={chapterData?.nextChapter?.id}
                isCompleted={chapterData?.userProgress?.isCompleted}
              />
            ) : (
              <CoursePayment
                courseId={chapterData?.course?.id}
                price={chapterData?.course?.price!}
              />
            )}
          </div>
          <Separator />
          <Preview value={chapterData?.chapter?.description!} />
          {!!chapterData?.attachments?.length && (
            <>
              <Separator />
              <div className="p-4">
                {chapterData?.attachments?.map((attachment, idx) => {
                  return (
                    <a
                      href={attachment?.url}
                      key={"att-" + idx}
                      target="_blank"
                      className="flex items-center p-3 w-full bg-sky-200 border text-sky-600 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">{attachment?.name}</p>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChapterIdPage;
