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
import { ITopic } from "@/interfaces/topic/topic-interface";
import Part5Service from "@/services/part-5/part-5-service";
import TopicService from "@/services/topic/topic-service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
    part5Id: string;
};
export function ModalAddQuestion({ children, part5Id }: Props) {
    const [topics, setTopics] = useState<ITopic[]>([]);
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
        answer?: "A" | "B" | "C" | "D";
        topicId?: string;
        explain?: string;
    }>({});
    const disabled = () => {
        return (
            !form?.content ||
            !form?.answer ||
            !form?.explain ||
            !form?.optionA ||
            !form?.optionB ||
            !form?.optionC ||
            !form?.optionD ||
            !form?.topicId
        );
    };
    const handleAddQuestion = async () => {
        try {
            setIsLoading(true);
            const _questionPart5 = await Part5Service.createQuestion(part5Id, {
                content: form?.content!,
                optionA: form?.optionA!,
                optionB: form?.optionB!,
                optionC: form?.optionC!,
                optionD: form?.optionD,
                explain: form?.explain!,
                answer: form?.answer!,
                topicId: form?.topicId!,
            });
            if (_questionPart5) {
                toast.success("Added question");
                setForm({});
                router.refresh();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    console.log(form);
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
                                    setForm((state) => ({
                                        ...state,
                                        content: event?.target?.value ?? "",
                                    }));
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
                                className="w-full"
                                value={form?.optionA}
                                onChange={(event) => {
                                    setForm((state) => ({
                                        ...state,
                                        optionA: event?.target?.value ?? "",
                                    }));
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
                                    setForm((state) => ({
                                        ...state,
                                        optionB: event?.target?.value ?? "",
                                    }));
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
                                    setForm((state) => ({
                                        ...state,
                                        optionC: event?.target?.value ?? "",
                                    }));
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
                                className="w-full"
                                value={form?.optionD}
                                onChange={(event) => {
                                    setForm((state) => ({
                                        ...state,
                                        optionD: event?.target?.value ?? "",
                                    }));
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
                                value={form?.answer}
                                onChange={(option) => {
                                    setForm((state) => ({
                                        ...state,
                                        answer: option as "A" | "B" | "C" | "D",
                                    }));
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
                                    setForm((state) => ({
                                        ...state,
                                        topicId: option,
                                    }));
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
                                    setForm((state) => ({
                                        ...state,
                                        explain: value,
                                    }));
                                }}
                                value={form?.explain ?? ""}
                            />
                        </div>
                    </section>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="button"
                        disabled={disabled() || isLoading}
                        onClick={handleAddQuestion}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Add"
                        )}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
