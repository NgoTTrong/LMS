"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPart1 } from "@/interfaces/part-1/part-1-interface";
import Part1Service from "@/services/part-1/part-1-service";
import { ColumnDef } from "@tanstack/react-table";
import { Popconfirm, message } from "antd";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<IPart1>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            const router = useRouter();
            const onDelete = async () => {
                const _response = await Part1Service.deletePart1(id);
                if (_response) {
                    message.success("Delete successfully");
                    router.refresh();
                }
            };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="h-4 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/part-1/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-4" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Popconfirm
                                title="Delete part 1"
                                description="Are you sure you want to delete and you may lose content related to this part?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={onDelete}
                                className="flex items-center"
                                onPopupClick={() => console.log("hello1")}
                            >
                                <Trash2 className="w-4 h-4 mr-4" />
                                Delete
                            </Popconfirm>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
