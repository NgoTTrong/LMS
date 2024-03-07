import { BookText } from "lucide-react";

const FlashCard = () => {
    return (
        <div className="w-full ">
            <header className="bg-gradient-to-r from-blue-500 to-green-500 w-ful h-[100px] p-6 flex text-4xl">
                <BookText size={35} />
                <h1 className=" ml-2 font-semibold">Flashcards</h1>
            </header>
        </div>
    );
};

export default FlashCard;
