"use client";

import LoadingModal from "@/components/loading/loading-modal";
import { Button } from "@/components/ui/button";
import {
    IGroup,
    IGroupDetail,
    IPost,
} from "@/interfaces/group/group-interface";
import GroupService from "@/services/group/group-service";
import { Check, Crown, SendHorizontal, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalCreateTopic } from "./_component/modal-create-topic";
import PostCard from "./_component/post-card";
import { Modal } from "antd";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ModalDetailTopic from "./_component/modal-detail-topic";
import { toast } from "react-hot-toast";
import img from "next/image";

type Props = {
    params: {
        groupId: string;
    };
};
const GroupPage = ({ params }: Props) => {
    const { groupId } = params;
    const [group, setGroup] = useState<IGroupDetail>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openModalPost, setOpenModalPost] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [choosenPost, setChoosenPost] = useState<IPost>();
    const router = useRouter();
    const fetchGroupDetail = async () => {
        try {
            setIsLoading(true);
            if (groupId) {
                const _group = await GroupService.getById(groupId);
                if (!_group) {
                    router.back();
                } else {
                    setGroup(_group);
                    setPosts(_group?.GroupPost);
                }
            } else {
                router.back();
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchGroupDetail();
    }, [groupId]);
    const handleBrowse = async (groupMemberId: string, status?: "JOINED") => {
        const _res = await GroupService.browse(groupMemberId, status);
        if (_res) {
            if (status) {
                toast.success("Accepted member");
            } else {
                toast.success("Rejected member");
            }
            fetchGroupDetail();
        } else {
            toast.error("Something went wrong");
        }
    };
    return (
        <main className="p-6">
            {group && (
                <div className="w-full flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">{group?.title}</h1>
                    <div className="flex items-center gap-2">
                        <Users className="text-sky-600 w-6 h-6" />
                        <span>{group?.GroupMember?.length}</span>
                    </div>
                    <div className="w-full grid grid-cols-4">
                        <section className="col-span-3 flex flex-col gap-4 p-6">
                            <div className="flex items-start justify-between w-full">
                                <h1 className="text-xl font-medium">Topics</h1>
                                <ModalCreateTopic
                                    groupId={groupId}
                                    setPosts={setPosts}
                                >
                                    <Button>Create topic</Button>
                                </ModalCreateTopic>
                            </div>
                            <div className="flex flex-col gap-4 flex-1 overflow-auto">
                                {posts?.length != 0 ? (
                                    posts?.map((post, idx) => (
                                        <PostCard
                                            post={post}
                                            key={"post-" + idx}
                                            setOpenModalPost={setOpenModalPost}
                                            setChoosenPost={setChoosenPost}
                                        />
                                    ))
                                ) : (
                                    <h1 className="text-base text-slate-600 italic">
                                        No posts found
                                    </h1>
                                )}
                            </div>
                        </section>
                        <div className="w-full flex flex-col gap-4 shadow-lg h-fit p-4 rounded-lg">
                            <h1>Members</h1>
                            <div className="flex flex-col gap-2">
                                {group?.GroupMember?.map((member, idx) => (
                                    <div
                                        key={"member-" + idx}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={member?.member?.avatar}
                                            alt="avatar"
                                            className="w-[32px] h-[32px] rounded-full object-cover"
                                        />
                                        <span className="text-sm">
                                            {member?.member?.name}
                                        </span>
                                        {member?.isOwner && (
                                            <Crown className="text-yellow-500 w-6 h-6" />
                                        )}
                                        {member?.status == "WAITING" && (
                                            <div className="flex items-center gap-4 ml-auto">
                                                <X
                                                    onClick={async () =>
                                                        handleBrowse(member?.id)
                                                    }
                                                    className="w-6 h-6 text-red-600"
                                                />
                                                <Check
                                                    onClick={async () =>
                                                        handleBrowse(
                                                            member?.id,
                                                            "JOINED"
                                                        )
                                                    }
                                                    className="w-6 h-6 text-green-400"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {choosenPost && (
                <ModalDetailTopic
                    choosenPost={choosenPost}
                    openModalPost={openModalPost}
                    setOpenModalPost={setOpenModalPost}
                    fetchGroupDetail={fetchGroupDetail}
                />
            )}
            {isLoading && <LoadingModal />}
        </main>
    );
};

export default GroupPage;
