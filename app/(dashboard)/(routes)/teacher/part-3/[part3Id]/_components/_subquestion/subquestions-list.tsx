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
	onReorder: (updateData: { id: number; position: number }[]) => void;
	onEdit: (id: string) => void;
};
const SubQuestionList = ({ items, onReorder, onEdit }: Props) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [questions, setQuestions] = useState<InnerQuestion[]>(items);

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
		const updatedQuestions = items.slice(startIndex, endIndex + 1);
		setQuestions(items);

		const bulkUpdateData = updatedQuestions.map((question) => ({
			id: question.tempId,
			position: items.findIndex((item) => item.tempId == question.tempId),
		}));

		onReorder(bulkUpdateData);
	};
	return (
		<DragDropContext
			onDragEnd={onDragEnd}
			autoScrollerOptions={{ disabled: true }}
		>
			<Droppable droppableId="subquestions">
				{(provided) => (
					<div
						{...provided?.droppableProps}
						ref={provided.innerRef}
						className={`min-w-full`}
					>
						{questions.map((question, index) => (
							<Draggable
								key={"subquestion-drag-" + index}
								draggableId={"subquestion-drag-" + index}
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
										{question?.content}
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

export default SubQuestionList;
