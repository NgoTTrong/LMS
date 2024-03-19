// import React, { useEffect, useState } from "react";
// import styles from "@/app/styles/StudyGroupPostItem.module.css";
// import ReplyForm from "../_comment/reply-form";
// import Comment from "../_comment/comment";
// const StudyGroupPostItem = ({ post, comments }) => {
// 	const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

// 	const handleToggleReplyForm = (e) => {
// 		e.preventDefault();
// 		setIsReplyFormOpen(!isReplyFormOpen);
// 	};

// 	const formatDate = (dateString: string) => {
// 		const date = new Date(dateString);

// 		const hours = date.getHours().toString().padStart(2, "0");
// 		const minutes = date.getMinutes().toString().padStart(2, "0");
// 		const day = date.getDate().toString().padStart(2, "0");
// 		const month = (date.getMonth() + 1).toString().padStart(2, "0");
// 		const year = date.getFullYear();

// 		return `${hours}:${minutes} ${day}/${month}/${year}`;
// 	};
// 	return (
// 		<div className={styles["studygroup-postitem"]}>
// 			<div className={styles["studygroup-postitem-header"]}>
// 				<div className="studygroup-postitem-author-avatar-wrap">
// 					<span className={styles["author-avatar"]}>
// 						{post.user_name[0]}
// 					</span>
// 				</div>
// 				<div className="postitem-author">
// 					<div className="postitem-author-name">
// 						<strong>{post.user_name}</strong>
// 					</div>
// 					<div className="postitem-created">
// 						{formatDate(post.created_at)}
// 					</div>
// 				</div>
// 			</div>
// 			<hr />
// 			<div className={styles["postitem-content"]}>
// 				<p>{post.content}</p>
// 			</div>
// 			<div className="studygroup-postitem-footer"></div>
// 			<div className="studygroup-postitem-comments">
// 				<div className={styles["comment-reply-action"]}>
// 					<a
// 						href="#comment-reply-form-71878"
// 						onClick={handleToggleReplyForm}
// 					>
// 						<strong>Trả lời</strong>
// 					</a>
// 					{isReplyFormOpen && (
// 						<ReplyForm
// 							postId={post.post_id}
// 							level={1}
// 							groupId={post.group_id}
// 							commentParentId={null}
// 						></ReplyForm>
// 					)}
// 				</div>
// 				<Comment groupId={post.group_id} comments={comments}></Comment>
// 			</div>
// 		</div>
// 	);
// };

// export default StudyGroupPostItem;
