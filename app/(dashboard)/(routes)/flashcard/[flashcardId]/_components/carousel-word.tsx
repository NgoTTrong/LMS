"use client";

import CarouselWordItem from "./carousel-word-item";
import { IWord } from "@/interfaces/flashcard/flashcard-interface";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
        <Carousel className="w-full mt-4 p-6 relative">
            <CarouselContent>
                {words &&
                    words.map((word: IWord, id: number) => {
                        return (
                            <CarouselItem key={id}>
                                <CarouselWordItem word={word} />
                            </CarouselItem>
                        );
                    })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-12 " />
            <CarouselNext className="absolute right-12 " />
        </Carousel>
    );
};

export default CarouselWord;
