"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import * as z from "zod";
import CourseService from "@/services/course/courseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { IPart6 } from "@/interfaces/part-6/part-6-interface";
import Part6Service from "@/services/part-6/part-6-service";

type Props = {
    initialData: IPart6;
    part6Id: string;
};

const formSchema = z.object({
    thumbnail: z.string().min(1, {
        message: "Image is required",
    }),
});
const ThumbnailForm = ({ initialData, part6Id }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await Part6Service.updatePart6(part6Id, {
            thumbnail: values?.thumbnail,
        });
        if (_course) {
            toast.success("Part 6 updated");
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

                    {!isEditting && !initialData?.thumbnail && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add an Image
                        </>
                    )}
                    {!isEditting && initialData?.thumbnail && (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Image
                        </>
                    )}
                </Button>
            </div>
            {!isEditting &&
                (!initialData?.thumbnail ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            src={initialData?.thumbnail}
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
                                onSubmit({ thumbnail: url });
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

export default ThumbnailForm;
