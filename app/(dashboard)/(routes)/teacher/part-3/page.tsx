import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part3Service from "@/services/part-3/part-3-service";
import { columns } from "./_components/columns";

const Part3Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part3s = await Part3Service.getAllPart3(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part3s} columns={columns} />
        </main>
    );
};

export default Part3Page;
