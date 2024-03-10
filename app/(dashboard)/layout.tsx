"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            delay: 100,
            offset: 100,
            easing: "ease-in-sine",
        });
        AOS.refresh();
    }, []);
    return <main>{children}</main>;
};

export default DashboardLayout;
