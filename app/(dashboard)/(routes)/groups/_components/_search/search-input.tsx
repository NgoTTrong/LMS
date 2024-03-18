"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Input } from "@/components/ui/input";
const SearchInput = () => {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    title: debouncedValue,
                },
            },
            { skipEmptyString: true, skipNull: true }
        );
        router.push(url);
    }, [debouncedValue, router, pathname]);
    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
            <Input
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a group"
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
