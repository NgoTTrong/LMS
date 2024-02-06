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
import { Pencil } from "lucide-react";
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
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
const DescriptionForm = ({ initialData, courseId }: Props) => {
  const [isEditting, setEditting] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const _course = await CourseService.updateCourseById(courseId, {
      description: values?.description,
    });
    if (_course) {
      toast.success("Course updated");
    } else {
      toast.error("Something went wrong!");
    }
    setEditting(false);
    router.refresh();
  };
  return (
    <section className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button
          variant={"ghost"}
          onClick={() => setEditting((state) => !state)}
        >
          {isEditting ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditting ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description ?? "No description"}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'This course is about...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
};

export default DescriptionForm;
