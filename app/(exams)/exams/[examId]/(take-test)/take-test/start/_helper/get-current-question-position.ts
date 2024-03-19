import {
    GroupPart3Question,
    GroupPart4Question,
    GroupPart6Question,
    GroupPart7Question,
    IExamDetail,
} from "@/interfaces/exam/exam-interface";

export function getCurrentQuestionPosition(
    questionId: string,
    exam: IExamDetail
) {
    let index = 0;
    if (exam?.part1) {
        const _index = exam?.part1?.part1Questions?.findIndex(
            (e) => e?.questionId == questionId
        );
        if (_index == -1) {
            index += exam?.part1?.part1Questions?.length ?? 0;
        } else {
            return _index + 1;
        }
    }
    if (exam?.part2) {
        const _index = exam?.part2?.part2Questions?.findIndex(
            (e) => e?.questionId == questionId
        );
        if (_index == -1) {
            index += exam?.part2?.part2Questions?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    if (exam?.part3) {
        const arr = exam?.part3?.part3Questions?.reduce(
            (_arr: GroupPart3Question[], e) => [
                ..._arr,
                ...e?.groupPart3Questions,
            ],
            []
        );
        const _index = arr?.findIndex((e) => e?.questionId == questionId);
        if (_index == -1) {
            index += arr?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    if (exam?.part4) {
        const arr = exam?.part4?.part4Questions?.reduce(
            (_arr: GroupPart4Question[], e) => [
                ..._arr,
                ...e?.groupPart4Questions,
            ],
            []
        );
        const _index = arr?.findIndex((e) => e?.questionId == questionId);
        if (_index == -1) {
            index += arr?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    if (exam?.part5) {
        const _index = exam?.part5?.part5Questions?.findIndex(
            (e) => e?.questionId == questionId
        );
        if (_index == -1) {
            index += exam?.part5?.part5Questions?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    if (exam?.part6) {
        const arr = exam?.part6?.part6Questions?.reduce(
            (_arr: GroupPart6Question[], e) => [
                ..._arr,
                ...e?.groupPart6Questions,
            ],
            []
        );
        const _index = arr?.findIndex((e) => e?.questionId == questionId);
        if (_index == -1) {
            index += arr?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    if (exam?.part7) {
        const arr = exam?.part7?.part7Questions?.reduce(
            (_arr: GroupPart7Question[], e) => [
                ..._arr,
                ...e?.groupPart7Questions,
            ],
            []
        );
        const _index = arr?.findIndex((e) => e?.questionId == questionId);
        if (_index == -1) {
            index += arr?.length ?? 0;
        } else {
            return index + _index + 1;
        }
    }
    return index;
}
