"use client";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
	children: React.ReactNode;
	onConfirm: () => void;
};
export function ModalAddQuestion({ children, onConfirm }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{children}</Button>
			</DialogTrigger>
			<DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-auto">
				<DialogHeader>
					<DialogTitle>Question content</DialogTitle>
					<DialogDescription>
						Enter all fields. Click Add when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex gap-8 w-full">
					<section className="grid gap-4 py-4 w-full">
						<div className="flex flex-col gap-4 justify-start items-start">
							<Label htmlFor="content" className="text-right">
								Content
							</Label>
							<Input
								id="content"
								placeholder="eg. How old are you?"
								className="w-full"
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
							/>
						</div>
						<hr />
						<div className="flex flex-col gap-4 justify-start items-start">
							<Label htmlFor="optionA" className="text-right">
								Option B
							</Label>
							<Input
								id="optionA"
								placeholder="eg. B: 14"
								className="w-full"
							/>
						</div>
						<hr />

						<div className="flex flex-col gap-4 justify-start items-start">
							<Label htmlFor="optionA" className="text-right">
								Option C
							</Label>
							<Input
								id="optionA"
								placeholder="eg. C: 15"
								className="w-full"
							/>
						</div>
						<hr />

						<div className="flex flex-col gap-4 justify-start items-start">
							<Label htmlFor="optionA" className="text-right">
								Option D
							</Label>
							<Input
								id="optionA"
								placeholder="eg. D: 16"
								className="w-full"
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
								onChange={(option) => {}}
							/>
						</div>
						<hr />

						<div className="flex flex-col gap-4 justify-start items-start">
							<Label className="text-right">Topic</Label>
							<ComboBox
								options={[
									{ label: "A", value: "A" },
									{ label: "B", value: "B" },
									{ label: "C", value: "C" },
									{ label: "D", value: "D" },
								]}
								onChange={(option) => {}}
							/>
						</div>
						<hr />

						<div className="flex flex-col gap-4 justify-start items-start">
							<Label htmlFor="explain" className="text-right">
								Explaination
							</Label>
							<Editor onChange={(value) => {}} value={""} />
						</div>
					</section>
					<section className="flex flex-col gap-4 py-4 w-full">
						<div className="flex flex-col gap-4 justify-start items-start">
							<h1 className="text-right">Image</h1>
							<div>
								<FileUpload
									endpoint="courseImage"
									onChange={(url) => {
										if (url) {
											console.log(url);
											// onSubmit({ thumbnail: url });
										}
									}}
								/>
								<div className="text-xs text-muted-foreground mt-4">
									16:9 aspect ratio recommended
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4 justify-start items-start">
							<h1 className="text-right">Audio</h1>
							<div>
								<FileUpload
									endpoint="audio"
									onChange={(url) => {
										if (url) {
											console.log(url);
											// onSubmit({ thumbnail: url });
										}
									}}
								/>
							</div>
						</div>
					</section>
				</div>

				<DialogFooter>
					<Button type="submit">Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
