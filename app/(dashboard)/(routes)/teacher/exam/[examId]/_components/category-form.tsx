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
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import * as z from "zod";
import CourseService from "@/services/course/courseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComboBox } from "@/components/ui/combo-box";
import { IExam } from "@/interfaces/exam/exam-interface";
import ExamService from "@/services/exam/exam-service";

type Props = {
    initialData: IExam;
    examId: string;
    options: { label: string; value: string }[];
};

const formSchema = z.object({
    categoryId: z.string(),
});
const CategoryForm = ({ initialData, examId, options }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _exam = await ExamService.updateExam(examId, {
            categoryId: values?.categoryId,
        });
        if (_exam) {
            toast.success("Exam updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    const selectedOption = options.find(
        (option) => option?.value == String(initialData?.categoryId)
    );
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData?.categoryId && "text-slate-500 italic"
                    )}
                >
                    {selectedOption?.label ?? "No category"}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        // onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <ComboBox
                                                value={initialData.categoryId}
                                                options={options}
                                                onChange={(option) => {
                                                    if (option) {
                                                        onSubmit({
                                                            categoryId: option,
                                                        });
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </form>
                </Form>
            )}
        </section>
    );
};

export default CategoryForm;
