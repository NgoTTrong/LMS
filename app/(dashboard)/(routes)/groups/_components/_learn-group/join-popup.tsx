"use client";
import React, { useState } from "react";
import styles from "@/app/styles/JoinGroup.module.css";
import axios from "axios";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClientAuth } from "@/hooks/use-client-auth";
type Props = {
	handleClose: Function;
	groupId: number;
	groupName: string;
};
const JoinPopup = ({ handleClose, groupId, groupName }: Props) => {
	const [password, setPassword] = useState("");

	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
	};
	const { userId } = useClientAuth();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.patch(
				`http://localhost:8080/group/${groupId}/join`,
				{
					member_id: userId,
				},
				{
					headers: {
						"X-GROUP-PASSWORD": password,
					},
				}
			);
		} catch (error) {}
		setPassword("");
		handleClose();
	};

	return (
		<div className={styles["container"]}>
			<div className="flex flex-col gap-4">
				<div className={"flex items-center w-full justify-between"}>
					<h1 className="text-[18px] font-medium">
						Tham gia nhóm: {groupName}
					</h1>
					<p
						className={styles["close"]}
						onClick={() => handleClose()}
					>
						<X />
					</p>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="password" className="flex flex-col gap-1">
					Nhập mật khẩu:
					<input
						className={styles["input-text"]}
						type="text"
						id="password"
						placeholder="Vui lòng nhập mật khẩu..."
						onChange={handlePasswordChange}
					/>
				</label>
				<Button type="submit" className="mt-4">
					Gửi
				</Button>
			</form>
		</div>
	);
};

export default JoinPopup;
