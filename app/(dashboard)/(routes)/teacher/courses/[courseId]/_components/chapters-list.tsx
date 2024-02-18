"use client";

import { IChapter } from "@/interfaces/course/course-interface";
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
type Props = {
	items: IChapter[];
	onReorder: (updateData: { id: string; position: number }[]) => void;
	onEdit: (id: string) => void;
};
const ChaptersList = ({ items, onReorder, onEdit }: Props) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [chapters, setChapters] = useState<IChapter[]>(items);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	useEffect(() => {
		setChapters(items);
	}, [items]);
	if (!isMounted) {
		return <></>;
	}
	const onDragEnd = (result: DropResult) => {
		if (!result?.destination) {
			return;
		}
		const items = Array.from(chapters);
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
		setChapters(items);

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
						{chapters.map((chapter, index) => (
							<Draggable
								key={"chapter-drag-" + chapter.id}
								draggableId={String(chapter.id)}
								index={index}
							>
								{(provided) => (
									<div
										className={cn(
											"flex items-center bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
											chapter?.isPublished &&
												"bg-sky-100 border-sky-200 text-sky-700"
										)}
										{...provided?.draggableProps}
										ref={provided.innerRef}
									>
										<div
											className={cn(
												"px-2 py-3 border-r border-r-slate-200 hover:bg-slate-200 rounded-l-md transition",
												chapter.isPublished &&
													"border-r-sky-200 hover:bg-sky-200"
											)}
											{...provided?.dragHandleProps}
										>
											<Grip />
										</div>
										{chapter?.title}
										<div className="ml-auto pr-2 flex items-center gap-x-2">
											{chapter?.isFree && (
												<Badge>Free</Badge>
											)}
											<Badge
												className={cn(
													"bg-slate-500",
													chapter?.isPublished &&
														"bg-sky-700"
												)}
											>
												{chapter?.isPublished
													? "Published"
													: "Draft"}
											</Badge>
											<Pencil
												className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
												onClick={() =>
													onEdit(chapter?.id)
												}
											/>
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

export default ChaptersList;
