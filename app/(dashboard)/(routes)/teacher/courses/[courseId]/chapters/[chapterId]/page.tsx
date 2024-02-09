import { IconBadge } from "@/components/icon-badge";
import CourseService from "@/services/course/courseService";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterService from "@/services/chapter/chapter-service";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    chapterId: number;
    courseId: number;
  };
}) => {
  const chapter = await ChapterService.getChapterById(params.chapterId);

  if (!chapter) {
    redirect("/");
  }
  const requiredFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields}/${totalFields}`;

  const isCompleted = requiredFields.every(Boolean);
  return (
    <>
      {!chapter?.isPublished && (
        <Banner
          label="This chapter is unpublished. This is not visible in the course"
          variant={"warning"}
        />
      )}
      <main className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6 gap-x-2"
            >
              <ArrowLeft />
              Back to course set up
            </Link>
            <section className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium"> Chapter Creation</h1>
                <span>Complete all fields ({completedText})</span>
              </div>
              <ChapterActions
                disabled={!isCompleted}
                courseId={params.courseId}
                chapterId={chapter?.id}
                isPublished={chapter.isPublished}
              />
            </section>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4 ">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm initialData={chapter} chapterId={chapter?.id} />
              <ChapterDescriptionForm
                initialData={chapter}
                chapterId={chapter?.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                chapterId={chapter?.id}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} chapterId={chapter?.id} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ChapterIdPage;
