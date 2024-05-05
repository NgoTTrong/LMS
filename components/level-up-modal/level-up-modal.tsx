"use client";

import modalLevelUpStore from "@/stores/modal-level-up/modal-level-up-store";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import LottieApp from "../lottie/lottie-app";
import lottie from "../../public/gif/congra.json";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LevelUpModal = () => {
	const { openModal, setOpenModal, message, rank } = modalLevelUpStore();
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		isClient && (
			<Modal
				open={openModal}
				onCancel={() => setOpenModal(false)}
				title={"Congratulations"}
				onOk={() => {
					setOpenModal(false);
					router.push("/leaderboard");
				}}
			>
				<div className="w-[300px] relative mx-auto">
					<LottieApp lottie={lottie} />
					<h1 className="flex flex-col items-center gap-4 w-full absolute top-[50%] translate-y-[-50%] left-0 text-center font-bold text-2xl">
						{rank && rank?.rankIcon && (
							<img src={rank?.rankIcon} alt="" className="w-8" />
						)}
						{message}
					</h1>
					<p>
						See more details about the ranking system:{" "}
						<Link
							href={"/ranking"}
							onClick={() => {
								setOpenModal(false);
							}}
						>
							Here
						</Link>
					</p>
				</div>
			</Modal>
		)
	);
};

export default LevelUpModal;
