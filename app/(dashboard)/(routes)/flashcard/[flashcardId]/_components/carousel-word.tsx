"use client";

import Slider from "react-slick";
import CarouselWordItem from "./carousel-word-item";

const CarouselWord = () => {
    var settings = {
        dots: true,
        arrows: true,
        speed: 800,
        infinite: true,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="w-full mt-10">
            <Slider {...settings} className=" rounded-xl custom-shadow">
                <CarouselWordItem content="1" />
                <CarouselWordItem content="2" />
                <CarouselWordItem content="3" />
                <CarouselWordItem content="4" />
                <CarouselWordItem content="5" />
            </Slider>
        </div>
    );
};

export default CarouselWord;
