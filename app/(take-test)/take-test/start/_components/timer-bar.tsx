import { Progress } from "@/components/ui/progress";

const TimerBar = () => {
	return (
		<section className="w-full">
			<Progress className="w-full rounded-none h-[8px]" value={50} />
		</section>
	);
};

export default TimerBar;
