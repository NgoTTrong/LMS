import { Spin } from "antd";
import React, { ReactNode, useState } from "react";
import styles from "@/app/styles/Group.module.css";
import axios from "axios";
import ReactDOM from "react-dom";
import JoinPopup from "../_learn-group/join-popup";
import { Button } from "@/components/ui/button";
import { GroupForm } from "./group-form";

const Group: React.FC<{ group: any }> = ({ group }) => {
	const [showPopup, setShowPopup] = useState(false);
	const handleClose = () => {
		setShowPopup(false);
	};
	const handleOut = async () => {
		const confirmText = window.confirm(
			"Bạn có chắc chắn muốn rời khỏi nhóm?"
		);
		if (confirmText) {
			try {
				const response = await axios.patch(
					`http://localhost:8080/group/${group.id}/out`,
					{
						member_id: process.env.NEXT_PUBLIC_USER_ID,
					}
				);
			} catch (error) {}
			window.location.href = "/groups/";
		}
	};

	const isUserInGroup = group?.member_ids?.includes(
		process.env.NEXT_PUBLIC_USER_ID
	);

	const isInWaitingList = group?.candidates_waiting?.includes(
		process.env.NEXT_PUBLIC_USER_ID
	);

	const handleJoin = async () => {
		setShowPopup(true);
	};

	const isUserNotInGroup = !group?.member_ids?.includes(
		process.env.NEXT_PUBLIC_USER_ID
	);

	return (
		<div className={styles["studygroup-listitem"]}>
			{showPopup && (
				<PopupPortal>
					<>
						<div className={styles["backdrop"]}></div>
						<JoinPopup
							handleClose={handleClose}
							groupId={group?.id}
							groupName={group?.title}
						/>
					</>
				</PopupPortal>
			)}
			<div className={"w-full flex items-center gap-4"}>
				<div className={styles["studygroup-listitem-image"]}>
					<img
						className={styles["studygroup-thumbnail"]}
						src={group?.image}
						alt={group?.title}
					/>
				</div>
				<div className={"flex flex-col gap-1 flex-1"}>
					<h2 className={styles["studygroup-listitem-title"]}>
						<a href={"/groups/" + group?.id}>{group?.title}</a>
						<span className="studygroup-icon fal fa-globe ml-1"></span>
					</h2>
					<div className="studygroup-listitem-subtitle">
						Nhóm tạo bởi: {group?.createdBy} ·{" "}
						{group?.members?.length} thành viên
					</div>
					<div className="studygroup-listitem-description">
						{group?.description}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center ml-4">
				{!isUserInGroup ? (
					isInWaitingList ? (
						<span className={styles["btn"]}>Chờ duyệt</span>
					) : (
						<Button onClick={handleJoin}>Tham gia</Button>
					)
				) : (
					<span className={styles["btn"]} onClick={handleOut}>
						Rời nhóm
					</span>
				)}
			</div>
		</div>
	);
};

export default Group;
const PopupPortal = ({ children }: { children: ReactNode }) => {
	const portalRoot = document.createElement("div");
	portalRoot.id = "popup-root";
	document.body.appendChild(portalRoot);

	return ReactDOM.createPortal(children, portalRoot);
};
