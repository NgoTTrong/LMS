"use client";

import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { useState, useEffect } from "react";

const NavbarRoutes = () => {
	const pathname = usePathname();
	const isTeacherPage = pathname.startsWith("/teacher");
	const isPlayerPage = pathname.includes("/courses");
	const isExamPage = pathname.includes("/exams");
	const isSearchPage = pathname.includes("/search");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		isClient && (
			<>
				{isSearchPage && (
					<div className="hidden md:block">
						<SearchInput />
					</div>
				)}

				<section className="flex gap-x-2 ml-auto">
					{isTeacherPage || isExamPage || isPlayerPage ? (
						<Link href="/">
							<Button variant={"ghost"}>
								<LogOut className="h-4 w-4 mr-2" />
								Exit
							</Button>
						</Link>
					) : (
						<Link href="/teacher/courses">
							<Button size={"sm"} variant={"ghost"}>
								Teacher mode
							</Button>
						</Link>
					)}
					<UserButton afterSignOutUrl="/" />
				</section>
			</>
		)
	);
};

export default NavbarRoutes;
