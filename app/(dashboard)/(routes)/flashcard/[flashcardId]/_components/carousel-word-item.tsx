import { useState } from "react";

type Props = {
    content: string;
};

const CarouselWordItem = ({ content }: Props) => {
    const [flipped, setFlipped] = useState(true);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div
            data-aos={flipped ? "zoom-in" : "flip-up"}
            className="h-[500px] rounded-xl flex justify-center items-center cursor-pointer "
            onClick={handleClick}
        >
            {flipped ? (
                <div className="text-2xl">Mat trc{content}</div>
            ) : (
                <div className="text-2xl">Mat sau{content}</div>
            )}
        </div>
    );
};

export default CarouselWordItem;
