"use client";

import { IFlashcard } from "@/interfaces/flashcard/flashcard-interface";
import { Files } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    flashcard: IFlashcard;
};

const FlashCard = ({ flashcard }: Props) => {
    return (
        <Link
            href={`/flashcard/${flashcard?.id}`}
            className="group flex flex-col rounded-xl shadow-lg border-[1px] border-gray-200  cursor-pointer hover:-translate-y-2 p-4 relative duration-200"
        >
            <div className="flex flex-col items-start">
                <h1 className=" font-semibold text-lg">{flashcard?.title}</h1>
                <div className="flex my-2 items-center">
                    <Files />
                    <span className="ml-2">{`${flashcard?.words.length} từ`}</span>
                </div>

                <div
                    className="text-base text-slate-600"
                    dangerouslySetInnerHTML={{
                        __html: flashcard?.description as string,
                    }}
                ></div>
            </div>
            <div className=" absolute bottom-4 left-4 flex items-center">
                <Image
                    src={flashcard?.creator?.avatar!}
                    alt="avatar"
                    className="w-7 h-7 rounded-full"
                />
                <span className="ml-2 font-medium text-sm">
                    {flashcard?.creator?.name}
                </span>
            </div>
        </Link>
    );
};

export default FlashCard;
