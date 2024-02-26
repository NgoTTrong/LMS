"use client";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ITopic } from "@/interfaces/topic/topic-interface";
import Part3Service from "@/services/part-3/part-3-service";
import TopicService from "@/services/topic/topic-service";
import { Loader2, MinusCircle, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubQuestionList from "./_subquestion/subquestions-list";

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
	children: React.ReactNode;
	part3Id: string;
};
export function ModalAddQuestion({ children, part3Id }: Props) {
	const [topics, setTopics] = useState<ITopic[]>([]);
	const [onEditImage, setOnEditImage] = useState<boolean>(false);
	const [onEditAudio, setOnEditAudio] = useState<boolean>(false);
	const [onAddQuestion, setOnAddQuestion] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [questions, setQuestions] = useState<InnerQuestion[]>([]);
	const [imageUrl, setImageUrl] = useState<string>();
	const [audioUrl, setAudioUrl] = useState<string>();
	const router = useRouter();
	useEffect(() => {
		const fetchTopics = async () => {
			const _topics = await TopicService.getAllTopics();
			setTopics(_topics);
		};
		fetchTopics();
	}, []);
	const [form, setForm] = useState<{
		content?: string;
		optionA?: string;
		optionB?: string;
		optionC?: string;
		optionD?: string;
		answer?: "A" | "B" | "C" | "D";
		topicId?: string;
		explain?: string;
	}>({});
	const disabled = () => {
		return (
			!form?.content ||
			!form?.answer ||
			!form?.explain ||
			!form?.optionA ||
			!form?.optionB ||
			!form?.optionC ||
			!form?.optionD ||
			!form?.topicId
		);
	};
	const handleAddQuestion = async () => {
		try {
			setIsLoading(true);
			const _questionPart3 = await Part3Service.createQuestion(
				part3Id,
				{
					content: form?.content!,
					optionA: form?.optionA!,
					optionB: form?.optionB!,
					optionC: form?.optionC!,
					optionD: form?.optionD,
					answer: form?.answer!,
					topicId: form?.topicId!,
					explain: form?.explain!,
				},
				audioUrl!,
				imageUrl
			);
			if (_questionPart3) {
				toast.success("Added question");
				router.refresh();
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddQuestions = () => {
		setQuestions([
			...questions,
			{
				tempId: questions?.length + 1,
				content: form?.content,
				optionA: form?.optionA,
				optionB: form?.optionB,
				optionC: form?.optionC,
				optionD: form?.optionD,
				explain: form?.explain,
				answer: form?.answer,
				topicId: form?.topicId,
			},
		]);
		setForm({});
		setOnAddQuestion(false);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{children}</Button>
			</DialogTrigger>
			<DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Question content</DialogTitle>
					<DialogDescription>
						Enter all fields. Click Add when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex gap-8 w-full">
					<section className="w-full flex flex-col gap-4 py-4">
						<div className="flex items-start justify-between">
							<h1>Group questions</h1>
							<button
								onClick={() =>
									setOnAddQuestion((state) => !state)
								}
								className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg border border-solid border-slate-500 hover:border-slate-700 hover:font-medium"
							>
								{!onAddQuestion ? (
									<>
										<PlusCircle className="w-3 h-3" />
										Add question
									</>
								) : (
									<>
										<MinusCircle className="w-3 h-3" />
										Cancel
									</>
								)}
							</button>
						</div>
						{onAddQuestion ? (
							<section className="gap-4 py-4 w-full grid rounded-lg bg-white">
								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="content"
										className="text-right"
									>
										Content
									</Label>
									<Input
										id="content"
										placeholder="eg. How old are you?"
										className="w-full"
										value={form?.content}
										onChange={(event) => {
											setForm({
												...form,
												content:
													event?.target?.value ?? "",
											});
										}}
									/>
								</div>
								<hr />
								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="optionA"
										className="text-right"
									>
										Option A
									</Label>
									<Input
										id="optionA"
										placeholder="eg. A: 13"
										className="w-full"
										value={form?.optionA}
										onChange={(event) => {
											setForm({
												...form,
												optionA:
													event?.target?.value ?? "",
											});
										}}
									/>
								</div>
								<hr />
								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="optionB"
										className="text-right"
									>
										Option B
									</Label>
									<Input
										id="optionB"
										placeholder="eg. B: 14"
										className="w-full"
										value={form?.optionB}
										onChange={(event) => {
											setForm({
												...form,
												optionB:
													event?.target?.value ?? "",
											});
										}}
									/>
								</div>
								<hr />

								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="optionC"
										className="text-right"
									>
										Option C
									</Label>
									<Input
										id="optionC"
										placeholder="eg. C: 15"
										className="w-full"
										value={form?.optionC}
										onChange={(event) => {
											setForm({
												...form,
												optionC:
													event?.target?.value ?? "",
											});
										}}
									/>
								</div>
								<hr />

								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="optionD"
										className="text-right"
									>
										Option D
									</Label>
									<Input
										id="optionD"
										placeholder="eg. D: 16"
										className="w-full"
										value={form?.optionD}
										onChange={(event) => {
											setForm({
												...form,
												optionD:
													event?.target?.value ?? "",
											});
										}}
									/>
								</div>
								<hr />

								<div className="flex flex-col gap-4 justify-start items-start">
									<Label className="text-right">
										Correct Answer
									</Label>
									<ComboBox
										options={[
											{ label: "A", value: "A" },
											{ label: "B", value: "B" },
											{ label: "C", value: "C" },
											{ label: "D", value: "D" },
										]}
										value={form?.answer}
										onChange={(option) => {
											setForm({
												...form,
												answer: option as
													| "A"
													| "B"
													| "C"
													| "D",
											});
										}}
									/>
								</div>
								<hr />

								<div className="flex flex-col gap-4 justify-start items-start">
									<Label className="text-right">Topic</Label>
									<ComboBox
										value={form?.topicId}
										options={topics.map((topic) => ({
											label: topic.name,
											value: topic.id,
										}))}
										onChange={(option) => {
											setForm({
												...form,
												topicId: option,
											});
										}}
									/>
								</div>
								<hr />

								<div className="flex flex-col gap-4 justify-start items-start">
									<Label
										htmlFor="explain"
										className="text-right"
									>
										Explaination
									</Label>
									<Editor
										onChange={(value) => {
											setForm({
												...form,
												explain: value,
											});
										}}
										value={form?.explain ?? ""}
									/>
								</div>
								<Button
									onClick={handleAddQuestions}
									disabled={disabled()}
								>
									Add question to group
								</Button>
							</section>
						) : (
							<div className="flex flex-col gap-4 w-full">
								{questions?.length == 0 ? (
									<span className="italic text-sm">
										No child questions
									</span>
								) : (
									<SubQuestionList
										items={questions}
										onReorder={() => {}}
										onEdit={() => {}}
									/>
								)}
							</div>
						)}
					</section>

					<section className="flex flex-col gap-4 py-4 w-full">
						<div className="flex flex-col gap-4 justify-start items-start">
							<h1 className="flex items-center justify-between w-full">
								<h1>Image</h1>
								{onEditImage ? (
									<span
										onClick={() => setOnEditImage(false)}
										className="text-sm hover:cursor-pointer"
									>
										Cancel
									</span>
								) : (
									<Pencil
										className="h-4 w-4"
										onClick={() => setOnEditImage(true)}
									/>
								)}
							</h1>
							<div className="w-full">
								{imageUrl && !onEditImage ? (
									<img
										src={imageUrl}
										alt=""
										className="w-full aspect-video rounded-lg"
									/>
								) : (
									<FileUpload
										endpoint="courseImage"
										onChange={(url) => {
											if (url) {
												setImageUrl(url);
											}
										}}
									/>
								)}

								<div className="text-xs text-muted-foreground mt-4">
									16:9 aspect ratio recommended
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4 justify-start items-start w-full">
							<h1 className="flex items-center justify-between w-full">
								<h1>Audio</h1>
								{onEditAudio ? (
									<span
										onClick={() => setOnEditAudio(false)}
										className="text-sm hover:cursor-pointer"
									>
										Cancel
									</span>
								) : (
									<Pencil
										className="h-4 w-4"
										onClick={() => setOnEditAudio(true)}
									/>
								)}
							</h1>{" "}
							<div className="w-full">
								{audioUrl && !onEditAudio ? (
									<audio
										src={audioUrl}
										controls
										className="w-full"
									></audio>
								) : (
									<FileUpload
										endpoint="audio"
										onChange={(url) => {
											if (url) {
												setAudioUrl(url);
											}
										}}
									/>
								)}
							</div>
						</div>
					</section>
				</div>

				<DialogFooter>
					<DialogClose>
						<Button
							type="submit"
							disabled={
								questions?.length == 0 || !audioUrl || isLoading
							}
							onClick={handleAddQuestion}
						>
							{isLoading ? (
								<Loader2 className="w-6 h-6 animate-spin" />
							) : (
								"Add"
							)}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}