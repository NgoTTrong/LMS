import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const IntroduceTable = () => {
    return (
        <div className="w-full">
            <h3 className="text-md font-bold mb-5">Results of your test:</h3>
            <Table className=" border-[1px] rounded-md text-md">
                <TableHeader className=" bg-slate-200">
                    <TableRow>
                        <TableHead>Workday</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="p-2 pl-4">
                            <span className="text-md mb-3">03/03/2024</span>
                            <div className="flex items-center text-white text-xs font-bold gap-2">
                                <span className="p-1 rounded-md bg-yellow-400 ">
                                    Practice
                                </span>
                                <span className="p-1 rounded-md bg-yellow-400">
                                    Part2
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>15/25</TableCell>
                        <TableCell>0:12:44</TableCell>
                        <TableCell>
                            <a href="#" className=" text-blue-500">
                                Detail
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="p-2 pl-4">
                            <span className="text-md mb-3">03/03/2024</span>
                            <div className="flex items-center text-white text-xs font-bold gap-2">
                                <span className="p-1 rounded-md bg-yellow-400 ">
                                    Practice
                                </span>
                                <span className="p-1 rounded-md bg-yellow-400">
                                    Part2
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>15/25</TableCell>
                        <TableCell>0:12:44</TableCell>
                        <TableCell>
                            <a href="#" className=" text-blue-500">
                                Detail
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="p-2 pl-4">
                            <span className="text-md mb-3">03/03/2024</span>
                            <div className="flex items-center text-white text-xs font-bold gap-2">
                                <span className="p-1 rounded-md bg-yellow-400 ">
                                    Practice
                                </span>
                                <span className="p-1 rounded-md bg-yellow-400">
                                    Part2
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>15/25</TableCell>
                        <TableCell>0:12:44</TableCell>
                        <TableCell>
                            <a href="#" className=" text-blue-500">
                                Detail
                            </a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default IntroduceTable;
