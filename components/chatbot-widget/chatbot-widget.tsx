"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
	BotIcon,
	MessageCircleX,
	SendHorizonal,
	MessageCircleMore,
	Loader2,
} from "lucide-react";
import ChatbotService from "@/services/chat-bot/chat-bot-service";
import toast from "react-hot-toast";
import globalStore from "@/stores/global/global-store";

const ChatbotWidget: React.FC = () => {
	const { openChatBot, setOpenChatbot } = globalStore();
	const [items, setItems] = useState<string[]>([
		"Xin chào bạn đến với Toeic Mastery, tôi rất hân hạnh được giúp đỡ bạn 😍",
	]);
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	function adjustTextareaStyletoDefault(textarea: HTMLTextAreaElement) {
		textarea.style.height = "2rem";
		textarea.style.overflowY = "hidden";
	}

	const adjustTextareaHeight = (
		textarea: HTMLTextAreaElement,
		baseFontSizePixels: number,
		maxHeight: number
	) => {
		textarea.style.height = "auto";
		textarea.style.overflowY = "scroll";
		textarea.style.height = `${Math.min(
			textarea.scrollHeight / baseFontSizePixels,
			maxHeight
		)}rem`;
	};

	const handleSendMessage = async () => {
		if (!message) {
			toast.error("Message is not empty");
			return;
		}
		try {
			setIsLoading(true);
			setItems([...items, message]);
			setMessage("");
			const response = await ChatbotService.sendMessage(message);
			setItems([
				...items,
				message,
				response ?? "Xin lỗi hệ thống của tôi đang bị lỗi.",
			]);
		} catch (error) {
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={
				"fixed bottom-6 right-6 flex flex-col gap-2 items-end bg-white rounded-full"
			}
		>
			<button onClick={() => setOpenChatbot(!openChatBot)}>
				{openChatBot ? (
					<MessageCircleX className="text-red-700" />
				) : (
					<div className="p-3 rounded-full bg-sky-200">
						<MessageCircleMore className="text-sky-700" />
					</div>
				)}
			</button>
			{openChatBot && (
				<div
					className={
						"p-4 rounded-lg shadow-lg flex flex-col gap-4 w-[500px] max-h-[500px] !overflow-auto"
					}
				>
					<header className={""}>
						<div className={"flex items-center gap-2"}>
							<BotIcon className="text-sky-500 w-8 h-8" />
							<h1 className="text-base font-medium text-sky-500">
								Toeic Mastery Bot
							</h1>
						</div>
					</header>
					<div
						className={
							"flex flex-col gap-2 w-full flex-1 overflow-auto"
						}
					>
						{items.map((item, idx) =>
							idx % 2 == 0 ? (
								<p
									key={"chat-" + idx}
									className="max-w-[70%] text-start mr-auto bg-slate-700 text-white text-sm py-1 px-2 rounded-lg"
								>
									{item}
								</p>
							) : (
								<p
									key={"chat-" + idx}
									className="max-w-[70%] text-end ml-auto bg-sky-500 text-white text-sm py-1 px-2 rounded-lg"
								>
									{item}
								</p>
							)
						)}
						{isLoading && (
							<p className="max-w-[70%] text-start mr-auto bg-slate-700 text-white text-sm py-1 px-2 rounded-lg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-ellipsis animate-bounce"
								>
									<circle cx="12" cy="12" r="1" />
									<circle cx="19" cy="12" r="1" />
									<circle cx="5" cy="12" r="1" />
								</svg>
							</p>
						)}
					</div>
					<div className={"flex items-center gap-4"}>
						<textarea
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
								if (e.target.value === "") {
									adjustTextareaStyletoDefault(e.target);
								} else {
									adjustTextareaHeight(e.target, 16, 15.625);
								}
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !isLoading) {
									e.preventDefault();
									handleSendMessage();
								}
							}}
							placeholder="Message Toeic Mastery..."
							className="text-sm border boder-slate-500 rounded-lg p-2 resize-none flex-1"
						></textarea>
						<button
							onClick={handleSendMessage}
							disabled={isLoading}
						>
							<SendHorizonal
								className={`w-6 h-6 text-slate-600 ${
									isLoading && "text-slate-300"
								}`}
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatbotWidget;
