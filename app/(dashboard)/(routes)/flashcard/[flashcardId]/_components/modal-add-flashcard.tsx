"use client";

import { useParams } from "next/navigation";
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
import FlashcardService from "@/services/flash-card/flashcard-service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    children: React.ReactNode;
};

const ModalAddFlashcard = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();

    const [form, setForm] = useState<{
        term?: string;
        define?: string;
    }>({});

    const handleAddQuestion = async () => {
        try {
            setIsLoading(true);

            const _word = await FlashcardService.createWord(
                form?.term ?? "",
                form?.define ?? "",
                params?.flashcardId as string
            );

            if (_word) {
                toast.success("Created new word");
                setForm({});
                router.refresh();
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
                    <DialogTitle className="text-3xl">New word</DialogTitle>
                    <DialogDescription>
                        Enter all fields. Click Create when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 justify-start items-start w-full">
                    <div className="w-full space-y-2">
                        <Label htmlFor="term" className="text-right ">
                            Term
                        </Label>
                        <Input
                            id="term"
                            placeholder="eg. Term?"
                            className="w-full"
                            value={form?.term}
                            onChange={(event) => {
                                setForm((state) => ({
                                    ...state,
                                    term: event?.target?.value ?? "",
                                }));
                            }}
                        />
                    </div>

                    <div className="w-full  space-y-2">
                        <Label htmlFor="define" className="text-right">
                            Define
                        </Label>
                        <Input
                            id="define"
                            placeholder="eg. Define?"
                            className="w-full"
                            value={form?.define}
                            onChange={(event) => {
                                setForm((state) => ({
                                    ...state,
                                    define: event?.target?.value ?? "",
                                }));
                            }}
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

export default ModalAddFlashcard;
