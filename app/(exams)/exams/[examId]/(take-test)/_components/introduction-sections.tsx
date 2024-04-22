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
                {
                    part: "Part 3",
                    questions: [
                        {
                            normal: "Câu hỏi về",
                            bold: "chủ đề, mục đích",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Shopping, Service",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Housing",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "yêu cầu, gợi ý",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "kết hợp bảng biểu",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "hàm ý câu nói",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "hành động tương lai",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Company - General Office Work",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Company - Personnel",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Company - Business, Marketing",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Company - Event, Project",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "Company - Facility",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "danh tính người nói",
                        },
                        {
                            normal: "Chủ đề:",
                            bold: "chi tiết, cuộc hội thoại",
                        },
                    ],
                },
                {
                    part: "Part 4",
                    questions: [
                        {
                            normal: "Câu hỏi về",
                            bold: "chủ đề, mục đích",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "chi tiết",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "hành động tương lai",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "yêu cầu, gợi ý",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "kết hợp bảng biểu",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "hàm ý câu nói",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "danh tính, địa điểm",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Telephone message - Tin nhắn thoại",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Advertisement - Quảng cáo",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Announcement - Thông báo",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "New report, Broadcast - Bản tin",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Talk - Bài phát biểu, diễn văn",
                        },
                    ],
                },
            ],
        },
        {
            section: "Reading",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                >
                    <path
                        d="M31.7854 0.93335H2.21394C1.50278 0.93335 0.928223 1.5079 0.928223 2.21906V31.7905C0.928223 32.5017 1.50278 33.0762 2.21394 33.0762H31.7854C32.4965 33.0762 33.0711 32.5017 33.0711 31.7905V2.21906C33.0711 1.5079 32.4965 0.93335 31.7854 0.93335ZM30.1782 30.1834H3.82108V3.82621H30.1782V30.1834ZM16.1961 12.5048H23.5889C23.7657 12.5048 23.9104 12.3601 23.9104 12.1834V10.2548C23.9104 10.078 23.7657 9.93335 23.5889 9.93335H16.1961C16.0193 9.93335 15.8747 10.078 15.8747 10.2548V12.1834C15.8747 12.3601 16.0193 12.5048 16.1961 12.5048ZM16.1961 18.2905H23.5889C23.7657 18.2905 23.9104 18.1459 23.9104 17.9691V16.0405C23.9104 15.8637 23.7657 15.7191 23.5889 15.7191H16.1961C16.0193 15.7191 15.8747 15.8637 15.8747 16.0405V17.9691C15.8747 18.1459 16.0193 18.2905 16.1961 18.2905ZM16.1961 24.0762H23.5889C23.7657 24.0762 23.9104 23.9316 23.9104 23.7548V21.8262C23.9104 21.6494 23.7657 21.5048 23.5889 21.5048H16.1961C16.0193 21.5048 15.8747 21.6494 15.8747 21.8262V23.7548C15.8747 23.9316 16.0193 24.0762 16.1961 24.0762ZM10.0889 11.2191C10.0889 11.6453 10.2583 12.0541 10.5597 12.3555C10.8611 12.6569 11.2698 12.8262 11.6961 12.8262C12.1223 12.8262 12.5311 12.6569 12.8325 12.3555C13.1339 12.0541 13.3032 11.6453 13.3032 11.2191C13.3032 10.7928 13.1339 10.384 12.8325 10.0826C12.5311 9.78125 12.1223 9.61192 11.6961 9.61192C11.2698 9.61192 10.8611 9.78125 10.5597 10.0826C10.2583 10.384 10.0889 10.7928 10.0889 11.2191ZM10.0889 17.0048C10.0889 17.431 10.2583 17.8398 10.5597 18.1412C10.8611 18.4426 11.2698 18.6119 11.6961 18.6119C12.1223 18.6119 12.5311 18.4426 12.8325 18.1412C13.1339 17.8398 13.3032 17.431 13.3032 17.0048C13.3032 16.5785 13.1339 16.1698 12.8325 15.8684C12.5311 15.567 12.1223 15.3976 11.6961 15.3976C11.2698 15.3976 10.8611 15.567 10.5597 15.8684C10.2583 16.1698 10.0889 16.5785 10.0889 17.0048ZM10.0889 22.7905C10.0889 23.2167 10.2583 23.6255 10.5597 23.9269C10.8611 24.2283 11.2698 24.3976 11.6961 24.3976C12.1223 24.3976 12.5311 24.2283 12.8325 23.9269C13.1339 23.6255 13.3032 23.2167 13.3032 22.7905C13.3032 22.3643 13.1339 21.9555 12.8325 21.6541C12.5311 21.3527 12.1223 21.1834 11.6961 21.1834C11.2698 21.1834 10.8611 21.3527 10.5597 21.6541C10.2583 21.9555 10.0889 22.3643 10.0889 22.7905Z"
                        fill="#262626"
                    />
                </svg>
            ),
            parts: [
                {
                    part: "Part 5",
                    questions: [
                        {
                            normal: "Câu hỏi",
                            bold: "từ loại",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "ngữ pháp",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "từ vựng",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Danh từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Đại từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Tính từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Thì",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Thể",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Trạng từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Động từ nguyên mẫu có to",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Phân từ & cấu trúc phân từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Động từ nguyên mẫu",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Danh động từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Giới từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Liên từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Mệnh đề quan hệ",
                        },
                    ],
                },
                {
                    part: "Part 6",
                    questions: [
                        {
                            normal: "Câu hỏi",
                            bold: "từ loại",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "ngữ pháp",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "từ vựng",
                        },

                        {
                            normal: "Grammar:",
                            bold: "Phân từ & cấu trúc phân từ",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "điền vào đoạn văn",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Mệnh đề quan hệ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Tính từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Thể",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Trạng từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Liên từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Danh từ",
                        },
                        {
                            normal: "Grammar:",
                            bold: "Đại từ",
                        },
                        {
                            normal: "Hình thức:",
                            bold: "Thư điện tử / thư tay (Email / Letter)",
                        },
                        {
                            normal: "Hình thức:",
                            bold: "Bài báo (Article / Review)",
                        },
                        {
                            normal: "Hình thức:",
                            bold: "Thông báo / Văn bản hướng dẫn (Notifice / Annoucement information)",
                        },
                    ],
                },
                {
                    part: "Part 7",
                    questions: [
                        {
                            normal: "Câu hỏi",
                            bold: "tìm từ đồng nghĩa",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "tìm thông tin",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "suy luận",
                        },

                        {
                            normal: "Câu hỏi",
                            bold: "điền câu",
                        },
                        {
                            normal: "Câu hỏi về",
                            bold: "chủ đề, mục đích",
                        },
                        {
                            normal: "Câu hỏi",
                            bold: "hàm ý câu hỏi",
                        },
                        {
                            normal: "Cấu trúc:",
                            bold: "Một đoạn",
                        },
                        {
                            normal: "Cấu trúc:",
                            bold: "Nhiều đoạn",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Thư điện tử / thư tay (Email / Letter)",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Form - Đơn từ, biểu mẫu",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Article / Review - Bài báo / Đánh giá",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Advertisement - Quảng cáo",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Text message chain - Chuỗi tin nhắn",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Schedule - Lịch trình, thời gian biểu",
                        },
                        {
                            normal: "Dạng bài:",
                            bold: "Instruction - Văn bản hướng dẫn",
                        },
                    ],
                },
            ],
        },
    ];
    return (
        <section className="flex-1 w-full flex flex-col gap-6 max-w-full overflow-auto pb-6">
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
                                            className="px-6 py-3 border-b border-solid border-[#f0f0f0] border-r w-full text-start"
                                        >
                                            {question?.normal}
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
