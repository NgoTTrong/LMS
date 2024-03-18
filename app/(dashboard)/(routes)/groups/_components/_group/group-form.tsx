import React, { useState } from "react";
import styles from "@/app/styles/GroupForm.module.css";

export const GroupForm = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<>
			{isVisible && (
				<div className={styles["container"]}>
					<div className={styles["text"]}>
						Tạo nhóm
						<button onClick={handleClose}>X</button>
					</div>
					<form action="#">
						<div className="form-row">
							<div className={styles["input-data"]}>
								<label htmlFor="">Ảnh đại diện</label>
								<input type="text" required />
								<div className="underline"></div>
							</div>
						</div>
					</form>
				</div>
			)}
		</>
	);
};
