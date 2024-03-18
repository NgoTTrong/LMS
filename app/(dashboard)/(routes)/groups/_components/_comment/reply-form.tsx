import React, { useState } from "react";
import styles from "@/app/styles/ReplyForm.module.css";
// import { isShowReplyForm } from "./shareService";
import axios from "axios";
interface ChildProps {
	id: string;
	level: number;
}

const ReplyForm = (React.FC<ChildProps> = ({
	postId,
	level,
	groupId,
	commentParentId,
}) => {
	const userId = process.env.NEXT_PUBLIC_USER_ID;

	const [message, setMessage] = useState("");
	function formatDate(date: Date) {
		const timeString = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		const dateString = date.toLocaleDateString("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
		});
		return `${timeString} ${dateString} `;
	}

	// const updateData = ({ message: IComment }) => {
	//   const sampleComment: IComment = {
	//     id: id,
	//     level: level,
	//     username: "JohnDoe",
	//     date: formatDate(new Date()),
	//     content: message,
	//   };
	//   observableModel.next(sampleComment);
	// };

	const handleMessageChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setMessage(event.target.value);
	};
	// const showReplyForm = () => {
	// 	isShowReplyForm.next(false);
	// };

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!message) {
			return;
		}
		event.preventDefault();
		// showReplyForm(true);

		try {
			// Define headers
			const headers = {
				"Content-Type": "application/json", // Example header
				"X-User-Id": userId,
				"X-Post-Id": postId,
			};

			// Send POST request using Axios with headers
			const response = await axios.post(
				"http://localhost:8080/group-comments",
				{
					postId: postId,
					level: level,
					message: message,
					group_id: groupId,
					commentParentId: commentParentId,
				},
				{ headers: headers }
			);

			setMessage("");
		} catch (error) {}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && event.target.name === "content") {
			event.preventDefault(); // Prevent default behavior of the Enter key (submitting form)
			handleClick(event); // Call handleClick when Enter key is pressed within the textarea
		}
	};
	return (
		<div className="comment-reply-form" id="comment-reply-form-71878">
			<form
				className={styles["md-comment-input"]}
				data-reload-html="#obj-comments-2028"
				data-target="#md-comments-box"
				data-submitting="false"
			>
				<input
					type="hidden"
					name="csrfmiddlewaretoken"
					value="HSCDdIZaEZ7cNFHvflMcFqKtdS7qCAPr5EfQu7CObC4pRHCxsLHqzuL5IntTbjFn"
				/>
				<input type="hidden" name="reply_to" value="71878" />
				<div className={styles["input-group"]}>
					<textarea
						name="content"
						rows={1}
						className="form-control custom-control jqcomment-textarea"
						placeholder="Chia sẻ cảm nghĩ của bạn ..."
						value={message}
						onChange={handleMessageChange}
						onKeyDown={handleKeyDown}
					></textarea>
					<div className={styles["input-group-append"]}>
						<button
							type="submit"
							className={styles["btn-primary"]}
							onClick={handleClick}
						>
							Gửi
						</button>
					</div>
				</div>
			</form>
		</div>
	);
});

export default ReplyForm;
