"use client";
import { useEffect, useState } from "react";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPart2Question } from "@/interfaces/part-2/part-2-interface";
import { ModalEditQuestion } from "./modal-edit-question";
import { Button } from "@/components/ui/button";
import Part2Service from "@/services/part-2/part-2-service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type Props = {
	items: IPart2Question[];
	onReorder: (updateData: { id: string; position: number }[]) => void;
	onEdit: (id: string) => void;
};
const QuestionsList = ({ items, onReorder, onEdit }: Props) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [questions, setQuestions] = useState<IPart2Question[]>(items);
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
	const handleDeleteQuestion = async (part2QuestionId: string) => {
		try {
			console.log(part2QuestionId);
			const _part2QuestionId = await Part2Service.deleteQuestion(
				part2QuestionId
			);
			if (_part2QuestionId) {
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
								{(provided) => {
									return (
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
											<p className="flex-1 truncate">
												{question?.question?.content}
											</p>
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
												</Button>
											</div>
										</div>
									);
								}}
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
