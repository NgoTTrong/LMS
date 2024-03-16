export interface IFlashcard {
    id?: string;
    title: string;
    description?: string;
    words: IWord[];
    creator?: {
        name: string;
        avatar: string;
    }

}


export interface IWord {
    id?: string;
    term: string;
    define: string;
    flashCardId?: string;
}