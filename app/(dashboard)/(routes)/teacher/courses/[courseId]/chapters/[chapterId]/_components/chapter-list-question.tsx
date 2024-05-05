"use client";

import { useEffect, useState } from "react";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Loader2, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IChapterQuestion } from "@/interfaces/course/course-interface";
import ConfirmModal from "@/components/modal/confirm-modal";
import { ModalEditQuestion } from "./modal-edit-question";
import { Button } from "@/components/ui/button";
import ChapterService from "@/services/chapter/chapter-service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type Props = {
	items: IChapterQuestion[];
	chapterId: string;
};
const ChapterListQuestions = ({ items, chapterId }: Props) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [questions, setQuestions] = useState<IChapterQuestion[]>(items);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
	const onReorder = async (
		updateData: { id: string; position: number }[]
	) => {
		try {
			setIsUpdating(true);
			const _update = await ChapterService.reorderQuestions(
				chapterId,
				updateData
			);
			if (_update) {
				toast.success("Chapter reordered");
				router.refresh();
			} else {
				toast.error("Something went wrong!");
			}
		} catch (error) {
			toast.error("Something went wrong!");
		} finally {
			setIsUpdating(false);
		}
	};
	const handleDelete = async (id: string) => {
		try {
			setIsLoading(true);
			const _question = await ChapterService.deleteQuestion(id);
			if (_question) {
				toast.success("Deleted question");
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
		<section className="bg-slate-100 rounded-md p-4 relative">
			{isUpdating && (
				<div className="absolute top-0 right-0 rounded-md flex items-center w-full h-full justify-center bg-slate-500/20">
					<Loader2 className="animate-spin w-6 h-6 text-sky-700 " />
				</div>
			)}
			{items?.length == 0 && (
				<p className="text-sm text-slate-500 italic">No questions</p>
			)}
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="chapters">
					{(provided) => (
						<div
							{...provided?.droppableProps}
							ref={provided.innerRef}
						>
							{questions.map((chapter, index) => (
								<Draggable
									key={"chapter-drag-" + chapter.id}
									draggableId={String(chapter.id)}
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
											{chapter?.question?.content}
											<div className="ml-auto pr-2 flex items-center gap-x-2">
												<ModalEditQuestion
													question={chapter}
												>
													<Pencil className="w-4 h-4 cursor-pointer hover:scale-[1.1] transition" />
												</ModalEditQuestion>

												<ConfirmModal
													onConfirm={() =>
														handleDelete(
															chapter?.id
														)
													}
												>
													<Button
														variant="outline"
														disabled={isLoading}
													>
														<Trash2 className="w-4 h-4 cursor-pointer hover:scale-[1.1] transition text-red-700" />
													</Button>
												</ConfirmModal>
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
		</section>
	);
};

export default ChapterListQuestions;
