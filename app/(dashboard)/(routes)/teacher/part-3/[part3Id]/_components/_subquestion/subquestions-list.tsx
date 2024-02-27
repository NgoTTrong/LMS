"use client";
import { Dispatch, useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil, X } from "lucide-react";
type InnerQuestion = {
    tempId: number;
    content?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    explain?: string;
    answer?: string;
    topicId?: string;
};
type Props = {
    items: InnerQuestion[];
    setQuestions: Dispatch<InnerQuestion[]>;
};
const SubQuestionList = ({ items, setQuestions }: Props) => {
    return (
        <section className="w-full flex flex-col gap-4">
            {items.map((question, idx) => (
                <div
                    key={"key-" + idx}
                    className="p-4 bg-slate-200 text-slate-600 rounded-lg flex items-center gap-2"
                >
                    <span className="truncate flex-1">{question?.content}</span>
                    <div className="flex gap-2">
                        <Pencil className="w-4 h-4" />
                        <X className="w-4 h-4 text-red-700" />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SubQuestionList;
