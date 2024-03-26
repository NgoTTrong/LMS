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
import Part7Service from "@/services/part-7/part-7-service";
import TopicService from "@/services/topic/topic-service";
import { Loader2, MinusCircle, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubQuestionList from "./_subquestion/subquestions-list";
import Image from "next/image";

type Props = {
    children: React.ReactNode;
    part7Id: string;
};

export function ModalAddQuestion({ children, part7Id }: Props) {
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [onEditImage, setOnEditImage] = useState<boolean>(false);
    const [onAddQuestion, setOnAddQuestion] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<InnerQuestion[]>([]);
    const [imageUrl, setImageUrl] = useState<string>();
    const router = useRouter();
    useEffect(() => {
        const fetchTopics = async () => {
            const _topics = await TopicService.getAllTopics();
            setTopics(_topics);
        };
        fetchTopics();
    }, []);
    const [form, setForm] = useState<FormValue>({});
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
            const _questionPart7 = await Part7Service.createQuestion(
                part7Id,
                questions.map((question) => ({
                    content: question?.content!,
                    optionA: question.optionA!,
                    optionB: question.optionB!,
                    optionC: question.optionC!,
                    optionD: question.optionD,
                    answer: question.answer! as "A" | "B" | "C" | "D",
                    topicId: question?.topicId!,
                    explain: question?.explain!,
                })),
                imageUrl
            );
            if (_questionPart7) {
                toast.success("Added question");
                setForm({});
                setImageUrl("");
                setQuestions([]);
                router.refresh();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddQuestions = () => {
        setQuestions([
            ...questions,
            {
                tempId: questions?.length + 1,
                content: form?.content,
                optionA: form?.optionA,
                optionB: form?.optionB,
                optionC: form?.optionC,
                optionD: form?.optionD,
                explain: form?.explain,
                answer: form?.answer,
                topicId: form?.topicId,
            },
        ]);
        setForm({});
        setOnAddQuestion(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Question content</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Add when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 w-full">
                    <section className="w-full flex flex-col gap-4 py-4">
                        <div className="flex items-start justify-between">
                            <h1>Group questions</h1>
                            <Button
                                onClick={() =>
                                    setOnAddQuestion((state) => !state)
                                }
                                variant={"ghost"}
                                className="flex items-center gap-1 text-xs !px-2 !py-1 rounded-lg border border-solid border-slate-500 hover:border-slate-700 hover:font-medium"
                            >
                                {!onAddQuestion ? (
                                    <>
                                        <PlusCircle className="w-4 h-4" />
                                        Add question
                                    </>
                                ) : (
                                    <>
                                        <MinusCircle className="w-4 h-4" />
                                        Cancel
                                    </>
                                )}
                            </Button>
                        </div>
                        {onAddQuestion ? (
                            <section className="gap-4 py-4 w-full grid rounded-lg bg-white">
                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label
                                        htmlFor="content"
                                        className="text-right"
                                    >
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
                                                content:
                                                    event?.target?.value ?? "",
                                            }));
                                        }}
                                    />
                                </div>
                                <hr />
                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label
                                        htmlFor="optionA"
                                        className="text-right"
                                    >
                                        Option A
                                    </Label>
                                    <Input
                                        id="optionA"
                                        placeholder="eg. A: 14"
                                        className="w-full"
                                        value={form?.optionA}
                                        onChange={(event) => {
                                            setForm((state) => ({
                                                ...state,
                                                optionA:
                                                    event?.target?.value ?? "",
                                            }));
                                        }}
                                    />
                                </div>
                                <hr />
                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label
                                        htmlFor="optionB"
                                        className="text-right"
                                    >
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
                                                optionB:
                                                    event?.target?.value ?? "",
                                            }));
                                        }}
                                    />
                                </div>
                                <hr />

                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label
                                        htmlFor="optionC"
                                        className="text-right"
                                    >
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
                                                optionC:
                                                    event?.target?.value ?? "",
                                            }));
                                        }}
                                    />
                                </div>
                                <hr />

                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label
                                        htmlFor="optionD"
                                        className="text-right"
                                    >
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
                                                optionD:
                                                    event?.target?.value ?? "",
                                            }));
                                        }}
                                    />
                                </div>
                                <hr />

                                <div className="flex flex-col gap-4 justify-start items-start">
                                    <Label className="text-right">
                                        Correct Answer
                                    </Label>
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
                                                answer: option as
                                                    | "A"
                                                    | "B"
                                                    | "C"
                                                    | "D",
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
                                    <Label
                                        htmlFor="explain"
                                        className="text-right"
                                    >
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
                                <Button
                                    onClick={handleAddQuestions}
                                    disabled={disabled()}
                                >
                                    Add question to group
                                </Button>
                            </section>
                        ) : (
                            <div className="flex flex-col gap-4 w-full">
                                {questions?.length == 0 ? (
                                    <span className="italic text-sm">
                                        No child questions
                                    </span>
                                ) : (
                                    <SubQuestionList
                                        items={questions}
                                        setQuestions={setQuestions}
                                        topics={topics}
                                    />
                                )}
                            </div>
                        )}
                    </section>

                    <section className="flex flex-col gap-4 py-4 w-full">
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex items-center justify-between w-full">
                                <h1>
                                    Image{" "}
                                    <span className="text-slate-500 text-sm"></span>
                                </h1>
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
                            </div>
                            <div className="w-full">
                                {imageUrl && !onEditImage ? (
                                    <Image
                                        src={imageUrl}
                                        alt="thumb"
                                        className="w-full aspect-video rounded-lg"
                                    />
                                ) : (
                                    <FileUpload
                                        endpoint="courseImage"
                                        onChange={(url) => {
                                            if (url) {
                                                setImageUrl(url);
                                            }
                                        }}
                                    />
                                )}

                                <div className="text-xs text-muted-foreground mt-4">
                                    16:9 aspect ratio recommended
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="button"
                        disabled={questions?.length == 0 || isLoading}
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
