"use client";

import { Plus } from "lucide-react";
import FlashCard from "./flashcard";
import ModalCreateFlashcard from "./modal-create-flashcard";

const ListFlashCard = () => {
    return (
        <ul className="p-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <ModalCreateFlashcard>
                <li className=" h-[250px] group flex flex-col rounded-xl shadow-lg border-[1px] border-gray-200 justify-center items-center cursor-pointer hover:-translate-y-2">
                    <div className="flex flex-col text-[#233361] items-center">
                        <Plus size={50} className="" />
                        <span className="mt-1 text-lg lg:text-2xl ">
                            Create word list
                        </span>
                    </div>
                </li>
            </ModalCreateFlashcard>

            <FlashCard title="1" description="1" />
            <FlashCard title="1" description="1" />
            <FlashCard title="1" description="1" />
            <FlashCard title="1" description="1" />
            <FlashCard title="1" description="1" />
        </ul>
    );
};

export default ListFlashCard;
