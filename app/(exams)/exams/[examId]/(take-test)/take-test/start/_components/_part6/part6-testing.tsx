import { Part6Question } from "@/interfaces/exam/exam-interface";
import useExam from "@/stores/exam/exam-store";
import { useEffect, useState } from "react";
import GroupPart6Testing from "./group-part6-testing";

const Part6Testing = () => {
	const { exam, currentQuestion } = useExam();
	const [question, setQuestion] = useState<Part6Question>();
	useEffect(() => {
		if (currentQuestion) {
			const idx = exam?.part6?.part6Questions?.findIndex((_question) =>
				_question?.groupPart6Questions?.some(
					(e) => e?.questionId == currentQuestion
				)
			);

			if (idx != undefined && idx != -1) {
				setQuestion(exam?.part6?.part6Questions?.[idx]);
			}
		}
	}, [currentQuestion]);

	return (
		question && (
			<section className="grid grid-cols-2 gap-6 w-full h-full">
				<div className="flex flex-col gap-6 items-start">
					{question?.imageUrls &&
						question?.imageUrls?.map((img, idx) => (
							<img
								src={img}
								alt="Part 1 image"
								className="w-[250px] object-cover"
								key={"part-6-img-" + idx}
							/>
						))}
				</div>
				<div className="flex w-full flex-col gap-4 pb-6">
					{question && <GroupPart6Testing part6Question={question} />}
				</div>
			</section>
		)
	);
};

export default Part6Testing;
