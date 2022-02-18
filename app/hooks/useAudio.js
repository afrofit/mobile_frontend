import * as React from "react";
import { Audio } from "expo-av";

const useAudio = (url) => {
	const [audio, setAudio] = React.useState();

	const loadSound = async () => {
		const { sound } = await Audio.Sound.createAsync({ uri: url });
		setAudio(sound);
		sound.playAsync();
	};

	const handleUnloadSound = async () => {
		audio && (await audio.unloadAsync());
	};

	const handlePlayback = async () => {
		loadSound(url);
	};

	return { handleUnloadSound, handlePlayback };
};

export default useAudio;
