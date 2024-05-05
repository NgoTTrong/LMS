"use client";

import { Button } from "@/components/ui/button";
import LeaderBoardService from "@/services/leaderboard/leaderboard-service";
import UserProgressService from "@/services/user-progress/user-progress-serivce";
import modalLevelUpStore from "@/stores/modal-level-up/modal-level-up-store";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle, XCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
	courseId: string;
	nextChapterId?: string;
	chapterId: string;
	isCompleted?: boolean;
	point: number;
};
const CourseProgressButton = ({
	courseId,
	nextChapterId,
	chapterId,
	isCompleted,
	point,
}: Props) => {
	const Icon = isCompleted ? XCircle : CheckCircle;
	const router = useRouter();
	const { userId } = useAuth();
	if (!userId) {
		redirect("/");
	}
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setOpenModal, setMessage, setRank } = modalLevelUpStore();
	const onClick = async () => {
		try {
			setIsLoading(true);
			const _progress = await UserProgressService.update(userId, {
				isCompleted: isCompleted ? false : true,
				chapterId,
			});
			if (_progress) {
				toast.success("Completed chapter");
				console.log(nextChapterId);
				if (nextChapterId && isCompleted == false) {
					router.push(
						`/practice-courses/${courseId}/chapters/${nextChapterId}`
					);
				} else {
					if (isCompleted == false) {
						const rank = await LeaderBoardService.receicePoint(
							userId,
							point
						);

						if (rank) {
							setRank(rank?.rank);
							if (rank?.isUpRank) {
								setMessage("Rank up to " + rank?.rank?.name);
							} else {
								setMessage(
									"+" + point + " to rank leaderboard"
								);
							}
							setOpenModal(true);
						}
					}
				}
				router.refresh();
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			type="button"
			variant={isCompleted ? "outline" : "success"}
		>
			{isCompleted ? "Not completed" : "Mark as complete"}
			<Icon className="w-4 h-4 ml-2" />
		</Button>
	);
};

export default CourseProgressButton;
