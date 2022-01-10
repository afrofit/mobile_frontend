import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import QuitButton from "../../../components/buttons/QuitButton";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import OneStarElement from "../../../elements/OneStarElement";
import { COLORS } from "../../../theme/colors";
import { BORDER_RADIUS_BIG } from "../../../theme/globals";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import useDisableHardwareBack from "../../../hooks/useDisableHardwareBack";
import useVideo from "../../../hooks/useVideo";
import VideoContainer from "../../../utilities/VideoContainer";
import useBodyMovements from "../../../hooks/useBodyMovements";

const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const FlexSpacer = styled.View`
	flex: 1;
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
`;

const NumberText = styled(Font)`
	font-family: "NumberThin";
	font-size: 65px;
	letter-spacing: 5px;
	color: ${COLORS.white};
	line-height: 65px;
`;

const MessageText = styled(Font)`
	font-family: "SemiBold";
	font-size: 17px;
	letter-spacing: 1.5px;
	color: ${COLORS.white};
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

const StepMinuteContainer = styled.View`
	flex-direction: row;
	width: 100%;
	min-height: 10px;
`;

const StatusContainer = styled.View`
	padding: 10px;
	background-color: ${COLORS.red};
	margin: 20px;
	border-radius: ${BORDER_RADIUS_BIG};
`;

const BottomSection = styled.View`
	justify-content: center;
	align-items: center;
`;

const DanceScreen = ({ navigation }) => {
	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [videoStatus, setVideoStatus] = React.useState();

	const videoRef = React.useRef(null);

	const { handleUnloadVideo, handlePlayVideoPlayback } = useVideo(
		videoRef,
		videoStatus
	);

	const { bodyMovementCount, setBodyMovementCount, startMoving, stopMoving } =
		useBodyMovements();

	// This should be passed in as props
	const TARGET_BODY_MOVEMENTS = 50;

	React.useEffect(() => {
		setBodyMovementCount(0);
		startMoving();
		return () => {
			stopMoving();
		};
	}, []);

	React.useEffect(() => {
		return TARGET_BODY_MOVEMENTS <= bodyMovementCount
			? handleUserResults("story_complete")
			: "null";
	}, [bodyMovementCount]);

	/*
	 * @params
	 */

	// Disable Back Button
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/*
	 *Video monitoring functions
	 */

	const _onPlaybackStatusUpdate = async (status) => {
		// if (status.didJustFinish) return handleUserResults("success");
		// if (status.didJustFinish) return handleUserResults("story_complete");
		// if (status.didJustFinish) console.log("Finished!!!!");

		setVideoStatus(status);
		// console.log(videoStatus);
	};

	const handleChapterSuccess = () => {
		console.log(
			"Body Movement Count",
			bodyMovementCount,
			"Target: ",
			TARGET_BODY_MOVEMENTS
		);
		if (TARGET_BODY_MOVEMENTS === bodyMovementCount)
			return handleUserResults("success");
		return;
	};

	const handleQuitPressed = () => {
		handlePlayVideoPlayback("pause");
		setShowConfirmModal(true);
	};

	const handleCancelPressed = () => {
		handlePlayVideoPlayback("play");
		setShowConfirmModal(false);
	};

	const handleQuitDance = () => {
		handleUnloadVideo().then(() => setShowConfirmModal(false));
		return navigation.navigate(routes.home.STORY);
	};

	const handleUserResults = (status) => {
		switch (status) {
			case "success":
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: { success: true },
				});
				break;
			case "failed":
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: { success: false },
				});
				break;
			case "story_complete":
				navigation.navigate(routes.home.STORY_FINISHED_SCREEN, {
					data: { success: null },
				});
				break;
			default:
				return;
		}
	};

	return (
		<>
			{showConfirmModal && (
				<ConfirmModal
					onCancelClicked={handleCancelPressed}
					onConfirmClicked={handleQuitDance}
				/>
			)}
			<ScreenContainer backgroundColor={COLORS.dark}>
				<Container>
					<PageHeaderSmall title="AJ's Big FIGHT // CHAPTER 1" />
					<FlexSpacer />
					<BottomSection>
						<StepMinuteContainer>
							<MessageText>17000 steps</MessageText>
							<OneStarElement width={60} />
							<MessageText>30 Minutes</MessageText>
						</StepMinuteContainer>
						<StatusContainer>
							<InstructionTextWhite>Your body movements</InstructionTextWhite>
							<NumberText>{bodyMovementCount}</NumberText>
						</StatusContainer>
						<InstructionText>07:34 Minutes to go!</InstructionText>
						<Spacer />
						<QuitButton onPress={handleQuitPressed} />
						<Spacer />
					</BottomSection>
					<VideoContainer>
						<Video
							ref={videoRef}
							source={require("../../../assets/video/story/chapter1/chapter1_intro.mp4")}
							style={styles.video}
							resizeMode={Video.RESIZE_MODE_COVER}
							onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
							shouldPlay={true}
							isLooping={true}
							rate={2}
						/>
					</VideoContainer>
				</Container>
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

export default DanceScreen;
