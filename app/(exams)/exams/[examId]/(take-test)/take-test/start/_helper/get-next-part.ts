import { IExamDetail } from "@/interfaces/exam/exam-interface";

export function getNextPart(
	exam: IExamDetail,
	part: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0
) {
	if (part == 1) {
		if (exam?.part2) {
			return 2;
		} else if (exam?.part3) {
			return 3;
		} else if (exam?.part4) {
			return 4;
		} else if (exam?.part5) {
			return 5;
		} else if (exam?.part6) {
			return 6;
		} else if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 2) {
		if (exam?.part3) {
			return 3;
		} else if (exam?.part4) {
			return 4;
		} else if (exam?.part5) {
			return 5;
		} else if (exam?.part6) {
			return 6;
		} else if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 3) {
		if (exam?.part4) {
			return 4;
		} else if (exam?.part5) {
			return 5;
		} else if (exam?.part6) {
			return 6;
		} else if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 4) {
		if (exam?.part5) {
			return 5;
		} else if (exam?.part6) {
			return 6;
		} else if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 5) {
		if (exam?.part6) {
			return 6;
		} else if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 6) {
		if (exam?.part7) {
			return 7;
		} else {
			return 0;
		}
	} else if (part == 7) {
		return 0;
	} else {
		return 0;
	}
}
