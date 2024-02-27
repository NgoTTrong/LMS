import { DataTable } from "./_components/data-table";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part1Service from "@/services/part-1/part-1-service";
import { columns } from "./_components/columns";

const Part1Page = async () => {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	const part1s = await Part1Service.getAllPart1(user?.id);

	return (
		<main className="p-6">
			<DataTable data={part1s} columns={columns} />
		</main>
	);
};

export default Part1Page;
