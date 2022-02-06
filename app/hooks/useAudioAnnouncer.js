import * as React from "react";
import { Audio } from "expo-av";

export const ANNOUNCEMENT_TYPES = {
	togo_fifty: {
		name: "togo_fifty",
		url: require("../assets/audio/announce/togo_50.mp3"),
	},
	togo_hundred: {
		name: "togo_hundred",
		url: require("../assets/audio/announce/togo_100.mp3"),
	},
	togo_two_hundred: {
		name: "togo_two_hundred",
		url: require("../assets/audio/announce/togo_200.mp3"),
	},
	togo_five_hundred: {
		name: "togo_five_hundred",
		url: require("../assets/audio/announce/togo_500.mp3"),
	},
	done_fifty: {
		name: "done_fifty",
		url: require("../assets/audio/announce/done_50.mp3"),
	},
	done_hundred: {
		name: "done_hundred",
		url: require("../assets/audio/announce/done_100.mp3"),
	},
	done_two_hundred: {
		name: "done_two_hundred",
		url: require("../assets/audio/announce/done_200.mp3"),
	},
	done_five_hundred: {
		name: "done_five_hundred",
		url: require("../assets/audio/announce/done_500.mp3"),
	},
	done_one_thousand: {
		name: "done_one_thousand",
		url: require("../assets/audio/announce/done_1000.mp3"),
	},
	done_two_thousand: {
		name: "done_two_thousand",
		url: require("../assets/audio/announce/done_2000.mp3"),
	},
};

const useAudioAnnouncer = () => {
	const [announcement, setAnnouncement] = React.useState();

	const loadSound = async (url) => {
		const { sound } = await Audio.Sound.createAsync(url);
		setAnnouncement(sound);
		sound.playAsync();
	};

	const handleUnloadSound = async () => {
		sound && (await sound.unloadAsync());
	};

	const handleAnnouncement = async (type) => {
		switch (type) {
			case ANNOUNCEMENT_TYPES.done_fifty.name:
				loadSound(ANNOUNCEMENT_TYPES.done_fifty.url);
				break;
			case ANNOUNCEMENT_TYPES.done_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.done_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.done_two_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.done_two_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.done_five_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.done_five_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.done_one_thousand.name:
				loadSound(ANNOUNCEMENT_TYPES.done_one_thousand.url);
				break;
			case ANNOUNCEMENT_TYPES.done_two_thousand.name:
				loadSound(ANNOUNCEMENT_TYPES.done_two_thousand.url);
				break;
			case ANNOUNCEMENT_TYPES.togo_fifty.name:
				loadSound(ANNOUNCEMENT_TYPES.togo_fifty.url);
				break;
			case ANNOUNCEMENT_TYPES.togo_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.togo_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.togo_two_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.togo_two_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.togo_two_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.togo_two_hundred.url);
				break;
			case ANNOUNCEMENT_TYPES.togo_five_hundred.name:
				loadSound(ANNOUNCEMENT_TYPES.togo_five_hundred.url);
				break;
			default:
				return null;
		}
	};

	return { announcement, handleUnloadSound, handleAnnouncement };
};

export default useAudioAnnouncer;
