import { IHistory } from "@/interfaces/exam/exam-interface";
import Link from "next/link";
import dayjs from "dayjs";
import { IconBadge } from "@/components/icon-badge";
import { Check, Sparkles } from "lucide-react";

type Props = {
	history: IHistory;
};
const HistoryCard = ({ history }: Props) => {
	return (
		<Link
			data-aos="zoom-in"
			href={`/exams/${history?.examId}/history/${history?.id}`}
		>
			<div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 w-full">
				<div className="relative w-full aspect-video rounded-md overflow-hidden">
					<img
						src={history?.exam?.thumbnail!}
						alt={history?.exam?.title}
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col pt-2">
					<div className="flex items-end w-full justify-between">
						<span className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
							{history?.exam?.title}
						</span>
						<p className="text-xs text-muted-foreground">
							{dayjs(history?.createdAt).format(
								"HH:mm - DD/MM/YYYY"
							)}
						</p>
					</div>

					<div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
						<div className="flex items-center gap-x-1 text-slate-500">
							<IconBadge size="sm" icon={Sparkles} />
							<span className="font-medium text-sm">
								{history?.score} points
							</span>
							<div className="h-6 w-[1px] bg-slate-300 mx-2"></div>
							<IconBadge size="sm" icon={Check} />
							<span className="font-medium text-sm">
								{history?.numOfCorrects} questions
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default HistoryCard;
