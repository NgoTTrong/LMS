"use client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPart2Question } from "@/interfaces/part-2/part-2-interface";
import { ModalEditQuestion } from "./modal-edit-question";
type Props = {
  items: IPart2Question[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};
const QuestionsList = ({ items, onReorder, onEdit }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IPart2Question[]>(items);

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

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setQuestions(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id == chapter.id),
    }));

    onReorder(bulkUpdateData);
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
                    {question?.question?.content}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <ModalEditQuestion question={question}>
                        <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                      </ModalEditQuestion>
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
