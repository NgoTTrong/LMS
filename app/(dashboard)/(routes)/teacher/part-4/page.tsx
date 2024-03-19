import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part4Service from "@/services/part-4/part-4-service";
import { Columns } from "./_components/columns";

const Part4Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part4s = await Part4Service.getAllPart4(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part4s} columns={Columns} />
        </main>
    );
};

export default Part4Page;
