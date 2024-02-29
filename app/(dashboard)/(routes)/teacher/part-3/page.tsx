"use client";

import { DataTable } from "./_components/data-table";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Part2Service from "@/services/part-2/part-2-service";
import { columns } from "./_components/columns";

const Part2Page = async () => {
	const { userId } = await useAuth();
	if (!userId) {
		redirect("/");
	}
	const part2s = await Part2Service.getAllPart2(userId);

	return (
		<main className="p-6">
			<DataTable data={part2s} columns={columns} />
		</main>
	);
};

export default Part2Page;
