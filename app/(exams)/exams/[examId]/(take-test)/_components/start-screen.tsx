"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
	examId: string;
};
const StartScreen = ({ examId }: Props) => {
	const router = useRouter();
	return (
		<main className="mt-6">
			<Button
				onClick={() => router.push(`/exams/${examId}/take-test/start`)}
			>
				Start now
			</Button>
		</main>
	);
};

export default StartScreen;
