"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPart1 } from "@/interfaces/part-1/part-1-interface";
import Part1Service from "@/services/part-1/part-1-service";
import * as z from "zod";
import toast from "react-hot-toast";

type Props = {
    initialData: IPart1;
    part1Id: string;
};

const formSchema = z.object({
    thumbnail: z.string().min(1, {
        message: "Audio is required",
    }),
});

const AudioForm = ({ initialData, part1Id }: Props) => {
    const [isEditting, setEditting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _course = await Part1Service.updatePart1(part1Id, {
            thumbnail: values?.thumbnail,
        });
        if (_course) {
            toast.success("Part 1 updated");
        } else {
            toast.error("Something went wrong!");
        }
        setEditting(false);
        router.refresh();
    };
    return "addAudio";
};

export default AudioForm;
