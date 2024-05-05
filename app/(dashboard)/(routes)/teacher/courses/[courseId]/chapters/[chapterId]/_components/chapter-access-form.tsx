"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { IChapter, ICourse } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChapterService from "@/services/chapter/chapter-service";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
	initialData: IChapter;
	chapterId: string;
};

const formSchema = z.object({
	isFree: z.boolean().default(false),
});
const ChapterAccessForm = ({ initialData, chapterId }: Props) => {
	const [isEditting, setEditting] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});
	const { isSubmitting, isValid } = form.formState;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const _course = await ChapterService.updateChapterId(chapterId, {
			isFree: values?.isFree,
		});
		if (_course) {
			toast.success("Chapter updated");
		} else {
			toast.error("Something went wrong!");
		}
		setEditting(false);
		router.refresh();
	};
	return (
		<section className="mt-6 bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Chapter access settings
				<Button
					variant={"ghost"}
					onClick={() => setEditting((state) => !state)}
				>
					{isEditting ? (
						"Cancel"
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit acess settings
						</>
					)}
				</Button>
			</div>
			{!isEditting ? (
				<div
					className={cn(
						"text-sm mt-2",
						!initialData?.isFree && "text-slate-500 italic"
					)}
				>
					{initialData?.isFree
						? "This chapter is free for preview"
						: "This chapter is not free"}
				</div>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="isFree"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field?.value}
												onCheckedChange={
													field?.onChange
												}
												id="check-box"
											/>
										</FormControl>
										<label
											htmlFor="check-box"
											className="space-y-1 leading-none"
										>
											<FormDescription>
												Check this box if you want to
												make this chapter free for
												preview
											</FormDescription>
										</label>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button
							type="submit"
							disabled={!isValid || isSubmitting}
						>
							Save
						</Button>
					</form>
				</Form>
			)}
		</section>
	);
};

export default ChapterAccessForm;
