// import React, { ReactNode, useEffect, useState } from "react";
// import styles from "@/app/styles/LearnGroupHeader.module.css";
// import axios from "axios";
// import JoinPopup from "./join-popup";
// import ReactDOM from "react-dom";

// type Props = { groupData: any };
// export default function LearnGroupHeader({ groupData }: Props) {
// 	const [showPopup, setShowPopup] = useState(false);
// 	const userId = process.env.NEXT_PUBLIC_USER_ID;

// 	const handleClose = () => {
// 		setShowPopup(false);
// 	};
// 	const handleOut = async () => {
// 		const confirmText = window.confirm(
// 			"Bạn có chắc chắn muốn rời khỏi nhóm?"
// 		);
// 		if (confirmText) {
// 			try {
// 				const response = await axios.patch(
// 					`http://localhost:8080/group/${groupData?.id}/out`,
// 					{
// 						member_id: process.env.NEXT_PUBLIC_USER_ID,
// 					}
// 				);
// 			} catch (error) {}
// 			window.location.href = "/groups/";
// 		}
// 	};

// 	const handleJoin = async () => {
// 		setShowPopup(true);
// 	};

// 	const isUserInGroup = groupData?.member_ids?.includes(
// 		process.env.NEXT_PUBLIC_USER_ID
// 	);

// 	const isInWaitingList = groupData?.candidates_waiting?.includes(
// 		process.env.NEXT_PUBLIC_USER_ID
// 	);

// 	const isAuthor = groupData?.user_id === process.env.NEXT_PUBLIC_USER_ID;

// 	return (
// 		<div className={styles["content-header"]}>
// 			{showPopup && (
// 				<PopupPortal>
// 					<>
// 						<div className={styles["backdrop"]}></div>
// 						<JoinPopup
// 							handleClose={handleClose}
// 							groupId={groupData?.id}
// 						/>
// 					</>
// 				</PopupPortal>
// 			)}
// 			<div className={styles["container"]}>
// 				<div className="mb-2">
// 					<a href="/groups/">&lt;&lt; Xem tất cả các nhóm</a>
// 				</div>

// 				<div className={styles["studygroup-header"]}>
// 					<div className={styles["studygroup-header-info"]}>
// 						<div className={styles["studygroup-header-image"]}>
// 							<img
// 								className={styles["studygroup-thumbnail"]}
// 								src={groupData?.image}
// 								alt={groupData?.title}
// 							/>
// 						</div>
// 						<div className={styles["studygroup-header-details"]}>
// 							<div className={styles["studygroup-header-title"]}>
// 								<h1>
// 									{groupData?.title}
// 									<span className="studygroup-icon fal fa-globe ml-1"></span>
// 								</h1>
// 							</div>
// 							<div className="studygroup-header-subtitle">
// 								Nhóm tạo bởi: {groupData?.created_by} ·{" "}
// 								{groupData?.members?.length} thành viên
// 							</div>
// 							<div className="studygroup-header-description">
// 								{groupData?.description}
// 							</div>
// 						</div>
// 					</div>
// 					{!isAuthor && (
// 						<div className={styles["studygroup-header-btnwrap"]}>
// 							{!isUserInGroup ? (
// 								isInWaitingList ? (
// 									<span className={styles["btn"]}>
// 										Chờ duyệt
// 									</span>
// 								) : (
// 									<span
// 										className={styles["btn"]}
// 										onClick={handleJoin}
// 									>
// 										Tham gia
// 									</span>
// 								)
// 							) : (
// 								<span
// 									className={styles["btn"]}
// 									onClick={handleOut}
// 								>
// 									Rời nhóm
// 								</span>
// 							)}
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 			<hr />
// 		</div>
// 	);
// }
// const PopupPortal = ({ children }: { children: ReactNode }) => {
// 	const portalRoot = document.createElement("div");
// 	portalRoot.id = "popup-root";
// 	document.body.appendChild(portalRoot);

// 	return ReactDOM.createPortal(children, portalRoot);
// };
