"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CourseService from "@/services/course/courseService";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});
const Part1CreatePage = () => {
    const router = useRouter();
    const { userId } = useAuth();
    if (!userId) {
        redirect("/");
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await CourseService.createCourse(userId, values);
        if (_course) {
            router.push(`/teacher/courses/${_course?.id}`);
            toast.success("Course Created");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <main className="p-6">
            <div>
                <h1 className="text-2xl">Name your part 1 </h1>
                <p>
                    What would you like to name your part 1? Don&apos;t worry,
                    you can change this later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Advanced web development"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button variant={"ghost"} type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default Part1CreatePage;
