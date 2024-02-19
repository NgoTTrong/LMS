import Part1Service from "@/services/part-1/part-1-service";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
	params: {
		part1Id: string;
	};
};
const Part1IdPage = async ({ params }: Props) => {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}
	const part1 = await Part1Service.getOne(params.part1Id, user.id);
	if (!part1) {
		redirect("/");
	}
	console.log(part1);
	return <main className="p-6">{params?.part1Id}</main>;
};

export default Part1IdPage;
