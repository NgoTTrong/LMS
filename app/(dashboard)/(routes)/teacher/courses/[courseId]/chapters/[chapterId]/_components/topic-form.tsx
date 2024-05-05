"use client";

import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { IChapter } from "@/interfaces/course/course-interface";
import { ITopic } from "@/interfaces/question/question-interface";
import ChapterService from "@/services/chapter/chapter-service";
import TopicService from "@/services/topic/topic-service";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    chapterId: string;
    initialData: IChapter;
};
const TopicForm = ({ chapterId, initialData }: Props) => {
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [isEditting, setEditting] = useState<boolean>(false);
    const [isSubmitting, setIsSubmiting] = useState<boolean>(false);
    const [option, setOption] = useState<string>();
    const router = useRouter();
    useEffect(() => {
        const fetchTopics = async () => {
            const _topics = await TopicService.getAllTopics();
            setTopics(_topics);
        };
        fetchTopics();
    }, []);

    const onSubmit = async () => {
        setIsSubmiting(true);
        if (option) {
            const _course = await ChapterService.updateChapterId(chapterId, {
                topicId: option,
            });
            if (_course) {
                toast.success("Chapter updated");
            } else {
                toast.error("Something went wrong!");
            }
        } else {
            toast.error("Choose topic please!");
        }

        setIsSubmiting(false);
        setEditting(false);
        router.refresh();
    };
    return (
        <section className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter topic
                <Button
                    variant={"ghost"}
                    onClick={() => setEditting((state) => !state)}
                >
                    {isEditting ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit topic
                        </>
                    )}
                </Button>
            </div>
            {!isEditting ? (
                initialData?.topic?.name ? (
                    <p className="text-sm mt-2">{initialData?.topic?.name}</p>
                ) : (
                    <p className="text-sm mt-2 italic text-slate-500">
                        No topic
                    </p>
                )
            ) : (
                <div className="flex flex-col gap-4">
                    <ComboBox
                        options={topics.map((topic) => ({
                            label: topic.name,
                            value: topic.id,
                        }))}
                        value={option ?? initialData?.topicId ?? undefined}
                        onChange={(option) => {
                            setOption(option);
                        }}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit"
                        onClick={onSubmit}
                    >
                        Save
                    </Button>
                </div>
            )}
        </section>
    );
};

export default TopicForm;
