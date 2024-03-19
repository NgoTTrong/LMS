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
            <section className="w-full gap-2 flex items-end justify-between">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-medium ">{`Flashcard:  ${_flashcard?.title}`}</h1>
                    <div
                        className="text-base text-slate-600"
                        dangerouslySetInnerHTML={{
                            __html: _flashcard?.description ?? "",
                        }}
                    ></div>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
            </section>
            <CarouselWord words={_flashcard?.words as IWord[]} />
        </div>
    );
};

export default FlashCardDetail;
