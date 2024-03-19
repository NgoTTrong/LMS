// import { Spin } from "antd";
// import React, { useEffect, useState } from "react";
// import styles from "@/app/styles/CommentItem.module.css";
// import ReplyForm from "./reply-form";
// // import { isShowReplyForm } from "./shareService";
// const CommentItem = (props: any) => {
// 	const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

// 	// useEffect(() => {
// 	// 	const subscription = isShowReplyForm.subscribe(() => {
// 	// 		setIsReplyFormOpen(false);
// 	// 	});

// 	// 	return () => {
// 	// 		subscription.unsubscribe();
// 	// 	};
// 	// }, []);

// 	const handleToggleReplyForm = (e: any) => {
// 		e.preventDefault();
// 		setIsReplyFormOpen(!isReplyFormOpen);
// 	};

// 	return (
// 		<div className={styles["comments-wrapper"]}>
// 			<div className={styles["list-comment"]}>
// 				{props && (
// 					<div
// 						className={styles["comment-item"]}
// 						style={{ paddingLeft: `${52 * (props?.level - 1)}px` }}
// 					>
// 						<span className={styles["comment-avatar"]}>
// 							{props?.username &&
// 								props.username.length > 0 &&
// 								props.username[0]}
// 						</span>
// 						<div className={styles["comment-body"]}>
// 							<div className="comment-username">
// 								<strong>{props?.username}</strong>,{" "}
// 								{props?.date}
// 							</div>
// 							<div className="comment-content prewrap">
// 								{props?.content}
// 							</div>
// 							<div className={styles["comment-reply-action"]}>
// 								<a
// 									href="#comment-reply-form-71878"
// 									onClick={handleToggleReplyForm}
// 								>
// 									<strong>Trả lời</strong>
// 								</a>
// 								{isReplyFormOpen && (
// 									<ReplyForm
// 										postId={props.postId}
// 										level={props.level}
// 										groupId={props.groupId}
// 										commentParentId={props.id}
// 									></ReplyForm>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default CommentItem;
