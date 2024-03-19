import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part6Service from "@/services/part-6/part-6-service";
import { Columns } from "./_components/columns";

const Part6Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part6s = await Part6Service.getAllPart6(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part6s} columns={Columns} />
        </main>
    );
};

export default Part6Page;
