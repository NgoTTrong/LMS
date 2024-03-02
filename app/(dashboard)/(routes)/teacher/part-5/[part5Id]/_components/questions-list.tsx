"use client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil, Trash, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPart5Question } from "@/interfaces/part-5/part-5-interface";
import { ModalEditQuestion } from "./modal-edit-question";
import toast from "react-hot-toast";
import Part5Service from "@/services/part-5/part-5-service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
type Props = {
    items: IPart5Question[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
};
const QuestionsList = ({ items, onReorder, onEdit }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IPart5Question[]>(items);
    const router = useRouter();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        setQuestions(items);
    }, [items]);
    if (!isMounted) {
        return <></>;
    }
    const onDragEnd = (result: DropResult) => {
        if (!result?.destination) {
            return;
        }
        const items = Array.from(questions);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);

        const startIndex = Math.min(
            result.source.index,
            result.destination.index
        );
        const endIndex = Math.max(
            result.source.index,
            result.destination.index
        );
        const updatedChapters = items.slice(startIndex, endIndex + 1);
        setQuestions(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id == chapter.id),
        }));

        onReorder(bulkUpdateData);
    };
    const handleDeleteQuestion = async (part5QuestionId: string) => {
        try {
            const _part5QuestionId = await Part5Service.deleteQuestion(
                part5QuestionId
            );
            if (_part5QuestionId) {
                toast.success("Deleted question");
                router.refresh();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided?.droppableProps} ref={provided.innerRef}>
                        {questions.map((question, index) => (
                            <Draggable
                                key={"question-drag-" + question.id}
                                draggableId={String(question.id)}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                                        )}
                                        {...provided?.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-200 rounded-l-md transition"
                                            )}
                                            {...provided?.dragHandleProps}
                                        >
                                            <Grip />
                                        </div>
                                        {
                                            <p className="flex-1 truncate">
                                                {question?.question?.content}
                                            </p>
                                        }
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            <ModalEditQuestion
                                                question={question}
                                            >
                                                <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                                            </ModalEditQuestion>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteQuestion(
                                                        question?.id
                                                    )
                                                }
                                                variant="outline"
                                            >
                                                <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-75 transition text-red-700" />
                                            </Button>{" "}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided?.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default QuestionsList;
