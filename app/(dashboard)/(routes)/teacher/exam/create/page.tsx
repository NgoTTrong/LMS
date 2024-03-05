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
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Part1Service from "@/services/part-1/part-1-service";
import { ComboBox } from "@/components/ui/combo-box";
import ExamService from "@/services/exam/exam-service";
import { useEffect, useState } from "react";
import { IExamCategory } from "@/interfaces/exam/exam-interface";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});
const ExamCreate = () => {
    const router = useRouter();
    const { userId } = useAuth();
    if (!userId) {
        redirect("/");
    }
    const [categories, setCategories] = useState<IExamCategory[]>([]);
    const [choosenCategoryId, setChoosenCategoryId] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _part1 = await ExamService.createExam(
            values.title,
            choosenCategoryId!,
            userId
        );
        if (_part1) {
            router.push(`/teacher/exam/${_part1?.id}`);
            toast.success("Exam Created");
        } else {
            toast.error("Something went wrong!");
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            const _categories = await ExamService.getAllCategory();
            setCategories(_categories);
        };
        fetchCategories();
    }, []);
    return (
        <main className="p-6">
            <div>
                <h1 className="text-2xl">Name your exam </h1>
                <p>
                    What would you like to name your exam? Don&apos;t worry, you
                    can change this later.
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
                                    <FormLabel>Exam title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Full Exam test ETS 2024"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you learn from this exam?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {categories?.length > 0 && (
                            <FormItem>
                                <FormLabel>Exam category</FormLabel>
                                <FormControl>
                                    <ComboBox
                                        options={categories.map((category) => ({
                                            label: category.name,
                                            value: category.id,
                                        }))}
                                        value={choosenCategoryId ?? undefined}
                                        onChange={function (value: string) {
                                            setChoosenCategoryId(value);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What category this exam belong to?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}

                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button variant={"ghost"} type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    !isValid ||
                                    !choosenCategoryId
                                }
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

export default ExamCreate;
