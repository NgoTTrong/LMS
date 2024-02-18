"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Part1Page = () => {
	return (
		<main className="p-6">
			<div className="flex items-center py-4 justify-between">
				<Input
					placeholder="Filter courses..."
					value={""}
					onChange={(event) => {}}
					className="max-w-sm"
				/>
				<Link href="/teacher/part-1/create">
					<Button>
						<PlusCircle className="w-4 h-4 mr-2" />
						New part 1
					</Button>
				</Link>
			</div>
		</main>
	);
};

export default Part1Page;
