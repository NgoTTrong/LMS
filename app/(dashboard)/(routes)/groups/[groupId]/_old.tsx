// "use client";
// import React from "react";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import styles from "@/app/styles/Groups.module.css";
// import axios from "axios";
// import { GroupHeader } from "../_components/_group/group-header";
// import Group from "../_components/_group/group";
// import LearnGroup from "../_components/_learn-group/learn-group";
// const PostPage = () => {
// 	const url = usePathname();
// 	const groupId = url.split("/").filter(Boolean).pop();
// 	const [groups, setGroups] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const ME = "me";
// 	const userId = process.env.NEXT_PUBLIC_USER_ID;

// 	useEffect(() => {
// 		const fetchGroups = async () => {
// 			try {
// 				setIsLoading(true);
// 				const response = await axios.get(
// 					`http://localhost:8080/group/${ME}`,
// 					{
// 						headers: {
// 							"x-user-id": userId,
// 						},
// 					}
// 				);
// 				setGroups(response.data.data);
// 				setIsLoading(false);
// 			} catch (error) {
// 				console.error("Error fetching groups:", error);
// 			}
// 		};
// 		fetchGroups();
// 	}, []);

// 	const updateGroups = (newGroups: any) => {
// 		setIsLoading(true);
// 		setGroups(newGroups);
// 		setTimeout(() => {
// 			setIsLoading(false);
// 		}, 1000);
// 	};

// 	return (
// 		<main className="flex flex-col items-center  w-full overflow-hidden min-h-screen bg-white">
// 			{groupId === ME ? (
// 				<>
// 					<GroupHeader updateGroups={updateGroups} />

// 					<div className={styles["container"]}>
// 						{isLoading ? (
// 							<div className={styles["loading"]}>
// 								<p>Danh sách nhóm đang được tải ...</p>
// 								<img
// 									className={styles["loading-progress"]}
// 									src="/image/loading.svg"
// 								></img>
// 							</div>
// 						) : groups.length > 0 ? (
// 							groups.map((group, index) => {
// 								return (
// 									<Group key={index} group={group}></Group>
// 								);
// 							})
// 						) : (
// 							<p>
// 								<i>{"Wow, thiệt trống trải quá đi :("}</i>
// 							</p>
// 						)}
// 					</div>
// 				</>
// 			) : (
// 				groupId && <LearnGroup groupId={groupId} />
// 			)}
// 		</main>
// 	);
// };

// export default PostPage;
