import { BookText } from "lucide-react";
import ListFlashCard from "./_components/list-flashcard";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import FlashcardService from "@/services/flash-card/flashcard-service";

const FlashCard = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const flashcards = await FlashcardService.getAllFlashcard(user?.id);
    return (
        <div className="w-full p-6 flex flex-col gap-6">
            <header className="flex items-center gap-4 text-2xl">
                <BookText size={32} />
                <h1 className="font-semibold">Flashcards</h1>
            </header>

            <h1 className="text-xl font-medium">List of created words</h1>

            <ListFlashCard flashcards={flashcards ?? []} userId={user.id} />
        </div>
    );
};

export default FlashCard;
