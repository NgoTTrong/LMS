import { useState, useEffect, useCallback } from "react";

export const useAudio = (url?: string) => {
	const [audio, setAudio] = useState(url && new Audio(url));
	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState<number>(0);
	const toggle = useCallback(() => setPlaying(!playing), [playing]);

	useEffect(() => {
		if (audio) playing ? audio.play() : audio.pause();
	}, [playing, audio]);
	useEffect(() => {
		const setAudioData = () => {
			if (audio) setDuration(audio?.duration ?? 0);
		};

		if (audio) {
			audio.addEventListener("ended", () => setPlaying(false));
			audio.addEventListener("loadedmetadata", setAudioData);
		}
		return () => {
			audio &&
				audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, [audio]);

	return { playing, toggle, setAudio, duration };
};
