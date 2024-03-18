import React, { useState } from "react";
import modalService from "./ModalService";
import styles from "@/app/styles/ModalForm.module.css";
import { z } from "zod";

const GroupSchema = z.object({
	groupName: z.string().nonempty("Tên nhóm là bắt buộc"),
	avatarUrl: z.string().url({ message: "Url là bắt buộc" }),
	description: z.string().nonempty("Mô tả là bắt buộc"),
});

const ModalForm = () => {
	const userId = process.env.NEXT_PUBLIC_USER_ID;

	const [modalVisible, setModalVisible] = useState(true);

	const [groupName, setGroupName] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessages, setErrorMessages] = useState({
		groupName: "",
		avatarUrl: "",
		description: "",
	});

	const handleGroupNameChange = (event) => {
		setGroupName(event.target.value);
	};

	const handleAvatarUrlChange = (event) => {
		setAvatarUrl(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const hideModal = () => {
		modalService.isOpen$.subscribe((isOpen) => {
			setModalVisible(isOpen);
		});

		modalService.closeModal();
	};

	const handleSubmit = () => {
		try {
			// Validate input before submitting
			GroupSchema.parse({
				groupName,
				avatarUrl,
				description,
			});

			const data = {
				image: avatarUrl,
				title: groupName,
				description: description,
				password: password,
			};

			fetch("http://localhost:8080/group", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-User-ID": userId,
				},
				body: JSON.stringify(data),
			})
				.then((response) => response.json())
				.then((data) => {
					hideModal();
				})
				.catch((error) => {
					// Handle errors
				});
		} catch (error) {
			const newErrorMessages = {
				groupName:
					error.errors.find((err) => err.path[0] === "groupName")
						?.message || "",
				avatarUrl:
					error.errors.find((err) => err.path[0] === "avatarUrl")
						?.message || "",
				description:
					error.errors.find((err) => err.path[0] === "description")
						?.message || "",
			};
			setErrorMessages(newErrorMessages);
		}
	};
	return (
		<>
			<div className={styles[modalVisible ? "overlay" : "hidden"]}></div>
			<div className={styles[modalVisible ? "modal" : "hidden"]}>
				<div className={styles["modal-form-container"]}>
					{modalVisible && (
						<div className={styles["modal-form-content"]}>
							<div className={styles["modal-form-header"]}>
								<h5
									className="modal-form-title"
									id="varyingExampleModalLabel"
								>
									Tạo nhóm
								</h5>
								<button
									type="button"
									className="btn-close"
									data-mdb-ripple-init=""
									data-mdb-dismiss="modal-form"
									aria-label="Close"
									onClick={hideModal}
								>
									<img src="/image/reject.svg" alt="" />
								</button>
							</div>
							<div className="modal-form-body">
								<form action="#">
									<div className={styles["form-row"]}>
										<div className={styles["input-data"]}>
											<label htmlFor="">Tên nhóm</label>

											<input
												type="text"
												value={groupName}
												onChange={handleGroupNameChange}
												required
											/>
											{errorMessages.groupName && (
												<span
													className={
														styles["error-message"]
													}
												>
													{errorMessages.groupName}
												</span>
											)}
										</div>
									</div>
									<div className={styles["form-row"]}>
										<div className={styles["input-data"]}>
											<label htmlFor="">
												Ảnh đại diện
											</label>
											<input
												type="text"
												value={avatarUrl}
												onChange={handleAvatarUrlChange}
												required
											/>
											{errorMessages.avatarUrl && (
												<span
													className={
														styles["error-message"]
													}
												>
													{errorMessages.avatarUrl}
												</span>
											)}
										</div>
									</div>
									<div className={styles["form-row"]}>
										<div className={styles["input-data"]}>
											<label htmlFor="">Mã bí mật</label>
											<input
												type="text"
												value={password}
												onChange={handlePasswordChange}
											/>
										</div>
									</div>
									<div className={styles["form-row"]}>
										<div className={styles["input-data"]}>
											<label htmlFor="">Mô tả</label>

											<input
												type="text"
												value={description}
												onChange={
													handleDescriptionChange
												}
												required
											/>
											{errorMessages.description && (
												<span
													className={
														styles["error-message"]
													}
												>
													{errorMessages.description}
												</span>
											)}
										</div>
									</div>
								</form>
							</div>
							<div className={styles["modal-form-footer"]}>
								<button
									type="button"
									className={styles["btn-secondary"]}
									onClick={hideModal}
								>
									Close
								</button>
								<button
									type="button"
									className={styles["btn-primary"]}
									onClick={handleSubmit}
								>
									Send message
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ModalForm;
