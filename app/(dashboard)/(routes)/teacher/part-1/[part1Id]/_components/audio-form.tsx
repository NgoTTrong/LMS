"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPart1 } from "@/interfaces/part-1/part-1-interface";
import Part1Service from "@/services/part-1/part-1-service";
import * as z from "zod";
import toast from "react-hot-toast";
import { AudioLinesIcon, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

type Props = {
    initialData: IPart1;
    part1Id: string;
};

const formSchema = z.object({
    audioUrl: z.string().min(1, {
        message: "Audio is required",
    }),
});

const AudioForm = ({ initialData, part1Id }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await Part1Service.updatePart1(part1Id, {
            audioUrl: values?.audioUrl,
        });
        if (_course) {
            toast.success("Part 1 updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Part 1 audio
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting && "Cancel"}

                    {!isEditting && !initialData?.audioUrl && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add an Audio
                        </>
                    )}
                    {!isEditting && initialData?.audioUrl && (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Audio
                        </>
                    )}
                </Button>
            </div>
            {!isEditting &&
                (!initialData?.audioUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <AudioLinesIcon className="w-10 h-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="w-full ">
                        <audio
                            src={initialData?.audioUrl}
                            controls
                            className="w-full  "
                        ></audio>
                    </div>
                ))}
            {isEditting && (
                <div>
                    <FileUpload
                        endpoint="audio"
                        onChange={(url) => {
                            if (url) {
                                console.log(url);
                                onSubmit({ audioUrl: url });
                            }
                        }}
                    />
                </div>
            )}
        </section>
    );
};

export default AudioForm;
