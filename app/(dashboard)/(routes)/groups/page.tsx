"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/Group.module.css";
import axios from "axios";
import Group from "./_components/_group/group";
import { useClientAuth } from "@/hooks/use-client-auth";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ModalCreateGroup } from "./_components/_group/modal-create-group";
import { Button } from "@/components/ui/button";
import GroupService from "@/services/group/group-service";
import { IGroup } from "@/interfaces/group/group-interface";
export default function Groups() {
	const [groups, setGroups] = useState<IGroup[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const user = useClientAuth();
	if (!user) {
		redirect("/");
	}
	const fetchGroup = async () => {
		setIsLoading(true);
		const _groups = await GroupService.getAllGroups();
		setIsLoading(false);
	};
	useEffect(() => {
		fetchGroup();
	}, []);
	return (
		<main className="mt-6 flex flex-col items-center  w-full overflow-hidden min-h-screen bg-white">
			<div className="w-full ml-auto pl-6">
				<ModalCreateGroup>
					<Button>Create group</Button>
				</ModalCreateGroup>
			</div>
			<section className="w-full flex flex-col gap-2"></section>
		</main>
	);
}
