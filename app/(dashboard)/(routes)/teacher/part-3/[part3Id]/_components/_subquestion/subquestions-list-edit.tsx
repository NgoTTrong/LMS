"use client";
import { Dispatch, useEffect, useState } from "react";
import { Grip, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/ui/combo-box";
import { ITopic } from "@/interfaces/topic/topic-interface";
import { IQuestion } from "@/interfaces/question/question-interface";

type Props = {
	items: IQuestion[];
	setQuestions: Dispatch<IQuestion[]>;
	topics: ITopic[];
};
const SubQuestionListEdit = ({ items, setQuestions, topics }: Props) => {
	const [onEdit, setOnEdit] = useState<boolean>(false);
	const [form, setForm] = useState<IQuestion>();

	const handleEditQuestion = () => {
		const questions = [...items];
		const idx = questions.findIndex((e) => e.id == form?.id);
		questions[idx] = {
			id: form?.id!,
			content: form?.content!,
			optionA: form?.optionA!,
			optionB: form?.optionB!,
			optionC: form?.optionC!,
			optionD: form?.optionD!,
			topicId: form?.topicId!,
			explain: form?.explain!,
			answer: form?.answer! as "A" | "B" | "C" | "D",
		};
		setQuestions(questions);
		setOnEdit(false);
	};
	return (
		<section className="w-full flex flex-col gap-4">
			{!onEdit &&
				items.map((question, idx) => (
					<div
						key={"key-" + idx}
						className="p-4 bg-slate-200 text-slate-600 rounded-lg flex items-center gap-2"
					>
						<span className="truncate flex-1">
							{question?.content}
						</span>
						<div className="flex gap-2">
							<Pencil
								className="w-4 h-4 cursor-pointer"
								onClick={() => {
									setForm({ ...question });
									setOnEdit(true);
								}}
							/>
						</div>
					</div>
				))}
			{onEdit && form?.id && (
				<section className="gap-4 py-4 w-full grid rounded-lg bg-white">
					<div className="flex flex-col gap-4 justify-start items-start">
						<Label htmlFor="content" className="text-right">
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
									content: event?.target?.value ?? "",
								});
							}}
						/>
					</div>
					<hr />
					<div className="flex flex-col gap-4 justify-start items-start">
						<Label htmlFor="optionA" className="text-right">
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
									optionA: event?.target?.value ?? "",
								});
							}}
						/>
					</div>
					<hr />
					<div className="flex flex-col gap-4 justify-start items-start">
						<Label htmlFor="optionB" className="text-right">
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
									optionB: event?.target?.value ?? "",
								});
							}}
						/>
					</div>
					<hr />

					<div className="flex flex-col gap-4 justify-start items-start">
						<Label htmlFor="optionC" className="text-right">
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
									optionC: event?.target?.value ?? "",
								});
							}}
						/>
					</div>
					<hr />

					<div className="flex flex-col gap-4 justify-start items-start">
						<Label htmlFor="optionD" className="text-right">
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
									optionD: event?.target?.value ?? "",
								});
							}}
						/>
					</div>
					<hr />

					<div className="flex flex-col gap-4 justify-start items-start">
						<Label className="text-right">Correct Answer</Label>
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
									answer: option as "A" | "B" | "C" | "D",
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
						<Label htmlFor="explain" className="text-right">
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
					<Button onClick={handleEditQuestion} disabled={false}>
						Save question to group
					</Button>
				</section>
			)}
		</section>
	);
};

export default SubQuestionListEdit;
