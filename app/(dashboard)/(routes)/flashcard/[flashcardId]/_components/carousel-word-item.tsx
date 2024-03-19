import { IWord } from "@/interfaces/flashcard/flashcard-interface";
import { useState } from "react";

type Props = {
    word: IWord;
};

const CarouselWordItem = ({ word }: Props) => {
    const [flipped, setFlipped] = useState(true);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div
            // data-aos={flipped ? "zoom-in" : "flip-up"}
            className={`h-[500px] rounded-xl flex justify-center items-center cursor-pointer shadow-2xl transition-all duration-400 ${
                flipped ? "bg-sky-400" : "bg-emerald-300"
            }`}
            onClick={handleClick}
        >
            {flipped ? (
                <div className="text-3xl">{word?.term}</div>
            ) : (
                <div className="text-3xl">{word?.define}</div>
            )}
        </div>
    );
};

export default CarouselWordItem;
