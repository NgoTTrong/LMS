import { IGroup } from "@/interfaces/group/group-interface";
import { create } from "zustand";

type State = {
    groups: IGroup[];
};

type Action = {
    setGroups: (_group: IGroup[]) => void;
};

const groupStore = create<State & Action>((set) => ({
    groups: [],
    setGroups: (_group) => set(() => ({ groups: _group })),
}));
export default groupStore;
