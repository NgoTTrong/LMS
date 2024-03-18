import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton } from "@clerk/nextjs";
import ToasterProvider from "@/components/providers/toaster-provider";
import "react-loading-skeleton/dist/skeleton.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Toeic Mastery",
    description: "Support your learning english path",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToasterProvider />
                    <AntdRegistry>{children}</AntdRegistry>
                </body>
            </html>
        </ClerkProvider>
    );
}
