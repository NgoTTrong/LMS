"use client";

import { Button } from "@/components/ui/button";
import UserProgressService from "@/services/user-progress/user-progress-serivce";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle, XCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    courseId: string;
    nextChapterId?: string;
    chapterId: string;
    isCompleted?: boolean;
};
const CourseProgressButton = ({
    courseId,
    nextChapterId,
    chapterId,
    isCompleted,
}: Props) => {
    const Icon = isCompleted ? XCircle : CheckCircle;
    const router = useRouter();
    const { userId } = useAuth();
    if (!userId) {
        redirect("/");
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const _progress = await UserProgressService.update(userId, {
                isCompleted: isCompleted ? false : true,
                chapterId,
            });
            if (_progress) {
                toast.success("Completed chapter");

                if (nextChapterId) {
                    router.push(
                        `/courses/${courseId}/chapters/${nextChapterId}`
                    );
                }
                router.refresh();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="w-4 h-4 ml-2" />
        </Button>
    );
};

export default CourseProgressButton;
