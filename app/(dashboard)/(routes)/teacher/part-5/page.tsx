import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part5Service from "@/services/part-5/part-5-service";
import { columns } from "./_components/columns";

const Part5Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part5s = await Part5Service.getAllPart5(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part5s} columns={columns} />
        </main>
    );
};

export default Part5Page;
