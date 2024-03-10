import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const useClientAuth = () => {
	const user = useAuth();
	if (!user?.userId) {
		redirect("/");
	}
	return user;
};
