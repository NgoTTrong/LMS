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
import {
    IMappingPart7Question,
    IPart7Question,
} from "@/interfaces/part-7/part-7-interface";
import { ITopic } from "@/interfaces/topic/topic-interface";
import Part7Service from "@/services/part-7/part-7-service";
import TopicService from "@/services/topic/topic-service";
import { Loader2, MinusCircle, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubQuestionListEdit from "./_subquestion/subquestions-list-edit";
import { IQuestion } from "@/interfaces/question/question-interface";

type Props = {
    children: React.ReactNode;
    question: IPart7Question;
};
export function ModalEditQuestion({ question, children }: Props) {
    const [topics, setTopics] = useState<ITopic[]>([]);
    const [onEditImage, setOnEditImage] = useState<boolean>(false);
    const [onAddQuestion, setOnAddQuestion] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [imageUrl, setImageUrl] = useState<string>();

    const router = useRouter();
    useEffect(() => {
        const fetchTopics = async () => {
            const _topics = await TopicService.getAllTopics();
            setTopics(_topics);
        };
        fetchTopics();
    }, []);

    useEffect(() => {
        setImageUrl(question?.imageUrls?.[0]);
        setQuestions(question?.groupPart7Questions?.map((e) => e.question));
    }, [question]);
    const handleEditQuestion = async () => {
        try {
            setIsLoading(true);
            const _questionPart7 = await Part7Service.updateQuestion(
                question?.id,
                questions,
                imageUrl
            );
            if (_questionPart7) {
                toast.success("Edited question");
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
        <Dialog
            onOpenChange={(open) => {
                if (!open) {
                    setQuestions(
                        question?.groupPart7Questions?.map((e) => e.question)
                    );
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Question content</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 w-full">
                    <section className="w-full flex flex-col gap-4 py-4">
                        <div className="flex items-start justify-between">
                            <h1>Group questions</h1>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            {questions?.length == 0 ? (
                                <span className="italic text-sm">
                                    No child questions
                                </span>
                            ) : (
                                <SubQuestionListEdit
                                    items={questions}
                                    setQuestions={setQuestions}
                                    topics={topics}
                                />
                            )}
                        </div>
                    </section>
                    <section className="flex flex-col gap-4 py-4 w-full">
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <section className="flex items-center justify-between w-full">
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
                            </section>
                            <div className="w-full">
                                {imageUrl && !onEditImage ? (
                                    <img
                                        src={imageUrl}
                                        alt=""
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
                        onClick={handleEditQuestion}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Save"
                        )}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}