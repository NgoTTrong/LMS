"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ICourse } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
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
    imageUrl: z.string().min(1, {
        message: "img is required",
    }),
});
const ImageForm = ({ initialData, courseId }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await CourseService.updateCourseById(courseId, {
            imageUrl: values?.imageUrl,
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
            {!isEditting &&
                (!initialData?.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <img
                            alt="Upload"
                            src={initialData?.imageUrl}
                            className="object-cover rounded-md"
                        />
                    </div>
                ))}
            {isEditting && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                console.log(url);
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </section>
    );
};

export default ImageForm;
