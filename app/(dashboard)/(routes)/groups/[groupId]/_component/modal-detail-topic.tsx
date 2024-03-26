"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/hooks/use-client-auth";
import { IComment, IPost } from "@/interfaces/group/group-interface";
import GroupService from "@/services/group/group-service";
import { useAuth } from "@clerk/nextjs";
import { Modal } from "antd";
import {
    Loader2,
    MessageCircleReply,
    Reply,
    SendHorizontal,
    ShieldAlert,
} from "lucide-react";
import { Dispatch, LegacyRef, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import CommentCard from "./comment-card";
import ToxicService from "@/services/toxic/toxic-service";
import Image from "next/image";
type Props = {
    openModalPost: boolean;
    setOpenModalPost: Dispatch<boolean>;
    choosenPost: IPost;
    fetchGroupDetail: Function;
};
const ModalDetailTopic = ({
    choosenPost,
    openModalPost,
    setOpenModalPost,
    fetchGroupDetail,
}: Props) => {
    const [comments, setCommemts] = useState<IComment[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isToxic, setIsToxic] = useState<boolean>(false);
    const [replyComment, setReplyComment] = useState<IComment | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const user = useClientAuth();
    useEffect(() => {
        if (choosenPost) setCommemts(choosenPost?.GroupPostComment);
    }, [choosenPost]);
    const handleComment = async () => {
        setIsLoading(true);
        if (!message) {
            toast.error("Message is required");
            return;
        }
        const res = await ToxicService.detect(message);
        if (res == "toxic") {
            setIsToxic(true);
            return;
        }
        // if (replyComment) {
        //     await GroupService.replyComment(
        //         user?.userId,
        //         choosenPost?.id,
        //         replyComment?.id,
        //         message
        //     );
        // } else {
        //     await GroupService.createComment(
        //         user?.userId,
        //         choosenPost?.id,
        //         message
        //     );
        // }

        setMessage("");

        await fetchGroupDetail();
        const _comments = await GroupService.getAllComment(choosenPost?.id);
        setCommemts(_comments);
        setIsLoading(false);
    };

    return (
        <Modal open={openModalPost} onCancel={() => setOpenModalPost(false)}>
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <Image
                        src={choosenPost?.creator?.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <h1 className="text-sm font-medium">
                        {choosenPost?.creator?.name}
                    </h1>
                </div>

                <h1 className="text-base font-medium">{choosenPost?.name}</h1>
                <p className="text-sm">{choosenPost?.content}</p>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-sm font-medium">Comments</h1>
                    <div className="max-h-[300px] flex flex-col gap-4 p-4 shadow-sm rounded-lg overflow-auto">
                        {comments?.length == 0 ? (
                            <h1 className="text-slate-600 italic">
                                No comments
                            </h1>
                        ) : (
                            comments
                                ?.filter((comment) => !comment?.parentId)
                                ?.map((comment, idx) => (
                                    <CommentCard
                                        comment={comment}
                                        key={"comment-" + idx}
                                        setReply={setReplyComment}
                                    />
                                ))
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Label htmlFor="comment">Add comment</Label>
                        <div className="flex-1 flex flex-col gap-2">
                            {replyComment && (
                                <div className="flex items-center gap-2">
                                    <Reply className="w-4 h-4" />
                                    Reply to {replyComment?.member?.name}
                                </div>
                            )}
                            <Input
                                placeholder="Tell something"
                                name="message"
                                required
                                id="comment"
                                value={message ?? undefined}
                                onChange={(e) => {
                                    setIsToxic(false);
                                    setMessage(e?.target?.value);
                                }}
                            />
                            {isToxic && (
                                <span className="text-sm text-red-500 flex items-center gap-2">
                                    <ShieldAlert className="w-6 h-6" />
                                    The message is toxic, please edit it
                                </span>
                            )}
                        </div>

                        <Button
                            type="button"
                            onClick={handleComment}
                            disabled={!message || isLoading}
                        >
                            {isLoading ? (
                                <div className="px-1">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : (
                                "Send"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDetailTopic;
