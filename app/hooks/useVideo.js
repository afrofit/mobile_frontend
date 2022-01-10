import * as React from "react";

const useVideo = (videoRef, videoState) => {
	const handleUnloadVideo = async () => {
		videoRef && videoRef.current && (await videoRef.current.stopAsync());
		videoRef && videoRef.current && (await videoRef.current.unloadAsync());
	};

	const handlePlayVideoPlayback = async (value) => {
		switch (value) {
			case "play":
				!videoState.isPlaying &&
					videoRef &&
					videoRef.current &&
					(await videoRef.current.playAsync());
				break;
			case "pause":
				videoState.isPlaying &&
					videoRef &&
					videoRef.current &&
					(await videoRef.current.pauseAsync());
				break;
			case "stop":
				videoState.isPlaying &&
					videoRef &&
					videoRef.current &&
					(await videoRef.current.stopAsync());
				break;
			default:
				return null;
		}
	};

	return { handleUnloadVideo, handlePlayVideoPlayback };
};

export default useVideo;
