import { create } from "zustand";

type State = {
	openModal: boolean;
};

type Action = {
	setOpenModal: (_open: boolean) => void;
};

const useModalAuth = create<State & Action>((set) => ({
	openModal: false,
	setOpenModal: (_open) => set(() => ({ openModal: _open })),
}));
export default useModalAuth;
