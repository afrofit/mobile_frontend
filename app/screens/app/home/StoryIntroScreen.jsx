import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "../../../components/buttons/Button";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../../theme/globals";
import useDisableHardwareBack from "../../../hooks/useDisableHardwareBack";
import useVideo from "../../../hooks/useVideo";

//This screen is where video intro of storyline is played. Very important!
const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const VideoContainer = styled.View`
	align-items: center;
	height: ${DEVICE_HEIGHT};
	width: ${DEVICE_WIDTH};
	position: absolute;
	z-index: -2;
`;

const PageSection = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const TopSection = styled.View`
	flex: 1;
`;

const MidSection = styled(PageSection)`
	/* flex: 0.9; */
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
	/* background-color: blue; */
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
`;

const InstructionText = styled(Font)`
	font-family: "Regular";
	font-size: 13px;
	color: ${COLORS.yellow};
`;

const InstructionTextWhite = styled(InstructionText)`
	color: ${COLORS.white};
	width: 300px;
`;

const StoryIntroScreen = ({ navigation, route }) => {
	const { storyId } = route.params;
	// console.log("Story ID", storyId);
	const [videoStatus, setVideoStatus] = React.useState();

	/*
	 * Set up VideoRef
	 */
	const videoRef = React.useRef(null);
	const { handleUnloadVideo } = useVideo(videoRef, videoStatus);

	// Disable Back Button
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/*
	 *Video monitoring functions
	 */

	const _onPlaybackStatusUpdate = async (status) => {
		if (status.didJustFinish) {
			// do something specific
		}
		setVideoStatus(status);
		// console.log(videoStatus);
	};

	const handleStartStory = () => {
		handleUnloadVideo().then(() => navigation.navigate(routes.home.STORY));
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			<Container>
				<PageHeaderSmall title="AJ's Big FIGHT // CHAPTER 1" />
				<TopSection />
				<MidSection>
					<ThreeStarsElement />
					<Spacer />
					<InstructionTextWhite>
						As his trainer, you must help AJ defeat 15 opponents to become world
						champion!
					</InstructionTextWhite>
					<Spacer />
					<ThreeStarsElement />
				</MidSection>
				<Button
					variant="white"
					text="Start Story"
					onPress={handleStartStory}
					disabled={videoStatus && videoStatus.positionMillis <= 5000}
				/>
				<Button
					variant="red"
					text="Exit Story"
					onPress={() => navigation.goBack()}
				/>
				<Spacer />
				<VideoContainer>
					<Video
						ref={videoRef}
						source={require("../../../assets/video/story/chapter1/chapter1_intro.mp4")}
						style={styles.video}
						resizeMode={Video.RESIZE_MODE_COVER}
						onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
						shouldPlay={true}
						isLooping={false}
						rate={2}
					/>
				</VideoContainer>
			</Container>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	video: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
});

export default StoryIntroScreen;
