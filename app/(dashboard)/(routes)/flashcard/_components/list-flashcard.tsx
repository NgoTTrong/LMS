"use client";

import { Plus } from "lucide-react";
import FlashCard from "./flashcard";
import ModalCreateFlashcard from "./modal-create-flashcard";
import { IFlashcard } from "@/interfaces/flashcard/flashcard-interface";

type Props = {
    flashcards: IFlashcard[];
    userId: string;
};

const ListFlashCard = ({ flashcards, userId }: Props) => {
    return (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <ModalCreateFlashcard userId={userId}>
                <li className=" h-[250px] group flex flex-col rounded-xl shadow-lg border-[1px] border-gray-200 justify-center items-center cursor-pointer transition-all transition-300 hover:-translate-y-2">
                    <div className="flex flex-col text-[#233361] items-center">
                        <Plus size={50} className="" />
                        <span className="mt-1 text-lg lg:text-2xl ">
                            Create word list
                        </span>
                    </div>
                </li>
            </ModalCreateFlashcard>
            {flashcards.map((flashcard: IFlashcard, id: number) => {
                return <FlashCard key={id} flashcard={flashcard} />;
            })}
        </ul>
    );
};

export default ListFlashCard;
