"use client";

import Logo from "@/app/(dashboard)/_components/logo";

const ExamSidebar = () => {
    return (
        <section className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <Logo />
            </div>
        </section>
    );
};

export default ExamSidebar;
