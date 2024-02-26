"use client";
import { BarChart, BookText, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
	{
		icon: Layout,
		label: "Dashboard",
		href: "/",
	},
	{
		icon: Compass,
		label: "Browse",
		href: "/search",
	},
];
const teacherRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/teacher/courses",
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/teacher/analytics",
	},
	{
		icon: BookText,
		label: "Part 1",
		href: "/teacher/part-1",
	},
	{
		icon: BookText,
		label: "Part 2",
		href: "/teacher/part-2",
	},
	{
		icon: BookText,
		label: "Part 3",
		href: "/teacher/part-3",
	},
];
const SidebarRoutes = () => {
	const pathname = usePathname();
	const isTeacherPage = pathname.startsWith("/teacher");
	const routes = isTeacherPage ? teacherRoutes : guestRoutes;
	return (
		<section className="flex flex-col w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					href={route.href}
					label={route.label}
				/>
			))}
		</section>
	);
};

export default SidebarRoutes;
