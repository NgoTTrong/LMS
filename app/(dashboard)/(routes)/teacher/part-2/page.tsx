import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part2Service from "@/services/part-2/part-2-service";
import { Columns } from "./_components/columns";

const Part2Page = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/");
    }
    const part2s = await Part2Service.getAllPart2(user?.id);

    return (
        <main className="p-6">
            <DataTable data={part2s} columns={Columns} />
        </main>
    );
};

export default Part2Page;
