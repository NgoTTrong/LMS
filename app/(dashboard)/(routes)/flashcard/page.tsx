import { BookText } from "lucide-react";
import ListFlashCard from "./_components/list-flashcard";

const FlashCard = () => {
    return (
        <div className="w-full bg-[#F6F7FB]">
            <header className="bg-gradient-to-r from-blue-500 to-green-500 w-ful h-[100px] p-6 flex text-4xl shadow-xl">
                <BookText size={35} />
                <h1 className=" ml-2 font-semibold">Flashcards</h1>
            </header>

            <h1 className="text-3xl mt-10 p-6 font-semibold">
                List of created words
            </h1>

            <ListFlashCard />
        </div>
    );
};

export default FlashCard;
