import { IExamDetail } from "@/interfaces/exam/exam-interface";

export function getNextPartQuestion(
	exam: IExamDetail,
	part: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0
) {
	if (part == 1) {
		if (exam?.part2) {
			return exam?.part2?.part2Questions?.[0]?.questionId;
		} else if (exam?.part3) {
			return exam?.part3?.part3Questions?.[0]?.groupPart3Questions?.[0]
				?.questionId;
		} else if (exam?.part4) {
			return exam?.part4?.part4Questions?.[0]?.groupPart4Questions?.[0]
				?.questionId;
		} else if (exam?.part5) {
			return exam?.part5?.part5Questions?.[0]?.questionId;
		} else if (exam?.part6) {
			return exam?.part6?.part6Questions?.[0]?.groupPart6Questions?.[0]
				?.questionId;
		} else if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 2) {
		if (exam?.part3) {
			return exam?.part3?.part3Questions?.[0]?.groupPart3Questions?.[0]
				?.questionId;
		} else if (exam?.part4) {
			return exam?.part4?.part4Questions?.[0]?.groupPart4Questions?.[0]
				?.questionId;
		} else if (exam?.part5) {
			return exam?.part5?.part5Questions?.[0]?.questionId;
		} else if (exam?.part6) {
			return exam?.part6?.part6Questions?.[0]?.groupPart6Questions?.[0]
				?.questionId;
		} else if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 3) {
		if (exam?.part4) {
			return exam?.part4?.part4Questions?.[0]?.groupPart4Questions?.[0]
				?.questionId;
		} else if (exam?.part5) {
			return exam?.part5?.part5Questions?.[0]?.questionId;
		} else if (exam?.part6) {
			return exam?.part6?.part6Questions?.[0]?.groupPart6Questions?.[0]
				?.questionId;
		} else if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 4) {
		if (exam?.part5) {
			return exam?.part5?.part5Questions?.[0]?.questionId;
		} else if (exam?.part6) {
			return exam?.part6?.part6Questions?.[0]?.groupPart6Questions?.[0]
				?.questionId;
		} else if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 5) {
		if (exam?.part6) {
			return exam?.part6?.part6Questions?.[0]?.groupPart6Questions?.[0]
				?.questionId;
		} else if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 6) {
		if (exam?.part7) {
			return exam?.part7?.part7Questions?.[0]?.groupPart7Questions?.[0]
				?.questionId;
		} else {
			return null;
		}
	} else if (part == 7) {
		return null;
	} else {
		return null;
	}
}
