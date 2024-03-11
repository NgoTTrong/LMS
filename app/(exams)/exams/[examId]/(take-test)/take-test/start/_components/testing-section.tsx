import useExam from "@/stores/exam/exam-store";
import { Dispatch, useEffect } from "react";
import Part1Testing from "./_part1/part1-testing";

const TestingSection = () => {
	const { currentPart } = useExam();

	return (
		<main className="flex-1 w-full flex max-w-[1080px] mt-6 px-10">
			{currentPart == 1 && <Part1Testing />}
		</main>
	);
};

export default TestingSection;
