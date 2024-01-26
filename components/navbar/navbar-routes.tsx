"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.startsWith("/chapter");
  return (
    <section className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
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
  );
};

export default NavbarRoutes;
