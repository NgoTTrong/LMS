"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const QuestionSidebar = () => {
	const [openSideBar, setOpenSideBar] = useState<boolean>(false);
	return (
		<div className="flex w-full h-full">
			<ChevronLeft
				className="w-8 h-8 absolute top-4 right-0 hover:opacity-70 hover:cursor-pointer shadow-lg"
				onClick={() => setOpenSideBar(true)}
			/>
			<section
				className={`w-[300px] h-full absolute overflow-auto right-0 top-0 bg-white shadow-sm border-l-2 border-slate-200 transition duration-300 ${
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
			</section>
		</div>
	);
};

export default QuestionSidebar;
