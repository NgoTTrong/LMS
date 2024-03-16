import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { Part1Question, Part2Question } from "@/interfaces/exam/exam-interface";
import { formatTime } from "@/lib/functions";
import useExam from "@/stores/exam/exam-store";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getNextPart } from "../../_helper/get-next-part";
import { getNextPartQuestion } from "../../_helper/get-next-part-question";
import { getCurrentQuestionPosition } from "../../_helper/get-current-question-position";
import { getPrevPart } from "../../_helper/get-prev-part";
import { getPrevPartQuestion } from "../../_helper/get-prev-part-question";

const Part2Testing = () => {
	const {
		exam,
		currentPart,
		currentQuestion,
		result,
		pushResult,
		setCurrentPart,
		setCurrentQuestion,
	} = useExam();
	const { playing, toggle, setAudio, duration } = useAudio();
	const [question, setQuestion] = useState<Part2Question>();
	useEffect(() => {
		if (currentQuestion) {
			const idx = exam?.part2?.part2Questions?.findIndex(
				(_question) => _question?.questionId == currentQuestion
			);
			if (idx != undefined && idx != -1) {
				setQuestion(exam?.part2?.part2Questions?.[idx]);
				setAudio(
					new Audio(exam?.part2?.part2Questions?.[idx]?.audioUrl)
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
			exam?.part2?.part2Questions?.findIndex(
				(question) => question?.questionId == currentQuestion
			) ?? -1;
		if (questionIdx == (exam?.part2?.part2Questions?.length ?? 0) - 1) {
			const nextPart = getNextPart(exam!, 2);
			const nextPartQuestion = getNextPartQuestion(exam!, 2);
			setCurrentPart(nextPart);
			setCurrentQuestion(nextPartQuestion);
		} else {
			setCurrentQuestion(
				exam?.part2?.part2Questions?.[questionIdx + 1]?.questionId ??
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
			exam?.part2?.part2Questions?.findIndex(
				(question) => question?.questionId == currentQuestion
			) ?? -1;
		if (questionIdx != 0 && questionIdx != -1) {
			setCurrentQuestion(
				exam?.part2?.part2Questions?.[questionIdx - 1]?.questionId ??
					null
			);
		} else {
			if (exam) {
				setCurrentPart(getPrevPart(exam, 2));
				setCurrentQuestion(getPrevPartQuestion(exam, 2));
			}
		}
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		question && (
			<section className="grid grid-cols-2 gap-6 w-full h-full">
				<div className="flex flex-col gap-6 items-start">
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
						</div>
						<div className="flex gap-4 items-center w-fit">
							<Button
								onClick={handlePrev}
								className="w-fit"
								type="button"
								variant={"outline"}
							>
								Previous
							</Button>

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

export default Part2Testing;
