"use client";

import { UserButton } from "@clerk/nextjs";

const NavbarRoutes = () => {
  return (
    <section className="flex gap-x-2 ml-auto">
      <UserButton afterSignOutUrl="/" />
    </section>
  );
};

export default NavbarRoutes;
