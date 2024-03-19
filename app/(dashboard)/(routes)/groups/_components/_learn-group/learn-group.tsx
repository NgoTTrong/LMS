// import React, { useEffect, useState } from "react";
// import StudyGroupPostItem from "./study-group-post-item";
// import styles from "@/app/styles/LearnGroup.module.css";
// import LearnGroupHeader from "./learn-group-header";
// import CreatePost from "./create-post";
// import axios from "axios";
// type Props = { groupId: string };
// const LearnGroup = ({ groupId }: Props) => {
// 	const [groupData, setGroupData] = useState<any>(null);
// 	const [posts, setPosts] = useState([]);
// 	const [commentsDict, setCommentsDict] = useState(null);
// 	const APPROVE = "APPROVE";
// 	const REJECT = "REJECT";

// 	useEffect(() => {
// 		const fetchGroupData = async () => {
// 			try {
// 				const response = await axios(
// 					`http://localhost:8080/group/${groupId}`,
// 					{
// 						method: "GET",
// 						headers: {
// 							"Content-Type": "application/json",
// 							"X-User-ID": process.env.NEXT_PUBLIC_USER_ID,
// 						},
// 					}
// 				);
// 				if (response && response?.ok) {
// 					const data = await response?.json();
// 					setGroupData(data.data);
// 				} else {
// 					throw new Error("Failed to fetch group data");
// 				}
// 			} catch (error) {}
// 		};
// 		const fetchPostData = async () => {
// 			try {
// 				const response = await axios(`http://localhost:8080/post`, {
// 					method: "GET",
// 					headers: {
// 						"Content-Type": "application/json",
// 						"X-Group-Id": groupId,
// 					},
// 				});
// 				if (response && response?.ok) {
// 					const data = await response?.json();
// 					setPosts(data.data);
// 				} else {
// 					throw new Error("Failed to fetch post data");
// 				}
// 			} catch (error) {}
// 		};
// 		const fetchComment = async () => {
// 			try {
// 				const response = await axios(
// 					"http://localhost:8080/group-comments",
// 					{
// 						method: "GET",
// 						headers: {
// 							"Content-Type": "application/json",
// 							"X-Group-Id": groupId,
// 						},
// 					}
// 				);
// 				const data = await response?.json();
// 				setCommentsDict(data.data);
// 			} catch (error) {}
// 		};
// 		if (groupId) {
// 			fetchGroupData();
// 			fetchPostData();
// 			fetchComment();
// 		}
// 	}, [groupId]);

// 	const handleApprove = async (groupId: number, candidate_waiting: any) => {
// 		try {
// 			const response = await axios.patch(
// 				`http://localhost:8080/group/${groupId}/approve`,
// 				{
// 					candidate_waiting,
// 				}
// 			);
// 		} catch (error) {}
// 	};

// 	const handleReject = async (groupId: number, candidate_waiting: any) => {
// 		try {
// 			const response = await axios.patch(
// 				`http://localhost:8080/group/${groupId}/reject`,
// 				{
// 					candidate_waiting,
// 				}
// 			);
// 		} catch (error) {}
// 	};

// 	const handleDivClick = (
// 		option: "APPROVE" | "REJECT",
// 		candidate_waiting: any
// 	) => {
// 		let confirmationMessage = "";
// 		if (option === APPROVE) {
// 			confirmationMessage =
// 				"Bạn có muốn đồng ý người dùng tham gia nhóm?";
// 		} else if (option === REJECT) {
// 			confirmationMessage =
// 				"Bạn có muốn từ chối người dùng tham gia nhóm?";
// 		}
// 		const isConfirmed = window.confirm(confirmationMessage);
// 		if (isConfirmed) {
// 			if (option === APPROVE) {
// 				handleApprove(groupId, candidate_waiting);
// 			} else if (option === REJECT) {
// 				handleReject(groupId, candidate_waiting);
// 			}
// 		}
// 	};

// 	const isAuthor = groupData?.user_id === process.env.NEXT_PUBLIC_USER_ID;

// 	return (
// 		<div className={styles["container"]}>
// 			<LearnGroupHeader groupData={groupData} />
// 			<div className={styles["post-container"]}>
// 				<div className={styles["post-item"]}>
// 					<CreatePost groupId={groupId} />
// 					<br></br>
// 					{posts.length === 0 || !commentsDict ? (
// 						<p>
// 							<i>{"Wow, thiệt trống trải quá đi :("}</i>
// 						</p>
// 					) : (
// 						posts.map((post, index) => (
// 							<StudyGroupPostItem
// 								key={index}
// 								post={post}
// 								comments={commentsDict[post?.post_id]}
// 							/>
// 						))
// 					)}
// 				</div>

// 				<div className={styles["member-container"]}>
// 					<div className={styles["contentblock"]}>
// 						<div>Thành viên trong nhóm</div>
// 						<ul className={styles["list-member"]}>
// 							{groupData &&
// 								groupData?.members?.map(
// 									(member: any, index: number) => (
// 										<li key={index}>{member}</li>
// 									)
// 								)}
// 						</ul>
// 					</div>
// 					<div className={styles["contentblock"]}>
// 						<div>Thành viên chờ duyệt</div>
// 						<ul className={styles["list-member"]}>
// 							{groupData &&
// 								groupData?.candidates_waiting_name?.map(
// 									(
// 										candidate_waiting_name: any,
// 										index: number
// 									) => (
// 										<li
// 											key={index}
// 											style={{ display: "flex" }}
// 										>
// 											<div className="pe-1">
// 												{candidate_waiting_name}
// 											</div>
// 											<div
// 												className="pe-1"
// 												style={{
// 													cursor: "pointer",
// 													marginRight: "5px",
// 													color: "green",
// 												}}
// 												onClick={() =>
// 													handleDivClick(
// 														APPROVE,
// 														groupData
// 															?.candidates_waiting[
// 															index
// 														]
// 													)
// 												}
// 											>
// 												{isAuthor && (
// 													<img
// 														src="/image/approve.svg"
// 														alt=""
// 													/>
// 												)}
// 											</div>
// 											<div
// 												style={{
// 													cursor: "pointer",
// 													color: "red",
// 												}}
// 												onClick={() =>
// 													handleDivClick(
// 														REJECT,
// 														groupData
// 															?.candidates_waiting[
// 															index
// 														]
// 													)
// 												}
// 											>
// 												{isAuthor && (
// 													<img
// 														src="/image/reject.svg"
// 														alt=""
// 													/>
// 												)}
// 											</div>
// 										</li>
// 									)
// 								)}
// 						</ul>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default LearnGroup;
