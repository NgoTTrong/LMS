import React, { useState } from "react";
import styles from "@/app/styles/CreatePost.module.css";
import axios from "axios";

type Props = { groupId: number };
const CreatePost = ({ groupId }: Props) => {
    const [postContent, setPostContent] = useState("");
    const userId = process.env.NEXT_PUBLIC_USER_ID;
    const handleCreatePost = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/post",
                { content: postContent },
                {
                    headers: {
                        "x-user-id": userId,
                        "x-post-id": groupId,
                    },
                }
            );
        } catch (error) {
            console.error("Error creating post:", error);
        }

        setPostContent("");
    };

    return (
        <div className={styles["studygroup-new-post"]}>
            <div className={styles["studygroup-new-post-user"]}>
                <div className="studygroup-user-avatar-wrapper">
                    <span className={styles["studygroup-user-avatar"]}>A</span>
                </div>
                <div className="studygroup-user-details">
                    <div>
                        <strong>ankkubmt6</strong>
                    </div>
                    <div></div>
                </div>
            </div>
            <form onSubmit={handleCreatePost}>
                <input
                    className={styles["input-text"]}
                    type="text"
                    placeholder="Viết 1 post mới ..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <div className={styles["submit-text-container"]}>
                    <input
                        className={styles["submit-text"]}
                        type="submit"
                        value="Gửi"
                        style={{
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            border: "1px solid",
                            borderRadius: "5px",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            backgroundColor: "rgb(53, 80, 154)",
                            color: "#fff",
                            fontWeight: "500",
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
