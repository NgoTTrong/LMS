import { IHistory } from "@/interfaces/exam/exam-interface";
import HistoryCard from "./history-card";

type Props = {
	items: IHistory[];
};

const HistoriesList = ({ items }: Props) => {
	return (
		<main>
			<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
				{items.map((item, idx) => {
					return (
						<HistoryCard key={"history-" + idx} history={item} />
					);
				})}
			</div>

			{items.length == 0 && (
				<div className="text-center text-sm text-muted-foreground mt=10">
					No histories found
				</div>
			)}
		</main>
	);
};

export default HistoriesList;
