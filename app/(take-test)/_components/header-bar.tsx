"use client";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const HeaderBar = () => {
	return (
		<main className="w-full flex items-center justify-between p-6 border-2 border-b border-slate-200 shadow-sm">
			<Logo />
			<section className="flex gap-x-2 ml-auto">
				<Link href="/">
					<Button variant={"ghost"}>
						<LogOut className="h-4 w-4 mr-2" />
						Exit
					</Button>
				</Link>

				<UserButton afterSignOutUrl="/" />
			</section>
		</main>
	);
};

export default HeaderBar;
