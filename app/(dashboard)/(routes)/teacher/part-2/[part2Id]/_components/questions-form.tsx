"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICourse } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import * as z from "zod";
import CourseService from "@/services/course/courseService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IPart2 } from "@/interfaces/part-2/part-2-interface";
import { ModalAddQuestion } from "./modal-add-question";
import QuestionsList from "./questions-list";
import Part2Service from "@/services/part-2/part-2-service";

type Props = {
	initialData: IPart2;
	part2Id: string;
};

const formSchema = z.object({
	title: z.string().min(1),
});
const QuestionsForm = ({ initialData, part2Id }: Props) => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { isSubmitting, isValid } = form.formState;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// const _course = await CourseService.addChapter(courseId, {
		// 	title: values?.title,
		// });
		// if (_course) {
		// 	toast.success("Chapter added");
		// } else {
		// 	toast.error("Something went wrong!");
		// }
		// setIsCreating(false);
		// router.refresh();
	};

	const onReorder = async (
		updateData: { id: string; position: number }[]
	) => {
		try {
			setIsUpdating(true);
			const _update = await Part2Service.reorderQuestions(
				part2Id,
				updateData
			);
			if (_update) {
				toast.success("Question reordered");
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
	const onEdit = (chapterId: string) => {
		// router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
	};
	return (
		<section className="mt-6 bg-slate-100 rounded-md p-4 relative">
			{isUpdating && (
				<div className="absolute top-0 right-0 rounded-md flex items-center w-full h-full justify-center bg-slate-500/20">
					<Loader2 className="animate-spin w-6 h-6 text-sky-700 " />
				</div>
			)}
			<div className="font-medium flex items-center justify-between">
				Questions
				{isCreating ? (
					"Cancel"
				) : (
					<ModalAddQuestion part2Id={part2Id}>
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a question
						</>
					</ModalAddQuestion>
				)}
			</div>
			{isCreating && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="e.g. 'Introduction to the course'"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button
							type="submit"
							disabled={!isValid || isSubmitting}
						>
							Create
						</Button>
					</form>
				</Form>
			)}
			{!isCreating && (
				<div
					className={cn(
						"text-sm mt-2",
						!initialData?.part2Questions?.length &&
							"text-slate-500 italic"
					)}
				>
					{initialData?.part2Questions?.length == 0 && "No questions"}
					<QuestionsList
						onEdit={onEdit}
						onReorder={onReorder}
						items={initialData?.part2Questions ?? []}
					/>
				</div>
			)}
			{!isCreating && (
				<p className="text-xs text-muted-foreground mt-4">
					Drag and Drop to reorder the questions
				</p>
			)}
		</section>
	);
};

export default QuestionsForm;
