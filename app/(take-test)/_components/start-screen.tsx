"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StartScreen = () => {
	const router = useRouter();
	return (
		<main className="max-w-[1080px] flex-1 flex items-center justify-center w-full h-full mt-6">
			<Button onClick={() => router.push("/take-test/start")}>
				Start now
			</Button>
		</main>
	);
};

export default StartScreen;
