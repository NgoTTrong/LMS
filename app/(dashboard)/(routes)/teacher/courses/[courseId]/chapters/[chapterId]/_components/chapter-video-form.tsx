"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IChapter } from "@/interfaces/course/course-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChapterService from "@/services/chapter/chapter-service";
import { FileUpload } from "@/components/file-upload";
import ReactPlayer from "react-player/file";

type Props = {
	initialData: IChapter;
	chapterId: string;
};

const formSchema = z.object({
	videoUrl: z.string().min(1),
});
const ChapterVideoForm = ({ initialData, chapterId }: Props) => {
	const [isEditting, setEditting] = useState<boolean>(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});
	const { isSubmitting, isValid } = form.formState;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const _course = await ChapterService.updateChapterId(chapterId, {
			videoUrl: values?.videoUrl,
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
		<section className="mt-6 bg-slate-100 rounded-md p-4 relative">
			<div className="font-medium flex items-center justify-between">
				Chapter video
				<Button
					variant={"ghost"}
					onClick={() => setEditting((state) => !state)}
				>
					{isEditting ? (
						"Cancel"
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit chapter video
						</>
					)}
				</Button>
			</div>
			{!isEditting && (
				<div>
					{!initialData?.videoUrl && (
						<p className="text-xs italic text-slate-700">
							No video. Please upload video for this chapter.
						</p>
					)}
					{initialData?.videoUrl && (
						<video
							src={initialData?.videoUrl}
							className="w-full h-full rounded-lg"
							controls
							muted
						></video>
						// <div className="w-full h-full rounded-md overflow-hidden">
						//   {/* <ReactPlayer
						//     url={initialData?.videoUrl}
						//     width="100%"
						//     height="100%"
						//     controls
						//   /> */}
						// </div>
					)}
				</div>
			)}

			{isEditting && (
				<div>
					<FileUpload
						endpoint="chapterVideo"
						onChange={(url) => {
							if (url) {
								console.log(url);
								onSubmit({ videoUrl: url });
							}
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">
						Upload this chapter's video
					</div>
				</div>
			)}
		</section>
	);
};

export default ChapterVideoForm;
