"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ICourse } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import * as z from "zod";
import CourseService from "@/services/course/courseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import img from "next/image";
import { FileUpload } from "@/components/file-upload";

type Props = {
    initialData: ICourse;
    courseId: string;
};

const formSchema = z.object({
    url: z.string().min(1),
});
const AttachmentForm = ({ initialData, courseId }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await CourseService.addAttachment(
            courseId,
            values?.url
        );
        if (_course) {
            toast.success("Course updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    const onDelete = async (attachmentId: string) => {
        setDeletingId(attachmentId);
        const _attachment = await CourseService.deleteAttachment(attachmentId);
        if (_attachment) {
            toast.success("Deleted attachment");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting && "Cancel"}

                    {!isEditting && !initialData?.imageUrl && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add an img
                        </>
                    )}
                    {!isEditting && initialData?.imageUrl && (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit img
                        </>
                    )}
                </Button>
            </div>
            {!isEditting && (
                <>
                    {initialData?.attachments?.length == 0 && (
                        <p className="text-sm italic text-slate-500 mt-2">
                            No attachments
                        </p>
                    )}
                    {initialData?.attachments?.length > 0 && (
                        <div className="space-y-2">
                            {initialData?.attachments?.map((attachment) => {
                                return (
                                    <div
                                        key={"attachment" + attachment?.id}
                                        className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                    >
                                        <File className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <p className="text-xs line-clamp-1">
                                            {attachment?.name}
                                        </p>
                                        {deletingId == attachment?.id && (
                                            <div>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        )}
                                        {deletingId != attachment?.id && (
                                            <button
                                                onClick={() => {
                                                    onDelete(attachment?.id);
                                                }}
                                                className="ml-auto hover:opacity-75 transition"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
            {isEditting && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                console.log(url);
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your students might need to complete
                        course.
                    </div>
                </div>
            )}
        </section>
    );
};

export default AttachmentForm;
