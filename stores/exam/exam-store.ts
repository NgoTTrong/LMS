import { IExamDetail } from "@/interfaces/exam/exam-interface";
import { create } from "zustand";

type State = {
	exam: IExamDetail | null;
	currentPart: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
	currentQuestion: string | null;
	result: {
		questionId: string;
		option: "A" | "B" | "C" | "D";
	}[];
};

type Action = {
	setExam: (_exam: IExamDetail) => void;
	setCurrentPart: (_part: 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
	setCurrentQuestion: (_questionId: string) => void;
	pushResult: (_questionId: string, option: "A" | "B" | "C" | "D") => void;
};

const useExam = create<State & Action>((set) => ({
	exam: null,
	currentPart: null,
	currentQuestion: null,
	result: [],
	setExam: (_exam) => set(() => ({ exam: _exam })),
	setCurrentPart: (_part) => set(() => ({ currentPart: _part })),
	setCurrentQuestion: (_questionId) =>
		set(() => ({ currentQuestion: _questionId })),
	pushResult: (_questionId: string, option: "A" | "B" | "C" | "D") =>
		set((state) => {
			const _result = [...state?.result];
			const idx = _result?.findIndex((e) => e?.questionId == _questionId);
			if (idx != -1) {
				_result[idx].option = option;
				return {
					result: _result,
				};
			} else {
				return {
					result: [
						...state?.result,
						{ questionId: _questionId, option },
					],
				};
			}
		}),
}));
export default useExam;
