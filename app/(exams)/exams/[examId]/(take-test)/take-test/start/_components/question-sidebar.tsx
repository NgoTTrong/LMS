"use client";

import { Button } from "@/components/ui/button";
import {
	GroupPart3Question,
	GroupPart4Question,
	GroupPart6Question,
	GroupPart7Question,
	IExamDetail,
} from "@/interfaces/exam/exam-interface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getCurrentQuestion } from "../_helper/get-current-question";

type Props = {
	examDetail: IExamDetail;
};
const QuestionSidebar = ({ examDetail }: Props) => {
	const [openSideBar, setOpenSideBar] = useState<boolean>(false);
	return (
		<>
			<ChevronLeft
				className="w-8 h-8 absolute top-4 right-0 hover:opacity-70 hover:cursor-pointer shadow-lg rounded-lg"
				onClick={() => setOpenSideBar(true)}
			/>
			<section
				className={`w-[250px] h-full min-h-full max-h-full absolute right-0 top-0 bg-white shadow-sm rounded-lg border-l-2 border-slate-200 transition duration-300 ${
					openSideBar ? "translate-x-[0px]" : "translate-x-[300px]"
				}`}
			>
				<div className="flex items-center mt-4 ml-2 gap-4">
					<ChevronRight
						className="w-8 h-8 hover:opacity-70 hover:cursor-pointer"
						onClick={() => setOpenSideBar(false)}
					/>
					<h1 className="font-medium">Working time</h1>
				</div>
				<div className="flex flex-col gap-4 flex-1 px-4 py-2">
					<h1 className="w-full text-center text-xl">10:00</h1>
					<Button variant={"outline"}>End test</Button>
				</div>
				<section className="flex-1 overflow-auto flex flex-col gap-4">
					<h1 className="font-medium ml-4">Question listing</h1>
					<div className="flex flex-col gap-4 flex-1 px-4 py-2">
						{examDetail?.part1 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 1</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part1?.part1Questions?.map(
										(part1Question, idx) => (
											<p
												key={"part1-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{idx + 1}
											</p>
										)
									)}
								</div>
							</div>
						)}
						{examDetail?.part2 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 2</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part2?.part2Questions?.map(
										(part2Question, idx) => (
											<p
												key={"part2-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													1
												) +
													idx +
													1}
											</p>
										)
									)}
								</div>
							</div>
						)}
						{examDetail?.part3 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 3</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part3?.part3Questions
										?.reduce(
											(
												arr: GroupPart3Question[],
												group
											) => [
												...arr,
												...group?.groupPart3Questions,
											],
											[]
										)
										?.map((part3Question, idx) => (
											<p
												key={"part3-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													2
												) +
													idx +
													1}
											</p>
										))}
								</div>
							</div>
						)}
						{examDetail?.part4 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 4</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part4?.part4Questions
										?.reduce(
											(
												arr: GroupPart4Question[],
												group
											) => [
												...arr,
												...group?.groupPart4Questions,
											],
											[]
										)
										?.map((part4Question, idx) => (
											<p
												key={"part4-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													3
												) +
													idx +
													1}
											</p>
										))}
								</div>
							</div>
						)}
						{examDetail?.part5 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 5</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part5?.part5Questions?.map(
										(part5Question, idx) => (
											<p
												key={"part5-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													4
												) +
													idx +
													1}
											</p>
										)
									)}
								</div>
							</div>
						)}
						{examDetail?.part6 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 6</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part6?.part6Questions
										?.reduce(
											(
												arr: GroupPart6Question[],
												group
											) => [
												...arr,
												...group?.groupPart6Questions,
											],
											[]
										)
										?.map((part6Question, idx) => (
											<p
												key={"part6-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													5
												) +
													idx +
													1}
											</p>
										))}
								</div>
							</div>
						)}
						{examDetail?.part7 && (
							<div className="flex flex-col w-full gap-2">
								<h2 className="text-sm">Part 7</h2>
								<div className="w-full grid grid-cols-5 gap-2">
									{examDetail?.part7?.part7Questions
										?.reduce(
											(
												arr: GroupPart7Question[],
												group
											) => [
												...arr,
												...group?.groupPart7Questions,
											],
											[]
										)
										?.map((part7Question, idx) => (
											<p
												key={"part7-nav-" + idx}
												className="p-1 text-sm rounded-[4px] text-center border border-slate-500 text-slate-700 hover:cursor-pointer hover:bg-slate-700 hover:text-white hover:font-bold"
											>
												{getCurrentQuestion(
													examDetail!,
													6
												) +
													idx +
													1}
											</p>
										))}
								</div>
							</div>
						)}
					</div>
				</section>
			</section>
		</>
	);
};

export default QuestionSidebar;
