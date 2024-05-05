"use client";

import { IChapter } from "@/interfaces/course/course-interface";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
	chapterId: string;
	practiceCourseId: string;
	chapter: IChapter;
	isCompleted: boolean;
};
const CourseSidebarItem = ({
	chapterId,
	practiceCourseId,
	chapter,
	isCompleted,
}: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const Icon = isCompleted ? CheckCircle : PlayCircle;

	const isActive = pathname?.includes(String(chapterId));

	const onClick = () => {
		router.push(
			`/practice-courses/${practiceCourseId}/chapters/${chapterId}`
		);
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={cn(
				"flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
				isActive &&
					"text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
				isCompleted && "text-emerald-700 hover:text-emerald-700",
				isActive && isCompleted && "bg-emerald-200/20"
			)}
		>
			<div className="flex items-center gap-x-2 py-4">
				<Icon
					size={24}
					className={cn(
						"text-slate-500",
						isActive && "text-slate-700",
						isCompleted && "text-emerald-700"
					)}
				/>
				{chapter?.title}
			</div>
			<div
				className={cn(
					"ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
					isActive && "opacity-100",
					isCompleted && "border-emerald-700"
				)}
			></div>
		</button>
	);
};

export default CourseSidebarItem;
