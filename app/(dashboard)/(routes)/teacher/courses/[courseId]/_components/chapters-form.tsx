"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICourse } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PlusCircle } from "lucide-react";
import * as z from "zod";
import CourseService from "@/services/course/courseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  initialData: ICourse;
  courseId: number;
};

const formSchema = z.object({
  title: z.string().min(1),
});
const ChaptersForm = ({ initialData, courseId }: Props) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const _course = await CourseService.addChapter(courseId, {
      title: values?.title,
    });
    if (_course) {
      toast.success("Chapter added");
    } else {
      toast.error("Something went wrong!");
    }
    setIsCreating(false);
    router.refresh();
  };
  return (
    <section className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button
          variant={"ghost"}
          onClick={() => setIsCreating((state) => !state)}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction to the course'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.chapters?.length && "text-slate-500 italic"
          )}
        >
          {initialData?.chapters?.length
            ? initialData?.chapters?.length
            : "No chapters"}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and Drop to reorder the chapters
        </p>
      )}
    </section>
  );
};

export default ChaptersForm;
