import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part7Service from "@/services/part-7/part-7-service";
import { columns } from "./_components/columns";

const Part7Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part7s = await Part7Service.getAllPart7(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part7s} columns={columns} />
        </main>
    );
};

export default Part7Page;
