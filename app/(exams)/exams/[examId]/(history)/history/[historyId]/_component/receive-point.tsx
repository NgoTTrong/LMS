"use client";

import { useClientAuth } from "@/hooks/use-client-auth";
import LeaderBoardService from "@/services/leaderboard/leaderboard-service";
import modalLevelUpStore from "@/stores/modal-level-up/modal-level-up-store";
import { useEffect, useState } from "react";

type Props = {
	historyId: string;
	point: number;
};
const ReceivePoint = ({ historyId, point }: Props) => {
	const { setOpenModal, setMessage, setRank } = modalLevelUpStore();
	const user = useClientAuth();
	useEffect(() => {
		if (localStorage.getItem(historyId)) {
		} else {
			localStorage.setItem(historyId, "true");
			const receivePoint = async () => {
				const rank = await LeaderBoardService.receicePoint(
					user?.userId,
					point
				);

				if (rank) {
					setRank(rank?.rank);
					if (rank?.isUpRank) {
						setMessage("Rank up to " + rank?.rank?.name);
					} else {
						setMessage("+" + point + " to rank leaderboard");
					}
					setOpenModal(true);
				}
			};
			receivePoint();
		}
	}, []);
	return <div></div>;
};

export default ReceivePoint;
