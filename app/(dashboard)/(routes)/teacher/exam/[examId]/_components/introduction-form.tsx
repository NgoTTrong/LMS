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
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { IExam } from "@/interfaces/exam/exam-interface";
import ExamService from "@/services/exam/exam-service";

type Props = {
    initialData: IExam;
    examId: string;
};

const formSchema = z.object({
    introduction: z.string().min(1, {
        message: "Introduction is required",
    }),
});
const IntroductionForm = ({ initialData, examId }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _exam = await ExamService.updateExam(examId, {
            introduction: values?.introduction,
        });
        if (_exam) {
            toast.success("Exam updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Exam introduction
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit introduction
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData?.introduction && "text-slate-500 italic"
                    )}
                >
                    {initialData?.introduction ?? "No introduction"}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="introduction"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                disabled={isSubmitting}
                                                placeholder="e.g. 'This exam is about...'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            )}
        </section>
    );
};

export default IntroductionForm;
