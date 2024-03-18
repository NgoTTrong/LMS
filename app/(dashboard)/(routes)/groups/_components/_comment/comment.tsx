import { useEffect, useState } from "react";
import styles from "@/app/styles/Comment.module.css";
import CommentItem from "./comment-item";
type Props = {
	groupId: number;
	comments: any[];
};
const Comment = ({ groupId, comments }: Props) => {
	const [sortedComments, setSortedComments] = useState([]);

	useEffect(() => {
		const compareComments = (a, b) => {
			if (a.comment_id !== b.comment_id) {
				return a.comment_id - b.comment_id;
			}
			if (a.level !== b.level) {
				return a.level - b.level;
			}
			return (
				new Date(a.created_at).getTime() -
				new Date(b.created_at).getTime()
			);
		};

		const sortedComments = comments?.slice().sort(compareComments);
		setSortedComments(sortedComments);
	}, [comments]);

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);

		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		return `${hours}:${minutes} ${day}/${month}/${year}`;
	};

	return (
		<div className={styles["comments-wrapper"]}>
			<div className="list-comment">
				{sortedComments?.map((comment, index) => (
					<CommentItem
						key={index}
						id={comment.comment_id}
						level={comment.level}
						username={comment.user_name}
						date={formatDate(comment.created_at)}
						content={comment.message}
						postId={comment.post_id}
						groupId={comment.group_id}
					/>
				))}
			</div>
		</div>
	);
};

export default Comment;
