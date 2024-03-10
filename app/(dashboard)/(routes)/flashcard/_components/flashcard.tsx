"use client";

import { Files } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
};

const FlashCard = ({ title, description }: Props) => {
    return (
        <Link
            href={`/flashcard/1`}
            className="h-[250px] group flex flex-col rounded-xl shadow-lg border-[1px] border-gray-200  cursor-pointer hover:-translate-y-2 p-4 relative duration-200"
        >
            <div className="flex flex-col items-start">
                <h1 className=" font-semibold text-lg">ETS 2024</h1>
                <div className="flex my-3">
                    <Files />
                    <span className="ml-2">0 từ</span>
                </div>

                <p>Mô tả</p>
            </div>
            <div className=" absolute bottom-4 left-4 flex items-center">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMFC3U38jR45Fkualvk5jLmpyDt7AmijHDOA&usqp=CAU"
                    className=" w-7 h-7 rounded-full"
                />
                <span className="ml-2 font-semibold text-sm">FLASH CARD</span>
            </div>
        </Link>
    );
};

export default FlashCard;
