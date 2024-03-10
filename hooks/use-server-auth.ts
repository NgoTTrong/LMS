import { currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const useServerAuth = async () => {
	const user = await currentUser();
	if (!user?.id) {
		redirect("/");
	}
	return user;
};
