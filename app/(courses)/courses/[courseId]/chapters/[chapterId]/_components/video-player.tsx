"use client";
import UserProgressService from "@/services/user-progress/user-progress-serivce";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { LegacyRef, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	chapterId: string;
	videoUrl: string;
	title: string;
	courseId: string;
	nextChapterId?: string;
	isLocked: boolean;
	completeOnEnd: boolean;
};
const VideoPlayer = ({
	chapterId,
	videoUrl,
	title,
	courseId,
	nextChapterId,
	isLocked,
	completeOnEnd,
}: Props) => {
	const videoRef: LegacyRef<HTMLVideoElement> = useRef(null);
	const router = useRouter();
	const onEnd = async () => {
		try {
			if (completeOnEnd) {
				await UserProgressService.update({
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
			{!isLocked && (
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
						className="object-cover w-full h-full"
					/>
				</div>
			)}
			{isLocked && (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
					<Lock className="w-8 h-8" />
					<p className="text-sm">This chapter is locked</p>
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;
