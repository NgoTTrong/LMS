import { IRank } from "@/interfaces/leaderboard/leaderboard-interface";
import { create } from "zustand";

type State = {
	message: string;
	openModal: boolean;
	rank: IRank | null;
};

type Action = {
	setOpenModal: (_open: boolean) => void;
	setMessage: (_message: string) => void;
	setRank: (_rank: IRank) => void;
};

const modalLevelUpStore = create<State & Action>((set) => ({
	openModal: false,
	message: "Congratulations",
	rank: null,
	setOpenModal: (_open) => set(() => ({ openModal: _open })),
	setMessage: (_message) => set(() => ({ message: _message })),
	setRank: (_rank) => set(() => ({ rank: _rank })),
}));

export default modalLevelUpStore;
