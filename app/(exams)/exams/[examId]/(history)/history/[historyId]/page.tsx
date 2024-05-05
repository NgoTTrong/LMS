import ExamService from "@/services/exam/exam-service";
import { Blend, Check } from "lucide-react";
import { redirect } from "next/navigation";
import AnswerPart1 from "./_component/answer-part1";
import AnswerPart2 from "./_component/answer-part2";
import AnswerPart3 from "./_component/answer-part3";
import {
	GroupPart3Question,
	GroupPart4Question,
	GroupPart6Question,
	GroupPart7Question,
} from "@/interfaces/exam/exam-interface";
import AnswerPart4 from "./_component/answer-part4";
import AnswerPart5 from "./_component/answer-part5";
import AnswerPart6 from "./_component/answer-part6";
import AnswerPart7 from "./_component/answer-part7";
import { Button } from "@/components/ui/button";
import GetPracticeCourse from "./_component/get-practice-course";
import ReceivePoint from "./_component/receive-point";

type Props = {
	params: {
		examId: string;
		historyId: string;
	};
};
const HistoryPage = async ({ params }: Props) => {
	const history = await ExamService.getHistoryExam(params?.historyId);
	if (!history) {
		redirect("/search");
	}
	return (
		<main className="p-6 flex flex-col gap-6 w-full max-w-[1024px]">
			<h1 className="text-2xl font-semibold flex items-center gap-4 text-sky-600 w-full justify-center">
				Final Score <Blend />
			</h1>
			<section className="flex items-start gap-12 justify-between w-full">
				<div className="flex justify-end flex-1">
					<div
						className={`w-[300px] h-[300px] rounded-lg flex items-center justify-center ${
							history?.history?.score < 300
								? "bg-red-600"
								: history?.history?.score < 600
								? "bg-yellow-400"
								: "bg-green-500"
						}`}
						style={{
							backgroundImage:
								"url(https://a.storyblok.com/f/79503/599x599/533efa7333/desktop-badge.svg)",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					>
						<h1 className="text-5xl font-bold">
							{history?.history?.score}
						</h1>
					</div>
				</div>
				<div className="flex flex-1 items-start flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h1 className="text-xl font-medium">Statistics</h1>
						<span className="text-base flex items-center gap-2">
							Total corrects{":"}
							<span className=" text-green-500">
								{history?.history?.numOfCorrects}
							</span>
							/
							<span>
								{Math.floor(
									(history?.history?.numOfCorrects * 1000) /
										history?.history?.score
								)}
							</span>
							<Check className={"text-green-500"} />
						</span>
						<span className="text-base flex flex-col">
							Wrong topics{":"}
							<ul className="list-disc flex flex-col gap-2 ml-8 mt-2">
								{history?.history?.wrongTopics?.map(
									(topic, idx) => (
										<li key={"topic-" + idx}>
											{topic?.name}
										</li>
									)
								)}
							</ul>
						</span>
					</div>
					<GetPracticeCourse historyId={history?.history?.id} />
				</div>
			</section>
			<section className="w-full items-center justify-center flex flex-col gap-6 min-w-[700px]">
				{history?.exam?.part1 && (
					<AnswerPart1
						part1Questions={
							history?.exam?.part1?.part1Questions ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part2 && (
					<AnswerPart2
						part2Questions={
							history?.exam?.part2?.part2Questions ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part3 && (
					<AnswerPart3
						part3Questions={
							history?.exam?.part3?.part3Questions?.reduce(
								(arr: GroupPart3Question[], e) => [
									...arr,
									...e?.groupPart3Questions,
								],
								[]
							) ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part4 && (
					<AnswerPart4
						part4Questions={
							history?.exam?.part4?.part4Questions?.reduce(
								(arr: GroupPart4Question[], e) => [
									...arr,
									...e?.groupPart4Questions,
								],
								[]
							) ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part5 && (
					<AnswerPart5
						part5Questions={
							history?.exam?.part5?.part5Questions ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part6 && (
					<AnswerPart6
						part6Questions={
							history?.exam?.part6?.part6Questions?.reduce(
								(arr: GroupPart6Question[], e) => [
									...arr,
									...e?.groupPart6Questions,
								],
								[]
							) ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
				{history?.exam?.part7 && (
					<AnswerPart7
						part7Questions={
							history?.exam?.part7?.part7Questions?.reduce(
								(arr: GroupPart7Question[], e) => [
									...arr,
									...e?.groupPart7Questions,
								],
								[]
							) ?? []
						}
						exam={history?.exam}
						history={history?.history}
					/>
				)}
			</section>
			<ReceivePoint
				historyId={history?.history?.id}
				point={history?.exam?.point}
			/>
		</main>
	);
};

export default HistoryPage;
