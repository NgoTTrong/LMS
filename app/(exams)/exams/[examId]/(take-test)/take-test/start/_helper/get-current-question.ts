import { IExamDetail } from "@/interfaces/exam/exam-interface";

export function getCurrentQuestion(
	exam: IExamDetail,
	part: 1 | 2 | 3 | 4 | 5 | 6 | 7
) {
	if (part == 1) {
		return exam?.part1?.part1Questions?.length ?? 0;
	} else if (part == 2) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0)
		);
	} else if (part == 3) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0) +
			(exam?.part3?.part3Questions?.reduce(
				(total, e) => total + e?.groupPart3Questions?.length,
				0
			) ?? 0)
		);
	} else if (part == 4) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0) +
			(exam?.part3?.part3Questions?.reduce(
				(total, e) => total + e?.groupPart3Questions?.length,
				0
			) ?? 0) +
			(exam?.part4?.part4Questions?.reduce(
				(total, e) => total + e?.groupPart4Questions?.length,
				0
			) ?? 0)
		);
	} else if (part == 5) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0) +
			(exam?.part3?.part3Questions?.reduce(
				(total, e) => total + e?.groupPart3Questions?.length,
				0
			) ?? 0) +
			(exam?.part4?.part4Questions?.reduce(
				(total, e) => total + e?.groupPart4Questions?.length,
				0
			) ?? 0) +
			(exam?.part5?.part5Questions?.length ?? 0)
		);
	} else if (part == 6) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0) +
			(exam?.part3?.part3Questions?.reduce(
				(total, e) => total + e?.groupPart3Questions?.length,
				0
			) ?? 0) +
			(exam?.part4?.part4Questions?.reduce(
				(total, e) => total + e?.groupPart4Questions?.length,
				0
			) ?? 0) +
			(exam?.part5?.part5Questions?.length ?? 0) +
			(exam?.part6?.part6Questions?.reduce(
				(total, e) => total + e?.groupPart6Questions?.length,
				0
			) ?? 0)
		);
	} else if (part == 7) {
		return (
			(exam?.part1?.part1Questions?.length ?? 0) +
			(exam?.part2?.part2Questions?.length ?? 0) +
			(exam?.part3?.part3Questions?.reduce(
				(total, e) => total + e?.groupPart3Questions?.length,
				0
			) ?? 0) +
			(exam?.part4?.part4Questions?.reduce(
				(total, e) => total + e?.groupPart4Questions?.length,
				0
			) ?? 0) +
			(exam?.part5?.part5Questions?.length ?? 0) +
			(exam?.part6?.part6Questions?.reduce(
				(total, e) => total + e?.groupPart6Questions?.length,
				0
			) ?? 0) +
			(exam?.part7?.part7Questions?.reduce(
				(total, e) => total + e?.groupPart7Questions?.length,
				0
			) ?? 0)
		);
	}
	return 0;
}
