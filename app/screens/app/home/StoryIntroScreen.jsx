import * as React from "react";
import styled from "styled-components/native";

import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Video } from "expo-av";

import Button from "../../../components/buttons/Button";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";
import useDisableHardwareBack from "../../../hooks/useDisableHardwareBack";
import useVideo from "../../../hooks/useVideo";

import { COLORS } from "../../../theme/colors";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../../theme/globals";
import {
	getCurrentStory,
	unsetCurrentStory,
} from "../../../store/reducers/contentReducer";
import { storyDetailsFetch } from "../../../store/thunks/contentThunks";
import {
	finishedRequest,
	newRequest,
	selectVideoLoading,
	setVideoLoading,
} from "../../../store/reducers/uiReducer";

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
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
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
	const { contentStoryId } = route.params;
	const [videoStatus, setVideoStatus] = React.useState();
	const [buttonDisabled, setButtonDisabled] = React.useState(true);

	const dispatch = useDispatch();

	const currentStory = useSelector(getCurrentStory);
	const videoLoading = useSelector(selectVideoLoading);

	/** API Calls */

	const getStoryDetails = React.useCallback(async (contentStoryId) => {
		dispatch(storyDetailsFetch(contentStoryId));
	});

	const videoRef = React.useRef(null);
	const { handleUnloadVideo } = useVideo(videoRef, videoStatus);

	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/**Effects */

	React.useEffect(() => {
		getStoryDetails(contentStoryId);
	}, []);

	React.useEffect(() => {
		console.log("Video Loading Status", videoLoading);
	}, [videoLoading]);

	React.useEffect(() => {
		if (videoStatus) {
			if (videoStatus.positionMillis >= 2000) {
				setButtonDisabled(false);
			}
		}
	}, [videoStatus]);

	/** Video monitoring functions */

	const _onPlaybackStatusUpdate = async (status) => {
		if (status.didJustFinish) {
			// do something specific
		}
		setVideoStatus(status);
		// console.log(videoStatus);
	};

	const handleStartStory = async () => {
		await handleUnloadVideo();
		navigation.navigate(routes.home.STORY);
	};

	const handleGoBack = async () => {
		await handleUnloadVideo();
		dispatch(unsetCurrentStory());
		navigation.goBack();
	};

	const generateStartButtonText = () => {
		if (!currentStory) return null;
		if (currentStory.started && !currentStory.completed)
			return "Continue Story";
		else if (!currentStory.started) return "Start Story";
	};

	return (
		<>
			<ScreenContainer backgroundColor={COLORS.dark}>
				{currentStory && (
					<Container>
						<PageHeaderSmall title={`${currentStory.title}`} />
						<TopSection />
						<MidSection>
							<ThreeStarsElement />
							<Spacer />
							<InstructionTextWhite>
								{currentStory.instruction}
							</InstructionTextWhite>
							<Spacer />
							<ThreeStarsElement />
						</MidSection>
						<Button
							variant="white"
							text={generateStartButtonText()}
							onPress={handleStartStory}
							disabled={buttonDisabled}
						/>
						<Button variant="red" text="Exit Story" onPress={handleGoBack} />
						<Spacer />
						<VideoContainer>
							<Video
								ref={videoRef}
								source={{
									uri: currentStory.introVideo,
								}}
								style={styles.video}
								resizeMode={Video.RESIZE_MODE_COVER}
								onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
								shouldPlay={true}
								isLooping={false}
								rate={1}
								onLoadStart={() => dispatch(setVideoLoading(true))}
								onLoad={() => dispatch(setVideoLoading(false))}
							/>
						</VideoContainer>
					</Container>
				)}
			</ScreenContainer>
		</>
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
