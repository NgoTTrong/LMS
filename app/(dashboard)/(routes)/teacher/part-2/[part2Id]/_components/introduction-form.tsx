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
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IPart1 } from "@/interfaces/part-1/part-1-interface";
import Part1Service from "@/services/part-1/part-1-service";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
	initialData: IPart1;
	part1Id: string;
};

const formSchema = z.object({
	introduction: z.string().min(1, {
		message: "Title is required",
	}),
});
const IntroductionForm = ({ initialData, part1Id }: Props) => {
	const [isEditting, setEditting] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});
	const { isSubmitting, isValid } = form.formState;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const _part1 = await Part1Service.updatePart1(part1Id, {
			introduction: values?.introduction,
		});
		if (_part1) {
			toast.success("Part 1 updated");
		} else {
			toast.error("Something went wrong!");
		}
		setEditting(false);
		router.refresh();
	};
	return (
		<section className="mt-6 bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Part 1 introduction
				<Button
					variant={"ghost"}
					onClick={() => setEditting((state) => !state)}
				>
					{isEditting ? (
						"Cancel"
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit introduction
						</>
					)}
				</Button>
			</div>
			{!isEditting ? (
				<p
					className={cn(
						"text-sm mt-2",
						!initialData?.introduction && "italic"
					)}
				>
					{initialData?.introduction ?? "No introduction"}
				</p>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="introduction"
							render={({ field }) => {
								return (
									<FormItem>
										<FormControl>
											<Textarea
												disabled={isSubmitting}
												placeholder="e.g. 'Advanced web development'"
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
							Save
						</Button>
					</form>
				</Form>
			)}
		</section>
	);
};

export default IntroductionForm;
