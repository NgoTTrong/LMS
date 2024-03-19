import { Button } from "@/components/ui/button";
import ModalEditFlashcard from "./_components/modal-edit-flashcard";
import ModalAddFlashcard from "./_components/modal-add-flashcard";
import CarouselWord from "./_components/carousel-word";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import FlashcardService from "@/services/flash-card/flashcard-service";
import { IWord } from "@/interfaces/flashcard/flashcard-interface";

type Props = {
    params: {
        flashcardId: string;
    };
};

const FlashCardDetail = async ({ params }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const _flashcard = await FlashcardService.getOneFlashcard(
        params?.flashcardId
    );

    return (
        <div className="w-full p-6">
            <section className="grid lg:gird-cols-4 xl:grid-cols-10  w-full gap-2">
                <h1 className=" lg:col-span-1  text-4xl font-semibold ">
                    {`Flashcard: `}
                </h1>
                <h1 className="lg:ml-7 lg:col-span-2  text-4xl font-semibold block">
                    {_flashcard?.title}
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
            <CarouselWord words={_flashcard?.words as IWord[]} />
        </div>
    );
};

export default FlashCardDetail;
