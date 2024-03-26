import { IPost } from "@/interfaces/group/group-interface";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch } from "react";

type Props = {
    post: IPost;
    setChoosenPost: Dispatch<IPost>;
    setOpenModalPost: Dispatch<boolean>;
};
const PostCard = ({ post, setChoosenPost, setOpenModalPost }: Props) => {
    return (
        <section
            onClick={() => {
                setChoosenPost(post);
                setOpenModalPost(true);
            }}
            className="border border-solid border-slate-200/50 rounded-lg p-6 shadow-sm flex flex-col gap-4 hover:cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <h1 className="text-base font-medium">{post?.name}</h1>
                <div className="flex items-start gap-4">
                    <Image
                        src={post?.creator?.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <h1 className="text-sm font-medium">
                        {post?.creator?.name}
                    </h1>
                </div>
            </div>
            <p className="text-sm">{post?.content}</p>
            <div className="flex items-center gap-2">
                <MessageCircleMore className="w-6 h-6" />
                <span className="text-sm">
                    {post?.GroupPostComment?.length}
                </span>
            </div>
        </section>
    );
};

export default PostCard;
