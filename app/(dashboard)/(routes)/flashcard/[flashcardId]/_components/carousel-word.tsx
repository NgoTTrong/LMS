"use client";

import Slider from "react-slick";
import CarouselWordItem from "./carousel-word-item";
import { IWord } from "@/interfaces/flashcard/flashcard-interface";

type Props = {
    words: IWord[];
};

const CarouselWord = ({ words }: Props) => {
    const initialState: IWord[] = [
        {
            term: "This is the front of the flashcard",
            define: "This is the behind of the flashcard",
        },
    ];

    var settings = {
        dots: true,
        arrows: true,
        speed: 800,
        infinite: true,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
        slidesToShow: 1,
    };

    return (
        <div className="w-full mt-10">
            <Slider {...settings} className=" rounded-xl custom-shadow">
                {words &&
                    words.map((word: IWord, id: number) => {
                        return <CarouselWordItem key={id} word={word} />;
                    })}
            </Slider>
        </div>
    );
};

export default CarouselWord;
