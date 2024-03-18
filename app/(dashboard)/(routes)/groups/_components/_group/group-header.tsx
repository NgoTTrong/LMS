import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/GroupHeader.module.css";
import Modal from "./modal-form";
import modalService from "./ModalService";
import axios from "axios";

export const GroupHeader = ({ updateGroups }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [showSearch, setShowSearch] = useState(true);
	const [inputValue, setInputValue] = useState("");

	const handleCreateGroupClick = () => {
		modalService.openModal();
		setModalVisible(modalService.isOpen);
	};
	const handleSearchGroup = () => {
		setShowSearch(!showSearch);
	};

	const handleChange = (event) => {
		const { value } = event.target;
		setInputValue(value);
	};

	const handleKeyPress = async (event) => {
		if (event.key === "Enter") {
			try {
				const searchTerm = inputValue; // Assuming inputValue contains the search term
				const response = await axios.get(
					`http://localhost:8080/group/search?key=${searchTerm}`
				);
				const newGroups = response.data.data;
				updateGroups(newGroups);
				setInputValue("");
			} catch (error) {}
		}
	};

	return (
		<div className={styles["content-header"]}>
			{modalVisible && <Modal />}
			<div className={styles["container"]}>
				<h1>
					Nhóm học tập
					<a
						className={styles["btn"]}
						onClick={handleCreateGroupClick}
					>
						<span className="fas fa-plus mr-2"></span>Tạo nhóm
					</a>
				</h1>
				<p className={styles["font-italic"]}>
					Tham gia vào các nhóm luyện thi TOEIC để cùng nhau ôn tập và
					tạo động lực đạt aim nhé các bạn!
				</p>

				<ul className={styles["nav"]}>
					<li className={styles["nav-item"]}>
						<button className={styles["nav-link-my-group"]}>
							Nhóm của tôi
						</button>
					</li>

					<li className="nav-item">
						<button
							className={styles["nav-link-search"]}
							onClick={handleSearchGroup}
						>
							Tìm kiếm
						</button>
					</li>
				</ul>
				{showSearch && (
					<div className={styles["search-form"]}>
						<input
							type="text"
							placeholder="Vui lòng nhập tên nhóm..."
							value={inputValue}
							onChange={handleChange}
							onKeyDown={handleKeyPress}
						/>
						<img src="/image/search.svg"></img>
					</div>
				)}
			</div>
		</div>
	);
};
