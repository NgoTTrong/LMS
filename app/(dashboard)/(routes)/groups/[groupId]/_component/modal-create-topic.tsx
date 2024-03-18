"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useClientAuth } from "@/hooks/use-client-auth";
import { IPost } from "@/interfaces/group/group-interface";
import GroupService from "@/services/group/group-service";
import { group } from "console";
import { Loader2, Pencil } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
    groupId: string;
    setPosts: Dispatch<IPost[]>;
};
export function ModalCreateTopic({ children, groupId, setPosts }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const user = useClientAuth();
    const [form, setForm] = useState<{
        name?: string;
        content?: string;
    }>({});
    const handleAddCreate = async () => {
        try {
            setIsLoading(true);
            if (!form?.name) {
                toast.error("Name is required");
                return;
            }
            if (!form?.content) {
                toast.error("Content is required");
                return;
            }
            const _post = await GroupService.createPost(groupId, user?.userId, {
                name: form?.name!,
                content: form?.content!,
            });
            if (_post) {
                const _posts = await GroupService.getAllPosts(groupId);
                setPosts(_posts);
                toast.success("Post created");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add an topic</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 w-full">
                    <div className="flex flex-col gap-4 justify-start items-start w-full">
                        <div className="flex flex-col gap-4 justify-start items-start w-full">
                            <Label htmlFor="content" className="text-right">
                                Topic name
                            </Label>
                            <Input
                                id="name"
                                placeholder="eg. Title of topic?"
                                className="w-full"
                                value={form?.name}
                                onChange={(event) => {
                                    setForm((state) => ({
                                        ...state,
                                        name: event?.target?.value ?? "",
                                    }));
                                }}
                            />
                        </div>
                        <hr />
                        <div className="flex flex-col gap-4 justify-start items-start w-full">
                            <Label htmlFor="content" className="text-right">
                                Content
                            </Label>
                            <Textarea
                                id="content"
                                placeholder="eg. Content?"
                                className="w-full"
                                value={form?.content}
                                onChange={(event) => {
                                    setForm((state) => ({
                                        ...state,
                                        content: event?.target?.value ?? "",
                                    }));
                                }}
                            />
                        </div>
                        <hr />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="button"
                        disabled={isLoading || !form?.name || !form?.content}
                        onClick={handleAddCreate}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Add"
                        )}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
