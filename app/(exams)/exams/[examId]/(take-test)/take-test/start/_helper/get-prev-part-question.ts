import { GroupPart3Question } from "./../../../../../../../../interfaces/exam/exam-interface";
import { IExamDetail } from "@/interfaces/exam/exam-interface";

export function getPrevPartQuestion(
	exam: IExamDetail,
	part: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0
) {
	if (part == 1) {
		return null;
	} else if (part == 2) {
		if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else if (part == 3) {
		if (exam?.part2) {
			return exam?.part2?.part2Questions?.[
				exam?.part2?.part2Questions?.length - 1
			]?.questionId;
		} else if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else if (part == 4) {
		if (exam?.part3) {
			return exam?.part3?.part3Questions?.[
				exam?.part3?.part3Questions?.length - 1
			]?.groupPart3Questions[
				exam?.part3?.part3Questions?.[
					exam?.part3?.part3Questions?.length - 1
				]?.groupPart3Questions?.length - 1
			]?.questionId;
		} else if (exam?.part2) {
			return exam?.part2?.part2Questions?.[
				exam?.part2?.part2Questions?.length - 1
			]?.questionId;
		} else if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else if (part == 5) {
		if (exam?.part4) {
			return exam?.part4?.part4Questions?.[
				exam?.part4?.part4Questions?.length - 1
			]?.groupPart4Questions[
				exam?.part4?.part4Questions?.[
					exam?.part4?.part4Questions?.length - 1
				]?.groupPart4Questions?.length - 1
			]?.questionId;
		} else if (exam?.part3) {
			return exam?.part3?.part3Questions?.[
				exam?.part3?.part3Questions?.length - 1
			]?.groupPart3Questions[
				exam?.part3?.part3Questions?.[
					exam?.part3?.part3Questions?.length - 1
				]?.groupPart3Questions?.length - 1
			]?.questionId;
		} else if (exam?.part2) {
			return exam?.part2?.part2Questions?.[
				exam?.part2?.part2Questions?.length - 1
			]?.questionId;
		} else if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else if (part == 6) {
		if (exam?.part5) {
			return exam?.part5?.part5Questions?.[
				exam?.part5?.part5Questions?.length - 1
			]?.questionId;
		} else if (exam?.part4) {
			return exam?.part4?.part4Questions?.[
				exam?.part4?.part4Questions?.length - 1
			]?.groupPart4Questions[
				exam?.part4?.part4Questions?.[
					exam?.part4?.part4Questions?.length - 1
				]?.groupPart4Questions?.length - 1
			]?.questionId;
		} else if (exam?.part3) {
			return exam?.part3?.part3Questions?.[
				exam?.part3?.part3Questions?.length - 1
			]?.groupPart3Questions[
				exam?.part3?.part3Questions?.[
					exam?.part3?.part3Questions?.length - 1
				]?.groupPart3Questions?.length - 1
			]?.questionId;
		} else if (exam?.part2) {
			return exam?.part2?.part2Questions?.[
				exam?.part2?.part2Questions?.length - 1
			]?.questionId;
		} else if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else if (part == 7) {
		if (exam?.part6) {
			return exam?.part6?.part6Questions?.[
				exam?.part6?.part6Questions?.length - 1
			]?.groupPart6Questions[
				exam?.part6?.part6Questions?.[
					exam?.part6?.part6Questions?.length - 1
				]?.groupPart6Questions?.length - 1
			]?.questionId;
		} else if (exam?.part5) {
			return exam?.part5?.part5Questions?.[
				exam?.part5?.part5Questions?.length - 1
			]?.questionId;
		} else if (exam?.part4) {
			return exam?.part4?.part4Questions?.[
				exam?.part4?.part4Questions?.length - 1
			]?.groupPart4Questions[
				exam?.part4?.part4Questions?.[
					exam?.part4?.part4Questions?.length - 1
				]?.groupPart4Questions?.length - 1
			]?.questionId;
		} else if (exam?.part3) {
			return exam?.part3?.part3Questions?.[
				exam?.part3?.part3Questions?.length - 1
			]?.groupPart3Questions[
				exam?.part3?.part3Questions?.[
					exam?.part3?.part3Questions?.length - 1
				]?.groupPart3Questions?.length - 1
			]?.questionId;
		} else if (exam?.part2) {
			return exam?.part2?.part2Questions?.[
				exam?.part2?.part2Questions?.length - 1
			]?.questionId;
		} else if (exam?.part1) {
			return exam?.part1?.part1Questions?.[
				exam?.part1?.part1Questions?.length - 1
			]?.questionId;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
