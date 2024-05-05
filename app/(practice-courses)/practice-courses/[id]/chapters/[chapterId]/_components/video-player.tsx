"use client";

import UserProgressService from "@/services/user-progress/user-progress-serivce";
import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { LegacyRef, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	chapterId: string;
	videoUrl: string;
	title: string;
	courseId: string;
	nextChapterId?: string;
	completeOnEnd: boolean;
};
const VideoPlayer = ({
	chapterId,
	videoUrl,
	title,
	courseId,
	nextChapterId,
	completeOnEnd,
}: Props) => {
	const videoRef: LegacyRef<HTMLVideoElement> = useRef(null);
	const { userId } = useAuth();
	if (!userId) {
		redirect("/");
	}
	const router = useRouter();
	const onEnd = async () => {
		try {
			if (completeOnEnd) {
				await UserProgressService.update(userId, {
					chapterId,
					isCompleted: true,
				});
				if (nextChapterId) {
					router.push(
						`/courses/${courseId}/chapters/${nextChapterId}`
					);
				}
				router.refresh();
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};
	return (
		<div className="relative aspect-video">
			<div className="absolute inset-0 flex items-center justify-center bg-slate-800">
				<video
					src={videoUrl}
					controls
					ref={videoRef}
					onLoadStart={() => {
						if (videoRef?.current) {
							videoRef.current.volume = 0.2;
						}
					}}
					onEnded={onEnd}
					preload="auto"
					className="object-contain w-full h-full"
				/>
			</div>
		</div>
	);
};

export default VideoPlayer;
