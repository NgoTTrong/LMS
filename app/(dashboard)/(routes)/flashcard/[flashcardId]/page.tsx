import { Button } from "@/components/ui/button";
import ModalEditFlashcard from "./_components/modal-edit-flashcard";
import ModalAddFlashcard from "./_components/modal-add-flashcard";
import CarouselWord from "./_components/carousel-word";

const FlashCardDetail = () => {
    return (
        <div className="w-full p-6">
            <section className="grid lg:gird-cols-4 xl:grid-cols-10  w-full gap-2">
                <h1 className=" lg:col-span-1  text-4xl font-semibold ">
                    {`Flashcard: `}
                </h1>
                <h1 className="lg:ml-7 lg:col-span-2  text-4xl font-semibold block">
                    title
                </h1>
                <ModalEditFlashcard>
                    <Button className="lg:col-span-1  bg-[#2A3F7B]">
                        Edit
                    </Button>
                </ModalEditFlashcard>

                <ModalAddFlashcard>
                    <Button className="lg:col-span-1  bg-[#2A3F7B]">
                        Add new word
                    </Button>
                </ModalAddFlashcard>
            </section>
            <CarouselWord />
        </div>
    );
};

export default FlashCardDetail;
