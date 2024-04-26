"use client";
import {
    BarChart,
    BookText,
    Compass,
    Layout,
    List,
    WalletCards,
    BookMarked,
    Users,
    BookType,
    BookAudio,
    BookHeadphones,
    BookHeart,
    BookImage,
    Trophy,
    User,
} from "lucide-react";
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
    {
        icon: WalletCards,
        label: "Flashcard",
        href: "/flashcard",
    },
    {
        icon: Users,
        label: "Groups",
        href: "/groups",
    },
    {
        icon: Trophy,
        label: "Leaderboard",
        href: "/leaderboard",
    },
    {
        icon: User,
        label: "Profile",
        href: "/profile",
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
        icon: BookMarked,
        label: "Exam",
        href: "/teacher/exam",
    },
    {
        icon: BookText,
        label: "Part 1",
        href: "/teacher/part-1",
    },
    {
        icon: BookType,
        label: "Part 2",
        href: "/teacher/part-2",
    },
    {
        icon: BookAudio,
        label: "Part 3",
        href: "/teacher/part-3",
    },
    {
        icon: BookText,
        label: "Part 4",
        href: "/teacher/part-4",
    },
    {
        icon: BookHeadphones,
        label: "Part 5",
        href: "/teacher/part-5",
    },
    {
        icon: BookHeart,
        label: "Part 6",
        href: "/teacher/part-6",
    },
    {
        icon: BookImage,
        label: "Part 7",
        href: "/teacher/part-7",
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
