"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Part4Service from "@/services/part-4/part-4-service";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});
const Part4CreatePage = () => {
    const router = useRouter();
    const { userId } = useAuth();
    if (!userId) {
        redirect("/");
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const _part4 = await Part4Service.createPart4(values.title, userId);
        if (_part4) {
            router.push(`/teacher/part-4/${_part4?.id}`);
            toast.success("Part 4 Created");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <main className="p-6">
            <div>
                <h1 className="text-2xl">Name your part 4 </h1>
                <p>
                    What would you like to name your part 4? Don&apos;t worry,
                    you can change this later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. ETS Part 4 2024"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you learn from this part?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button variant={"ghost"} type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
};

export default Part4CreatePage;
