import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import ExamSidebar from "./_components/exam-sidebar";
import ExamNavbar from "./_components/exam-navbar";

type Props = {
    children: React.ReactNode;
    params: {
        courseId: string;
    };
};

const ExamLayout = async ({ children, params }: Props) => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }
    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <ExamNavbar />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <ExamSidebar />
            </div>

            <main className="md:pl-80 h-full pt-[80px]">{children}</main>
        </div>
    );
};

export default ExamLayout;
