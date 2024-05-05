import Lottie from "react-lottie";
import React from "react";
type Props = { lottie: any };
const LottieApp = ({ lottie }: Props) => {
	function getOptionLottie(animationData: any) {
		return {
			loop: true,
			autoplay: true,
			animationData: animationData,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice",
			},
		};
	}
	return (
		<Lottie
			options={getOptionLottie(lottie)}
			isClickToPauseDisabled={true}
		/>
	);
};

export default LottieApp;
