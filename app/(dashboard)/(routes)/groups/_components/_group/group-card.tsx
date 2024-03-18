"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClientAuth } from "@/hooks/use-client-auth";
import { IGroup } from "@/interfaces/group/group-interface";
import GroupService from "@/services/group/group-service";
import groupStore from "@/stores/group/group-store";
import { useAuth } from "@clerk/nextjs";
import { Modal } from "antd";
import { Users, KeyRound, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
    group: IGroup;
};
const GroupCard = ({ group }: Props) => {
    const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
    const [text, setText] = useState<any>("Join");
    const { setGroups } = groupStore();
    const user = useClientAuth();
    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const handleJoinPublicGroup = async (password?: string) => {
        const _groupMember = await GroupService.joinGroup(
            user?.userId,
            group?.id,
            password
        );
        if (_groupMember) {
            const _groups = await GroupService.getAllGroups();
            setGroups(_groups);
            toast.success("Your request is sent to Owner");
        } else {
            toast.error("Password wrong");
        }
    };
    useEffect(() => {
        if (group) {
            const idx = group?.GroupMember?.findIndex(
                (e) => e?.memberId == user?.userId
            );
            if (idx == -1 && group?.isPublic) {
                setText("Join");
            } else if (idx == -1) {
                setText(
                    <>
                        <Lock /> Join
                    </>
                );
            } else {
                if (group?.GroupMember?.[idx]?.status == "WAITING")
                    setText("Waiting");
                else {
                    ("Joined");
                }
            }
        }
    }, [group]);
    return (
        <section
            onClick={() => {
                const idx = group?.GroupMember?.findIndex(
                    (member) => member?.memberId == user?.userId
                );
                if (
                    idx != -1 &&
                    group?.GroupMember?.[idx]?.status == "JOINED"
                ) {
                    router.push(`/groups/${group?.id}`);
                } else if (
                    idx != -1 &&
                    group?.GroupMember?.[idx]?.status == "WAITING"
                ) {
                }
            }}
            className={`w-full flex flex-col border border-solid border-slate-300 rounded-lg ${
                group?.GroupMember?.some((e) => e?.memberId == user?.userId) &&
                "hover:cursor-pointer"
            }`}
        >
            <img
                src={group?.image}
                alt=""
                className="w-full aspect-video rounded-t-lg object-cover"
            />
            <div className="flex flex-col gap-2 p-4">
                <h1 className="text-base font-medium two-lines-truncate">
                    {group?.title}
                </h1>
                <p className="text-sm text-slate-500 three-lines-truncate">
                    {group?.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="text-sky-600 w-6 h-6" />
                        <span>{group?._count?.GroupMember}</span>
                    </div>

                    <Button
                        onClick={async () => {
                            if (!group?.isPublic) {
                                setIsOpenInput(true);
                            } else {
                                const idx = group?.GroupMember?.findIndex(
                                    (member) => member?.memberId == user?.userId
                                );
                                if (
                                    idx != -1 &&
                                    group?.GroupMember?.[idx]?.status !=
                                        "JOINED"
                                ) {
                                    toast.error(
                                        "Your request is browsing, please wait for a short time"
                                    );
                                } else if (
                                    idx != -1 &&
                                    group?.GroupMember?.[idx]?.status ==
                                        "JOINED"
                                ) {
                                } else {
                                    await handleJoinPublicGroup();
                                }
                            }
                        }}
                        className="flex items-center gap-2"
                        variant={
                            group?.GroupMember?.some(
                                (e) => e?.memberId == user?.userId
                            )
                                ? "outline"
                                : "default"
                        }
                    >
                        {text}
                    </Button>
                </div>
            </div>
            <Modal
                open={isOpenInput}
                onCancel={() => setIsOpenInput(false)}
                onOk={() => {
                    handleJoinPublicGroup(password);
                    setIsOpenInput(false);
                }}
                okButtonProps={{
                    disabled: !password,
                }}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-medium">Enter password</h1>
                    <Input
                        className=""
                        value={password ?? undefined}
                        onChange={(e) => setPassword(e?.target?.value)}
                        placeholder="Group's password"
                        type="password"
                    />
                </div>
            </Modal>
        </section>
    );
};

export default GroupCard;
