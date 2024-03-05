"use client";
import { useEffect, useState } from "react";
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
import { Loader2, Pencil } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComboBox } from "@/components/ui/combo-box";
import { IExam } from "@/interfaces/exam/exam-interface";
import Part3Service from "@/services/part-3/part-3-service";
import { useAuth } from "@clerk/nextjs";
import ExamService from "@/services/exam/exam-service";

type Props = {
    initialData: IExam;
    examId: string;
};

const formSchema = z.object({
    part3Id: z.string(),
});
const Part3Form = ({ initialData, examId }: Props) => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        []
    );
    const { userId } = useAuth();
    if (!userId) {
        redirect("/");
    }
    const [isEditting, setEditting] = useState<boolean>(false);
    const [isLoadingPart3, setIsLoadingPart3] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { part3Id: initialData?.part3?.id },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await ExamService.updateExam(examId, {
            part3Id: values?.part3Id,
        });
        if (_course) {
            toast.success("Exam updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    useEffect(() => {
        const fetchPart3s = async () => {
            setIsLoadingPart3(true);
            const _part3s = await Part3Service.getAllPart3(userId);
            setOptions(
                _part3s?.map((part3) => ({
                    label: part3.title ?? "",
                    value: part3.id,
                }))
            );
            setIsLoadingPart3(false);
        };
        fetchPart3s();
    }, []);
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Part 3
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit part 3
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData?.part3?.id && "text-slate-500 italic"
                    )}
                >
                    {options.find(
                        (option) =>
                            option?.value == String(initialData?.part3?.id)
                    )?.label ?? "No part 3"}
                </p>
            ) : isLoadingPart3 ? (
                <div className="flex items-center justify-center w-full py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                </div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="part3Id"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <ComboBox
                                                options={options}
                                                onChange={(option) => {
                                                    if (option) {
                                                        onSubmit({
                                                            part3Id: option,
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

export default Part3Form;
