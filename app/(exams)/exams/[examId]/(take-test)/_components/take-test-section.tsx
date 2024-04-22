"use client";
import { Button } from "@/components/ui/button";
import { IExam } from "@/interfaces/exam/exam-interface";
import { useRouter } from "next/navigation";
type Props = {
    exam: IExam;
};
const TakeTestSection = ({ exam }: Props) => {
    const router = useRouter();
    return (
        <section className="w-[440px] min-w-[440px] flex flex-col gap-6">
            <div className="shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] p-6 gap-3 rounded-lg flex flex-col border border-solid border-[#F0F0F0]">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold">{exam?.title}</h1>
                    <h1 className="font-semibold">Bộ đề thi: ETS</h1>
                    <div className="flex items-center gap-2 font-normal">
                        <span>{120} phút</span>-<span>7 phần thi</span>-
                        <span>200 câu hỏi</span>
                    </div>
                </div>
                <hr />
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-base font-medium">2.2K lượt làm</h1>
                    <h1 className="text-base font-medium flex items-center  gap-3">
                        5K lượt yêu thích{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M23.0096 5.87726C22.6505 5.04593 22.1328 4.29259 21.4854 3.6594C20.8376 3.02433 20.0737 2.51965 19.2354 2.1728C18.3662 1.81171 17.4339 1.62688 16.4926 1.62905C15.1721 1.62905 13.8837 1.99065 12.764 2.67369C12.4962 2.83708 12.2417 3.01655 12.0006 3.21208C11.7596 3.01655 11.5051 2.83708 11.2372 2.67369C10.1176 1.99065 8.8292 1.62905 7.50866 1.62905C6.55777 1.62905 5.63634 1.81119 4.76581 2.1728C3.92473 2.52101 3.1667 3.0219 2.51581 3.6594C1.86758 4.29187 1.34977 5.0454 0.991699 5.87726C0.619378 6.74244 0.429199 7.66119 0.429199 8.60673C0.429199 9.49869 0.611342 10.4282 0.972949 11.3737C1.27563 12.1639 1.70956 12.9835 2.26402 13.8112C3.14259 15.121 4.35063 16.4871 5.85063 17.8719C8.33634 20.1674 10.7979 21.7532 10.9024 21.8174L11.5372 22.2246C11.8185 22.404 12.1801 22.404 12.4613 22.2246L13.0962 21.8174C13.2006 21.7505 15.6596 20.1674 18.1479 17.8719C19.6479 16.4871 20.856 15.121 21.7346 13.8112C22.289 12.9835 22.7256 12.1639 23.0256 11.3737C23.3872 10.4282 23.5694 9.49869 23.5694 8.60673C23.5721 7.66119 23.3819 6.74244 23.0096 5.87726ZM12.0006 20.1058C12.0006 20.1058 2.46491 13.996 2.46491 8.60673C2.46491 5.87726 4.72295 3.66476 7.50866 3.66476C9.4667 3.66476 11.1649 4.75762 12.0006 6.35405C12.8363 4.75762 14.5346 3.66476 16.4926 3.66476C19.2783 3.66476 21.5363 5.87726 21.5363 8.60673C21.5363 13.996 12.0006 20.1058 12.0006 20.1058Z"
                                fill="#8C8C8C"
                            />
                        </svg>
                    </h1>
                </div>
                <hr />
                <div className="flex items-center justify-between gap-6">
                    <Button
                        variant={"outline"}
                        className="flex-1"
                        onClick={() =>
                            router.push(`/exams/${exam?.id}/take-test/start`)
                        }
                    >
                        Luyện tập
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={() =>
                            router.push(`/exams/${exam?.id}/take-test/start`)
                        }
                    >
                        Làm full bài
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full rounded-lg shadow-[0px_2px_6px_0px_rgba(0,0,0,0.15)] overflow-hidden">
                <img
                    src="https://storageaura.blob.core.windows.net/blobauragroupstorage/azure690_337da999cec23b6c613b75c239ba72da.jpeg"
                    alt=""
                    className="w-full aspect-video object-cover"
                />
                <div className="flex flex-col gap-3 p-6">
                    <h1 className="text-2xl font-semibold">
                        Cộng đồng Mastery
                    </h1>
                    <p className="text-lg">
                        Tham gia cộng đồng Mastery để cùng học hỏi và chia sẻ
                        kiến thức cũng như tài nguyên miễn phí ngay hôm nay.
                    </p>
                    <Button
                        className="w-fit"
                        onClick={() =>
                            router.push(`/exams/${exam?.id}/take-test/start`)
                        }
                    >
                        Tham gia ngay
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TakeTestSection;
