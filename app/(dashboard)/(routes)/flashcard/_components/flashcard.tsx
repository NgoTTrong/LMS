"use client";

import { IFlashcard } from "@/interfaces/flashcard/flashcard-interface";
import { Files } from "lucide-react";
import Link from "next/link";

type Props = {
    flashcard: IFlashcard;
};

const FlashCard = ({ flashcard }: Props) => {
    return (
        <Link
            href={`/flashcard/${flashcard?.id}`}
            className="h-[250px] group flex flex-col rounded-xl shadow-lg border-[1px] border-gray-200  cursor-pointer hover:-translate-y-2 p-4 relative duration-200"
        >
            <div className="flex flex-col items-start">
                <h1 className=" font-semibold text-lg">{flashcard?.title}</h1>
                <div className="flex my-3">
                    <Files />
                    <span className="ml-2">{`${flashcard?.words.length} từ`}</span>
                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: flashcard?.description as string,
                    }}
                ></div>
            </div>
            <div className=" absolute bottom-4 left-4 flex items-center">
                <img
                    src={flashcard?.creator?.avatar}
                    className=" w-7 h-7 rounded-full"
                />
                <span className="ml-2 font-semibold text-sm">
                    {flashcard?.creator?.name}
                </span>
            </div>
        </Link>
    );
};

export default FlashCard;
