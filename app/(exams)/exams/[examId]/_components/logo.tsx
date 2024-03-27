"use client";
import img from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        <img
            src={"/logo.svg"}
            alt="logo"
            height={160}
            width={160}
            onClick={() => router.push("/")}
            className="cursor-pointer"
        />
    );
};

export default Logo;
