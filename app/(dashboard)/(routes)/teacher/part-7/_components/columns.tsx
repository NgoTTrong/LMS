"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPart7 } from "@/interfaces/part-7/part-7-interface";
import Part7Service from "@/services/part-7/part-7-service";
import { ColumnDef } from "@tanstack/react-table";
import { Popconfirm, message } from "antd";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export const Columns: ColumnDef<IPart7>[] = [
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
            const onDelete = async () => {
                const _response = await Part7Service.deletePart7(id);
                if (_response) {
                    message.success("Delete successfully");
                    location.reload();
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
                        <Link href={`/teacher/part-7/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-4" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <Popconfirm
                            title="Delete part 7"
                            description="Are you sure you want to delete and you may lose content related to this part?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={onDelete}
                            className=" flex items-center p-2"
                        >
                            <Trash2 className="w-4 h-4 mr-4" />
                            Delete
                        </Popconfirm>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
