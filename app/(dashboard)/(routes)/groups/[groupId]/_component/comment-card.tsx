import { IComment } from "@/interfaces/group/group-interface";
import GroupService from "@/services/group/group-service";
import { MessageCircleReply } from "lucide-react";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";

type Props = {
    comment: IComment;
    setReply: Dispatch<IComment | null>;
};
const CommentCard = ({ comment, setReply }: Props) => {
    const [viewReply, setViewReply] = useState<boolean>(false);
    const [replyComments, setReplyComments] = useState<IComment[]>([]);

    const fetchReplyComments = async () => {
        const _comments = await GroupService.getAllReplyComments(comment?.id);
        setReplyComments(_comments);
    };
    useEffect(() => {
        fetchReplyComments();
    }, [comment]);
    return (
        <div className="border-b border-solid border-slate-300/50 flex flex-col gap-2 pb-4">
            <div className="flex items-start gap-2">
                <Image
                    src={comment?.member?.avatar}
                    alt="avatar"
                    className="w-6 h-6 object-cover rounded-full"
                />
                <h1 className="text-sm font-medium">{comment?.member?.name}</h1>
            </div>
            <p className="text-base">{comment?.message}</p>
            <div className="w-full flex justify-end">
                <div
                    onClick={() => {
                        if (viewReply == true) {
                            setReply(null);
                            setViewReply(false);
                        } else {
                            setReply(comment);
                            setViewReply(true);
                        }
                    }}
                    className="flex items-center gap-2"
                >
                    <MessageCircleReply />
                    <span>{comment?.numOfReplys}</span>
                </div>
            </div>
            {viewReply && (
                <div className="flex flex-col gap-4 px-4 pt-2  border-t border-solid border-slate-300/50">
                    {replyComments?.length == 0 ? (
                        <h1 className="text-sm text-slate-600 italic">
                            No Replies
                        </h1>
                    ) : (
                        replyComments?.map((reply, idx) => (
                            <div
                                key={"reply-" + comment?.id + idx}
                                className="w-full flex flex-col gap-2"
                            >
                                <div className="flex items-start gap-2">
                                    <Image
                                        src={reply?.member?.avatar}
                                        alt="avatar"
                                        className="w-6 h-6 object-cover rounded-full"
                                    />
                                    <h1 className="text-sm font-medium">
                                        {reply?.member?.name}
                                    </h1>
                                </div>
                                <p className="text-base">{reply?.message}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
