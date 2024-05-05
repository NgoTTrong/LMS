"use client";

import { Button } from "@/components/ui/button";
import { useClientAuth } from "@/hooks/use-client-auth";
import ExamService from "@/services/exam/exam-service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
	historyId: string;
};

const GetPracticeCourse = ({ historyId }: Props) => {
	const user = useClientAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const handleGetPracticeCourse = async () => {
		try {
			setIsLoading(true);
			const course = await ExamService.getPracticeCourse(
				historyId,
				user?.userId
			);
			if (course) {
				router.push("/practice-courses/" + course);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-col gap-4 w-full">
			<h1 className="text-xl font-medium">Practice</h1>
			<Button
				onClick={handleGetPracticeCourse}
				className="w-full"
				disabled={isLoading}
			>
				{!isLoading ? (
					<>Get the improvement course right away</>
				) : (
					<Loader2 className="animate-spin" />
				)}
			</Button>
		</div>
	);
};

export default GetPracticeCourse;
