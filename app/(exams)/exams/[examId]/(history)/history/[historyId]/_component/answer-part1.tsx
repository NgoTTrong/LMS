"use client";
import {
	IExamDetail,
	IHistory,
	Part1Question,
} from "@/interfaces/exam/exam-interface";
import { Modal } from "antd";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentQuestionPosition } from "../../../../(take-test)/take-test/start/_helper/get-current-question-position";

type Props = {
	part1Questions: Part1Question[];
	history: IHistory;
	exam: IExamDetail;
};
const AnswerPart1 = ({ part1Questions, history, exam }: Props) => {
	const [numOfCorrects, setNumOfCorrects] = useState<number>(0);
	const [extend, setExtend] = useState<boolean>(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [choosenQuestion, setChoosenQuestion] = useState<Part1Question>();
	const checkQuestion = (
		questionId: string,
		answer: "A" | "B" | "C" | "D"
	) => {
		const idx = history?.result?.findIndex(
			(e) => e?.questionId == questionId
		);
		if (idx != -1) {
			if (history?.result?.[idx]?.option == answer) {
				return true;
			}
			return false;
		}
		return false;
	};
	const getAnswerInHistory = (questionId: string) => {
		const idx = history?.result?.findIndex(
			(e) => e?.questionId == questionId
		);
		return history?.result?.[idx]?.option;
	};
	useEffect(() => {
		setNumOfCorrects(
			part1Questions?.reduce(
				(total, e) =>
					total +
					(checkQuestion(e?.questionId, e?.question?.answer) ? 1 : 0),
				0
			)
		);
	}, [history]);
	return (
		part1Questions?.length != 0 && (
			<section className="flex flex-col gap-6 p-4 rounded-lg shadow-lg w-full">
				<div
					className="w-full flex items-center justify-between hover:cursor-pointer"
					onClick={() => setExtend((state) => !state)}
				>
					<h1 className="text-lg font-medium flex items-center gap-1">
						Part 1 ({numOfCorrects} / {part1Questions?.length}){" "}
						{numOfCorrects == part1Questions?.length ? (
							<Check className="text-green-500 w-6 h-6 ml-4" />
						) : (
							<X className="text-red-500 w-6 h-6 ml-4" />
						)}
					</h1>
					{!extend ? (
						<ChevronDown className="w-8 h-8" />
					) : (
						<ChevronUp className="w-8 h-8" />
					)}
				</div>
				{extend && (
					<div className="flex flex-col gap-6">
						{part1Questions?.map((question, idx) => (
							<div
								className="flex items-center gap-4 hover:cursor-pointer"
								onClick={() => {
									setChoosenQuestion(question);
									setOpenDetail(true);
								}}
								key={"q-" + question?.id}
							>
								Question{" "}
								{getCurrentQuestionPosition(
									question?.questionId,
									exam
								)}
								{question?.question?.content}
								{checkQuestion(
									question?.question?.id,
									question?.question?.answer
								) ? (
									<Check className="text-green-500" />
								) : (
									<X className="text-red-500" />
								)}
							</div>
						))}
					</div>
				)}
				{choosenQuestion && (
					<Modal
						open={openDetail}
						onCancel={() => setOpenDetail(false)}
						onOk={() => setOpenDetail(false)}
					>
						<div className="flex flex-col gap-4">
							<h1 className="text-xl font-medium">
								Detail question
							</h1>
							<div className="flex flex-col gap-2">
								<h2 className="text-base">
									Q: {choosenQuestion?.question?.content}
								</h2>
								{choosenQuestion?.question?.optionA && (
									<div
										className={`ml-4 text-sm p-2 rounded-lg ${
											getAnswerInHistory(
												choosenQuestion?.questionId
											) == "A" &&
											choosenQuestion?.question?.answer ==
												"A"
												? "bg-green-200"
												: getAnswerInHistory(
														choosenQuestion?.questionId
												  ) == "A" &&
												  !(
														choosenQuestion
															?.question
															?.answer == "A"
												  )
												? "bg-red-200"
												: "bg-slate-200"
										}`}
									>
										<span>
											A.{" "}
											{choosenQuestion?.question?.optionA}
										</span>
									</div>
								)}
								{choosenQuestion?.question?.optionB && (
									<div
										className={`ml-4 text-sm p-2 rounded-lg ${
											getAnswerInHistory(
												choosenQuestion?.questionId
											) == "B" &&
											choosenQuestion?.question?.answer ==
												"B"
												? "bg-green-200"
												: getAnswerInHistory(
														choosenQuestion?.questionId
												  ) == "B" &&
												  !(
														choosenQuestion
															?.question
															?.answer == "B"
												  )
												? "bg-red-200"
												: "bg-slate-200"
										}`}
									>
										<span>
											B.{" "}
											{choosenQuestion?.question?.optionB}
										</span>
									</div>
								)}
								{choosenQuestion?.question?.optionC && (
									<div
										className={`ml-4 text-sm p-2 rounded-lg ${
											getAnswerInHistory(
												choosenQuestion?.questionId
											) == "C" &&
											choosenQuestion?.question?.answer ==
												"C"
												? "bg-green-200"
												: getAnswerInHistory(
														choosenQuestion?.questionId
												  ) == "C" &&
												  !(
														choosenQuestion
															?.question
															?.answer == "B"
												  )
												? "bg-red-200"
												: "bg-slate-200"
										}`}
									>
										<span>
											C.{" "}
											{choosenQuestion?.question?.optionC}
										</span>
									</div>
								)}
								{choosenQuestion?.question?.optionD && (
									<div
										className={`ml-4 text-sm p-2 rounded-lg ${
											getAnswerInHistory(
												choosenQuestion?.questionId
											) == "D" &&
											choosenQuestion?.question?.answer ==
												"D"
												? "bg-green-200"
												: getAnswerInHistory(
														choosenQuestion?.questionId
												  ) == "D" &&
												  !(
														choosenQuestion
															?.question
															?.answer == "D"
												  )
												? "bg-red-200"
												: "bg-slate-200"
										}`}
									>
										<span>
											D.{" "}
											{choosenQuestion?.question?.optionD}
										</span>
									</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<h2 className="text-base">
									Correct Answer:{" "}
									<span className="text-green-600">
										Option{" "}
										{choosenQuestion?.question?.answer}
									</span>
								</h2>
							</div>
							<div className="flex flex-col gap-2">
								<h2 className="text-base">Explain:</h2>
								<div
									className="text-base"
									dangerouslySetInnerHTML={{
										__html: choosenQuestion?.question
											?.explain,
									}}
								></div>
							</div>
						</div>
					</Modal>
				)}
			</section>
		)
	);
};

export default AnswerPart1;
