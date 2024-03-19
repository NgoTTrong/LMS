"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/Group.module.css";
import axios from "axios";
import Group from "./_components/_group/group";
import { useClientAuth } from "@/hooks/use-client-auth";
import { redirect, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ModalCreateGroup } from "./_components/_group/modal-create-group";
import { Button } from "@/components/ui/button";
import GroupService from "@/services/group/group-service";
import { IGroup } from "@/interfaces/group/group-interface";
import groupStore from "@/stores/group/group-store";
import LoadingGroup from "./_components/_loading/loading-group";
import SearchInput from "./_components/_search/search-input";
import GroupCard from "./_components/_group/group-card";
export default function Groups() {
    const { groups, setGroups } = groupStore();
    const [isLoading, setIsLoading] = useState(false);
    const user = useClientAuth();
    const params = useSearchParams();
    if (!user) {
        redirect("/");
    }
    const fetchGroup = async () => {
        if (groups.length == 0) {
            setIsLoading(true);
            const _groups = await GroupService.getAllGroups();
            setGroups(_groups);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchGroup();
    }, []);
    return (
        <main className="p-6 flex flex-col  w-full overflow-hidden min-h-screen bg-white gap-4">
            <SearchInput />

            <div className="w-full ml-auto">
                <ModalCreateGroup>
                    <Button>Create group</Button>
                </ModalCreateGroup>
            </div>
            {isLoading ? (
                <LoadingGroup />
            ) : groups?.length != 0 ? (
                <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 w-full h-fit">
                    {groups
                        ?.filter((group) =>
                            group?.title
                                ?.toLowerCase()
                                ?.includes(
                                    params.get("title")?.toLowerCase() ?? ""
                                )
                        )
                        ?.map((group, idx) => (
                            <GroupCard group={group} key={"group-" + idx} />
                        ))}
                </section>
            ) : (
                <h1 className="text-base text-slate-500 italic">
                    No data found
                </h1>
            )}
        </main>
    );
}
