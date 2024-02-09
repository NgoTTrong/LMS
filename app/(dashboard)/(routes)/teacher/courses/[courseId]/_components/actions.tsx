"use client";

import ConfirmModal from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import ChapterService from "@/services/chapter/chapter-service";
import CourseService from "@/services/course/courseService";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  courseId: number;
  isPublished: boolean;
};
const Actions = ({ disabled, courseId, isPublished }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onUnpublish = async () => {
    try {
      setIsLoading(true);
      const _chapter = await CourseService.updateCourseById(courseId, {
        isPublished: isPublished ? false : true,
      });
      if (_chapter) {
        toast.success(isPublished ? "Course unpublished" : "Course published");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      const _chapter = await CourseService.deleteCourse(courseId);
      if (_chapter) {
        toast.success("Chapter deleted");
        router.refresh();
        router.push(`/teacher/courses/create`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex items-center gap-x-2">
      <Button
        onClick={onUnpublish}
        disabled={disabled || isLoading}
        variant={"outline"}
        size="sm"
      >
        {isPublished ? "Unpublished" : "Published"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </section>
  );
};

export default Actions;
