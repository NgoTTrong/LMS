"use client";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
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
import GroupService from "@/services/group/group-service";
import Part1Service from "@/services/part-1/part-1-service";
import TopicService from "@/services/topic/topic-service";
import groupStore from "@/stores/group/group-store";
import { Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
};
export function ModalCreateGroup({ children }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setGroups } = groupStore();
    const user = useClientAuth();
    const [form, setForm] = useState<{
        imageUrl?: string;
        title?: string;
        description?: string;
        password?: string;
    }>({});
    const [onEditImage, setOnEditImage] = useState<boolean>(false);
    const handleAddCreate = async () => {
        try {
            setIsLoading(true);
            if (!form?.title) {
                toast.error("Title is required");
                return;
            }
            if (!form?.description) {
                toast.error("description is required");
                return;
            }
            if (!form?.imageUrl) {
                toast.error("Image is required");
                return;
            }
            const _group = await GroupService.createGroup(user?.userId, {
                title: form?.title!,
                description: form?.description!,
                image: form?.imageUrl!,
                password: form?.password,
            });
            if (_group) {
                const _groups = await GroupService.getAllGroups();
                setGroups(_groups);
                toast.success("Group created");
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
                    <DialogTitle>Group infomation</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Add when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-8 w-full">
                    <section className="grid grid-cols-2 gap-6 py-4 w-full">
                        <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex items-center justify-between w-full">
                                <h1>Image</h1>
                                {onEditImage ? (
                                    <span
                                        onClick={() => setOnEditImage(false)}
                                        className="text-sm hover:cursor-pointer"
                                    >
                                        Cancel
                                    </span>
                                ) : (
                                    <Pencil
                                        className="h-4 w-4"
                                        onClick={() => setOnEditImage(true)}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                {form?.imageUrl && !onEditImage ? (
                                    <Image
                                        src={form?.imageUrl}
                                        alt="thumb"
                                        className="w-full aspect-video rounded-lg object-cover"
                                    />
                                ) : (
                                    <FileUpload
                                        endpoint="courseImage"
                                        onChange={(url) => {
                                            if (url) {
                                                setForm((state) => ({
                                                    ...state,
                                                    imageUrl: url,
                                                }));
                                            }
                                        }}
                                    />
                                )}

                                <div className="text-xs text-muted-foreground mt-4">
                                    16:9 aspect ratio recommended
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 justify-start items-start w-full">
                            <div className="flex flex-col gap-4 justify-start items-start w-full">
                                <Label htmlFor="content" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="eg. How old are you?"
                                    className="w-full"
                                    value={form?.title}
                                    onChange={(event) => {
                                        setForm((state) => ({
                                            ...state,
                                            title: event?.target?.value ?? "",
                                        }));
                                    }}
                                />
                            </div>
                            <hr />
                            <div className="flex flex-col gap-4 justify-start items-start w-full">
                                <Label htmlFor="content" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="eg. Description?"
                                    className="w-full"
                                    value={form?.description}
                                    onChange={(event) => {
                                        setForm((state) => ({
                                            ...state,
                                            description:
                                                event?.target?.value ?? "",
                                        }));
                                    }}
                                />
                            </div>
                            <hr />
                            <div className="flex flex-col gap-4 justify-start items-start w-full">
                                <Label htmlFor="content" className="text-right">
                                    Password{" "}
                                    <span className="text-slate-500 text-sm">
                                        (not required)
                                    </span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="eg. password?"
                                    className="w-full"
                                    value={form?.password}
                                    onChange={(event) => {
                                        setForm((state) => ({
                                            ...state,
                                            password:
                                                event?.target?.value ?? "",
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="button"
                        disabled={
                            isLoading ||
                            !form?.imageUrl ||
                            !form?.title ||
                            !form?.description
                        }
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
