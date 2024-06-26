import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { Part1Question } from "@/interfaces/exam/exam-interface";
import { formatTime } from "@/lib/functions";
import examStore from "@/stores/exam/exam-store";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getNextPart } from "../../_helper/get-next-part";
import { getNextPartQuestion } from "../../_helper/get-next-part-question";
import { getCurrentQuestionPosition } from "../../_helper/get-current-question-position";
import img from "next/image";

const Part1Testing = () => {
	const {
		exam,
		currentPart,
		currentQuestion,
		result,
		pushResult,
		setCurrentPart,
		setCurrentQuestion,
	} = examStore();
	const { playing, toggle, setAudio, duration } = useAudio();
	const [question, setQuestion] = useState<Part1Question>();
	useEffect(() => {
		if (currentQuestion) {
			const idx = exam?.part1?.part1Questions?.findIndex(
				(_question) => _question?.questionId == currentQuestion
			);
			if (idx != undefined && idx != -1) {
				setQuestion(exam?.part1?.part1Questions?.[idx]);
				setAudio(
					new Audio(exam?.part1?.part1Questions?.[idx]?.audioUrl)
				);
			}
		}
	}, [currentQuestion]);
	const check = () => {
		const idx = result?.findIndex(
			(e) => e?.questionId == question?.questionId
		);

		if (idx == -1) {
			return null;
		}
		return result?.[idx]?.option;
	};
	const handleNext = () => {
		const questionIdx =
			exam?.part1?.part1Questions?.findIndex(
				(question) => question?.questionId == currentQuestion
			) ?? -1;
		if (questionIdx == (exam?.part1?.part1Questions?.length ?? 0) - 1) {
			const nextPart = getNextPart(exam!, 1);
			const nextPartQuestion = getNextPartQuestion(exam!, 1);
			setCurrentPart(nextPart);
			setCurrentQuestion(nextPartQuestion);
		} else {
			setCurrentQuestion(
				exam?.part1?.part1Questions?.[questionIdx + 1]?.questionId ??
					null
			);
		}
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const handlePrev = () => {
		const questionIdx =
			exam?.part1?.part1Questions?.findIndex(
				(question) => question?.questionId == currentQuestion
			) ?? -1;
		if (questionIdx != 0 && questionIdx != -1)
			setCurrentQuestion(
				exam?.part1?.part1Questions?.[questionIdx - 1]?.questionId ??
					null
			);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		question && (
			<section className="grid grid-cols-2 gap-6 w-full h-full">
				<div className="flex flex-col gap-6 items-start">
					<img
						src={question?.imageUrls?.[0]}
						alt="Part 1 image"
						className="w-[600px] object-cover"
					/>
					{playing ? (
						<h1
							onClick={() => toggle()}
							className="flex items-center gap-4 font-medium text-base"
						>
							<PauseCircle className="w-12 h-12" />
							{formatTime(duration)}
						</h1>
					) : (
						<h1
							onClick={() => toggle()}
							className="flex items-center gap-4 font-medium text-base"
						>
							<PlayCircle className="w-12 h-12" />
							{formatTime(duration)}
						</h1>
					)}
				</div>
				<div className="flex w-full">
					<form className="w-[80%] flex flex-col gap-4 items-end">
						<div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg h-fit w-full">
							{exam && (
								<h1>
									Question{" "}
									{getCurrentQuestionPosition(
										question?.questionId,
										exam
									)}
								</h1>
							)}
							<div
								onClick={() => {
									pushResult(question?.questionId, "A");
								}}
								className={`flex items-center gap-4 ${
									check() == "A" && "bg-sky-200"
								} rounded-lg p-2`}
							>
								<input
									type="radio"
									className="w-4 h-4"
									id="optionA"
									readOnly
									checked={check() == "A"}
								/>
								<label htmlFor="optionA">A</label>
							</div>
							<div
								onClick={() => {
									pushResult(question?.questionId, "B");
								}}
								className={`flex items-center gap-4 ${
									check() == "B" && "bg-sky-200"
								} rounded-lg p-2`}
							>
								<input
									type="radio"
									className="w-4 h-4"
									id="optionB"
									readOnly
									checked={check() == "B"}
								/>
								<label htmlFor="optionB">B</label>
							</div>
							<div
								onClick={() => {
									pushResult(question?.questionId, "C");
								}}
								className={`flex items-center gap-4 ${
									check() == "C" && "bg-sky-200"
								} rounded-lg p-2`}
							>
								<input
									type="radio"
									className="w-4 h-4"
									id="optionC"
									readOnly
									checked={check() == "C"}
								/>
								<label htmlFor="optionC">C</label>
							</div>
							<div
								onClick={() => {
									pushResult(question?.questionId, "D");
								}}
								className={`flex items-center gap-4 ${
									check() == "D" && "bg-sky-200"
								} rounded-lg p-2`}
							>
								<input
									type="radio"
									className="w-4 h-4"
									id="optionD"
									readOnly
									checked={check() == "D"}
								/>
								<label htmlFor="optionD">D</label>
							</div>
						</div>
						<div className="flex gap-4 items-center w-fit">
							{exam?.part1?.part1Questions?.[0]?.questionId !=
								currentQuestion && (
								<Button
									onClick={handlePrev}
									className="w-fit"
									type="button"
									variant={"outline"}
								>
									Previous
								</Button>
							)}

							<Button
								onClick={handleNext}
								className="w-fit"
								type="button"
							>
								Next
							</Button>
						</div>
					</form>
				</div>
			</section>
		)
	);
};

export default Part1Testing;
