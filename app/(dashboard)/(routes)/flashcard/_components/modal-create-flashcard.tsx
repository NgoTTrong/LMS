"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
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
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
};

const ModalCreateFlashcard = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const [form, setForm] = useState<{
        title?: string;
        description?: string;
    }>({});

    const handleAddQuestion = async () => {
        try {
            setIsLoading(true);

            if (true) {
                toast.success("Created flashcard");
                setForm({});
                router.push("/flashcard/1");
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
            <DialogTrigger asChild>
                {/* <Button variant="outline">alo</Button> */}
                {children}
            </DialogTrigger>
            <DialogContent className="!max-w-[48rem] !max-h-[80vh] !overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Flashcard</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Create when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 justify-start items-start w-full">
                    <div className="w-full space-y-2">
                        <Label htmlFor="content" className="text-right ">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="eg. Flashcard title?"
                            className="w-full"
                            value={form?.title}
                            onChange={(event) => {
                                setForm((state) => ({
                                    ...state,
                                    content: event?.target?.value ?? "",
                                }));
                            }}
                        />
                    </div>

                    <div className="w-full  space-y-2">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Editor
                            onChange={(value) => {
                                setForm((state) => ({
                                    ...state,
                                    description: value,
                                }));
                            }}
                            value={form?.description ?? ""}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose
                        type="button"
                        // disabled={!form.title || isLoading}
                        onClick={handleAddQuestion}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalCreateFlashcard;
