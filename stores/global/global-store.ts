import { create } from "zustand";

type State = {
    openDictionary: boolean;
    openChatBot: boolean;
};

type Action = {
    setOpenDictionary: (_open: boolean) => void;
    setOpenChatbot: (_open: boolean) => void;
};

const globalStore = create<State & Action>((set) => ({
    openDictionary: false,
    openChatBot: false,
    setOpenDictionary: (_open) =>
        set(() => {
            return {
                openChatBot: _open ? false : undefined,
                openDictionary: _open,
            };
        }),
    setOpenChatbot: (_open) =>
        set(() => {
            return {
                openChatBot: _open,
                openDictionary: _open ? false : undefined,
            };
        }),
}));
export default globalStore;
