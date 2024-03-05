export interface IExam {
    id: string;
    title: string;
    isPublished: boolean;
    thumbnail?: string;
    introduction?: string;
    categoryId: string;
    part1: {
        id: string;
        title: string;
    };
    part2: {
        id: string;
        title: string;
    };
    part3: {
        id: string;
        title: string;
    };

    part4: {
        id: string;
        title: string;
    };
    part5: {
        id: string;
        title: string;
    };
    part6: {
        id: string;
        title: string;
    };
    part7: {
        id: string;
        title: string;
    };
}

export interface IExamCategory {
    id: string;
    name: string;
    background?: string;
    color?: string;
}
