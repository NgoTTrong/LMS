const IntroductSections = () => {
    const sections: {
        section: string;
        icon: any;
        parts: {
            part: string;
            questions: {
                normal: string;
                bold: string;
            }[];
        }[];
    }[] = [
        {
            section: "Listening",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                >
                    <path
                        d="M17.9994 2.56653C9.4775 2.56653 2.5708 9.47323 2.5708 17.9951V32.4594C2.5708 32.9938 3.00071 33.4237 3.53509 33.4237H10.9279C12.3462 33.4237 13.4994 32.2706 13.4994 30.8522V22.4951C13.4994 21.0768 12.3462 19.9237 10.9279 19.9237H5.46366V17.9951C5.46366 11.0723 11.0766 5.45939 17.9994 5.45939C24.9221 5.45939 30.5351 11.0723 30.5351 17.9951V19.9237H25.0708C23.6525 19.9237 22.4994 21.0768 22.4994 22.4951V30.8522C22.4994 32.2706 23.6525 33.4237 25.0708 33.4237H32.4637C32.998 33.4237 33.4279 32.9938 33.4279 32.4594V17.9951C33.4279 9.47323 26.5213 2.56653 17.9994 2.56653ZM10.6065 22.8165V30.5308H5.46366V22.8165H10.6065ZM30.5351 30.5308H25.3922V22.8165H30.5351V30.5308Z"
                        fill="black"
                        fillOpacity="0.85"
                    />
                </svg>
            ),
            parts: [
                {
                    part: "Part 1",
                    questions: [
                        {
                            normal: "Tranh tả",
                            bold: "người",
                        },
                        {
                            normal: "Tranh tả",
                            bold: "vật",
                        },
                        {
                            normal: "Tranh tả",
                            bold: "người & vật",
                        },
                    ],
                },
                {
                    part: "Part 2",
                    questions: [
                        {
                            normal: "Câu hỏi",
                            bold: "WHAT",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "WHO",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "WHERE",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "WHEN",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "WHY",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "HOW",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "YES/NO",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "đuôi",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "lựa chọn",
                        },
                        {
                            normal: "Câu",
                            bold: "yêu cầu, đề nghị",
                        },
                        {
                            normal: "Câu",
                            bold: "trần thuật",
                        },
                    ],
                },
            ],
        },
    ];
    return (
        <section className="flex-1 w-full flex flex-col gap-6">
            {sections.map((section, idx) => (
                <div
                    key={"section-" + idx}
                    className="w-full border border-solid border-[#F0F0F0] flex flex-col"
                >
                    <div className="flex bg-[#FAFAFA]">
                        <div className="p-6 border-r border-solid border-[#f0f0f0]">
                            {section?.icon}
                        </div>
                        <p className="p-6 flex-1 w-full text-center flex items-center justify-center">
                            {section?.section}
                        </p>
                    </div>
                    <div className="w-full h-2 bg-[#f0f0f0]"></div>
                    {section?.parts?.map((part, index) => (
                        <div
                            className="w-full flex flex-col"
                            key={"section-" + idx + "-part-" + index}
                        >
                            <div className="flex bg-white">
                                <div className="border-r border-solid border-[#f0f0f0] text-base pt-3 px-2">
                                    {part?.part}
                                </div>
                                <div className="flex-1 w-full text-center grid grid-cols-3">
                                    {part?.questions.map((question, indx) => (
                                        <div
                                            key={
                                                "section-" +
                                                idx +
                                                "-part-" +
                                                index +
                                                "-question-" +
                                                indx
                                            }
                                            className="flex items-center justify-start gap-1 px-6 py-3 border-b border-solid border-[#f0f0f0] border-r"
                                        >
                                            <span>{question?.normal}</span>
                                            {"  "}
                                            <b>{question?.bold}</b>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-2 bg-[#f0f0f0]"></div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default IntroductSections;
