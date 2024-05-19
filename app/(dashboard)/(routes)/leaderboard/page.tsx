"use client";

import LoadingModal from "@/components/loading/loading-modal";
import { useClientAuth } from "@/hooks/use-client-auth";
import { ILeaderBoard } from "@/interfaces/leaderboard/leaderboard-interface";
import LeaderBoardService from "@/services/leaderboard/leaderboard-service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LeaderBoard = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [leaderBoard, setLeaderBoard] = useState<{
		user: ILeaderBoard;
		leaderBoard: ILeaderBoard[];
	}>();
	const user = useClientAuth();

	const fetchLeaderBoard = async () => {
		try {
			setIsLoading(true);
			const _leaderBoard = await LeaderBoardService.getLeaderBoard(
				user?.userId
			);
			if (_leaderBoard) {
				setLeaderBoard(_leaderBoard);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLeaderBoard();
	}, []);
	return (
		<main className="p-6 h-full">
			{leaderBoard && (
				<div className="w-full h-full max-h-full overflow-auto text-sm font-medium flex flex-col gap-4 bg-white p-4 rounded-lg border border-solid border-slate-300">
					<div className="grid grid-cols-12 bg-gray-200 p-2 rounded-lg">
						<div className="col-span-2">Rank</div>
						<div className="col-span-8">User</div>
						<div className="col-span-2">Points</div>
					</div>
					<div className="grid grid-cols-12 p-2 rounded-lg items-center">
						<div className="col-span-2">🚀</div>
						<div className="col-span-8 flex gap-2 items-center">
							<div className="relative">
								<img
									src={leaderBoard?.user?.user?.avatar}
									alt=""
									className="w-10 h-10 rounded-full object-cover border border-solid border-sky-500"
								/>
								<img
									src={
										leaderBoard?.user?.user?.rank?.rankIcon
									}
									alt=""
									className="w-4 object-cover absolute top-[-2px] right-[-2px]"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="md:text-sm text-xs">
									{leaderBoard?.user?.user?.name}
								</h1>
								<p className="md:text-xs text-[10px] text-slate-500">
									{leaderBoard?.user?.user?.rank?.name}
								</p>
							</div>
							<div className="md:px-2 md:py-1 px-1 py-[2px] rounded-lg bg-emerald-300 text-emerald-700 md:text-xs text-[10px]">
								You
							</div>
						</div>
						<div className="col-span-2">
							<div className="w-fit md:px-2 md:py-1 px-1 py-[2px] rounded-lg bg-emerald-300 text-emerald-700 md:text-xs text-[10px]">
								{leaderBoard?.user?.point}
							</div>
						</div>
					</div>

					{leaderBoard?.leaderBoard?.map((member, idx) => (
						<div
							className="w-full flex flex-col gap-2"
							key={"member-" + idx}
						>
							<hr />
							<div className="grid grid-cols-12 p-2 rounded-lg items-center">
								<div className="col-span-2">{idx + 1}.</div>
								<div className="col-span-8 flex gap-2 items-center">
									<div className="relative">
										<img
											src={member?.user?.avatar}
											alt=""
											className="w-10 h-10 rounded-full object-cover border border-solid border-sky-500"
										/>
										<img
											src={member?.user?.rank?.rankIcon}
											alt=""
											className="w-4 object-cover absolute top-[-2px] right-[-2px]"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<h1 className="md:text-sm text-xs">
											{member?.user?.name}
										</h1>
										<p className="md:text-xs text-[10px] text-slate-500">
											{member?.user?.rank?.name}
										</p>
									</div>
								</div>
								<div className="col-span-2">
									<div className="w-fit md:px-2 md:py-1 px-1 py-[2px] rounded-lg bg-emerald-300 md:text-xs text-[10px]">
										{member?.point}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{isLoading && <LoadingModal />}
		</main>
	);
};

export default LeaderBoard;
