import { IExamDetail } from "@/interfaces/exam/exam-interface";

export const calcExamLength = (exam: IExamDetail) => {
    let length = 0;
    if (exam?.part1) {
        length += exam?.part1?.part1Questions?.length;
    }
    if (exam?.part2) {
        length += exam?.part2?.part2Questions?.length;
    }
    if (exam?.part3) {
        length += exam?.part3?.part3Questions?.reduce(
            (total, e) => total + e?.groupPart3Questions?.length,
            0
        );
    }
    if (exam?.part4) {
        length += exam?.part4?.part4Questions?.reduce(
            (total, e) => total + e?.groupPart4Questions?.length,
            0
        );
    }
    if (exam?.part5) {
        length += exam?.part5?.part5Questions?.length;
    }
    if (exam?.part6) {
        length += exam?.part6?.part6Questions?.reduce(
            (total, e) => total + e?.groupPart6Questions?.length,
            0
        );
    }
    if (exam?.part7) {
        length += exam?.part7?.part7Questions?.reduce(
            (total, e) => total + e?.groupPart7Questions?.length,
            0
        );
    }
    return length == 0 ? 1 : length;
};
