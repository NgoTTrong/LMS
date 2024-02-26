"use client";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPart2Question } from "@/interfaces/part-2/part-2-interface";
import { ITopic } from "@/interfaces/topic/topic-interface";
import part2Service from "@/services/part-1/part-1-service";
import TopicService from "@/services/topic/topic-service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
    question: IPart2Question;
};
export function ModalEditQuestion({ question, children }: Props) {
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [onEditImage, setOnEditImage] = useState<boolean>(false);
    const [onEditAudio, setOnEditAudio] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const fetchTopics = async () => {
            const _topics = await TopicService.getAllTopics();
            setTopics(_topics);
        };
        fetchTopics();
    }, []);
    const [form, setForm] = useState<{
        content?: string;
        optionA?: string;
        optionB?: string;
        optionC?: string;
        optionD?: string;
        correctAnswer?: "A" | "B" | "C" | "D";
        topicId?: string;
        explaination?: string;
        imageUrl?: string;
        audioUrl?: string;
    }>({});
    const disabled = () => {
        return (
            !form?.audioUrl ||
            !form?.content ||
            !form?.correctAnswer ||
            !form?.explaination ||
            !form?.imageUrl ||
            !form?.optionA ||
            !form?.optionB ||
            !form?.optionC ||
            !form?.optionD ||
            !form?.topicId
        );
    };
    useEffect(() => {
        setForm({
            content: question?.question?.content,
            optionA: question?.question?.optionA,
            optionB: question?.question?.optionB,
            optionC: question?.question?.optionC,
            optionD: question?.question?.optionD,
            correctAnswer: question?.explain?.answer,
            topicId: question?.topicId,
            explaination: question?.explain?.explain,
            audioUrl: question?.audioUrl,
        });
    }, [question]);
    const handleEditQuestion = async () => {
        try {
            setIsLoading(true);
            const _questionpart2 = await part2Service.updateQuestion(
                question?.id,
                {
                    id: question?.questionId,
                    optionA: form?.optionA,
                    optionC: form?.optionB,
                    optionB: form?.optionC,
                    optionD: form?.optionD,
                    content: form?.content,
                },
                {
                    id: question?.explain?.id,
                    explaination: form?.explaination,
                    correctAnswer: form?.correctAnswer,
                },
                form?.topicId,
                form?.imageUrl,
                form?.audioUrl
            );
            if (_questionpart2) {
                toast.success("Added question");
                router.refresh();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-auto">
                <DialogHeader>
                    <DialogTitle>Question content</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 w-full">
                    <section className="grid gap-4 py-4 w-full">
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="content" className="text-right">
                                Content
                            </Label>
                            <Input
                                id="content"
                                placeholder="eg. How old are you?"
                                className="w-full"
                                value={form?.content}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        content: event?.target?.value ?? "",
                                    });
                                }}
                            />
                        </div>
                        <hr />
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="optionA" className="text-right">
                                Option A
                            </Label>
                            <Input
                                id="optionA"
                                placeholder="eg. A: 13"
                                value={form?.optionA}
                                className="w-full"
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        optionA: event?.target?.value ?? "",
                                    });
                                }}
                            />
                        </div>
                        <hr />
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="optionB" className="text-right">
                                Option B
                            </Label>
                            <Input
                                id="optionB"
                                placeholder="eg. B: 14"
                                className="w-full"
                                value={form?.optionB}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        optionB: event?.target?.value ?? "",
                                    });
                                }}
                            />
                        </div>
                        <hr />

                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="optionC" className="text-right">
                                Option C
                            </Label>
                            <Input
                                id="optionC"
                                placeholder="eg. C: 15"
                                className="w-full"
                                value={form?.optionC}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        optionC: event?.target?.value ?? "",
                                    });
                                }}
                            />
                        </div>
                        <hr />

                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="optionD" className="text-right">
                                Option D
                            </Label>
                            <Input
                                id="optionD"
                                placeholder="eg. D: 16"
                                value={form?.optionD}
                                className="w-full"
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        optionD: event?.target?.value ?? "",
                                    });
                                }}
                            />
                        </div>
                        <hr />

                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label className="text-right">Correct Answer</Label>
                            <ComboBox
                                options={[
                                    { label: "A", value: "A" },
                                    { label: "B", value: "B" },
                                    { label: "C", value: "C" },
                                    { label: "D", value: "D" },
                                ]}
                                value={form?.correctAnswer}
                                onChange={(option) => {
                                    setForm({
                                        ...form,
                                        correctAnswer: option as
                                            | "A"
                                            | "B"
                                            | "C"
                                            | "D",
                                    });
                                }}
                            />
                        </div>
                        <hr />

                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label className="text-right">Topic</Label>
                            <ComboBox
                                value={form?.topicId}
                                options={topics.map((topic) => ({
                                    label: topic.name,
                                    value: topic.id,
                                }))}
                                onChange={(option) => {
                                    setForm({ ...form, topicId: option });
                                }}
                            />
                        </div>
                        <hr />

                        <div className="flex flex-col gap-4 justify-start items-start">
                            <Label htmlFor="explain" className="text-right">
                                Explaination
                            </Label>
                            <Editor
                                onChange={(value) => {
                                    setForm({ ...form, explaination: value });
                                }}
                                value={form?.explaination ?? ""}
                            />
                        </div>
                    </section>
                    <section className="flex flex-col gap-4 py-4 w-full">
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <h1 className="flex items-center justify-between w-full">
                                <h1>Image</h1>
                                {onEditImage ? (
                                    <span
                                        onClick={() => setOnEditImage(false)}
                                        className="text-sm hover:cursor-pointer"
                                    >
                                        Cancel
                                    </span>
                                ) : (
                                    <Pencil
                                        className="h-4 w-4"
                                        onClick={() => setOnEditImage(true)}
                                    />
                                )}
                            </h1>
                            <div>
                                {form?.imageUrl && !onEditImage ? (
                                    <img
                                        src={form?.imageUrl}
                                        alt=""
                                        className="w-full aspect-video rounded-lg"
                                    />
                                ) : (
                                    <FileUpload
                                        endpoint="courseImage"
                                        onChange={(url) => {
                                            if (url) {
                                                setForm({
                                                    ...form,
                                                    imageUrl: url,
                                                });
                                            }
                                        }}
                                    />
                                )}

                                <div className="text-xs text-muted-foreground mt-4">
                                    16:9 aspect ratio recommended
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 justify-start items-start w-full">
                            <h1 className="flex items-center justify-between w-full">
                                <h1>Audio</h1>
                                {onEditAudio ? (
                                    <span
                                        onClick={() => setOnEditAudio(false)}
                                        className="text-sm hover:cursor-pointer"
                                    >
                                        Cancel
                                    </span>
                                ) : (
                                    <Pencil
                                        className="h-4 w-4"
                                        onClick={() => setOnEditAudio(true)}
                                    />
                                )}
                            </h1>{" "}
                            <div className="w-full">
                                {form?.audioUrl && !onEditAudio ? (
                                    <audio
                                        src={form?.audioUrl}
                                        controls
                                        className="w-full"
                                    ></audio>
                                ) : (
                                    <FileUpload
                                        endpoint="audio"
                                        onChange={(url) => {
                                            if (url) {
                                                setForm({
                                                    ...form,
                                                    audioUrl: url,
                                                });
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <DialogFooter>
                    <DialogClose>
                        <Button
                            type="submit"
                            disabled={disabled() || isLoading}
                            onClick={handleEditQuestion}
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
