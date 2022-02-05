import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import parseMillis from "parse-ms";
import { Timer, Time, TimerOptions } from "timer-node";
import useAsyncEffect from "use-async-effect";
import { ANNOUNCEMENT_TYPE_DATA } from "../../../data/announcement-data";

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
import { useDispatch } from "react-redux";
import { updateUserDailyActivity } from "../../../store/reducers/activityReducer";
import useAudioAnnouncer from "../../../hooks/useAudioAnnouncer";

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
	const dispatch = useDispatch();
	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [videoStatus, setVideoStatus] = React.useState();

	const videoRef = React.useRef(null);

	const { handleUnloadVideo, handlePlayVideoPlayback } = useVideo(
		videoRef,
		videoStatus
	);

	const { bodyMovementCount, setBodyMovementCount, startMoving, stopMoving } =
		useBodyMovements();

	const { handleAnnouncement } = useAudioAnnouncer();

	// This should be passed in as props
	const TARGET_BODY_MOVEMENTS = 50;
	const CAL_BURN_RATE_PER_MOVE = 0.00175;
	const TARGET_DANCE_TIME_MS = 1000 * 60 * 50; // 50 minutes

	// console.log(parseMillis(TARGET_DANCE_TIME_MS));
	const { hours, minutes, seconds } = parseMillis(TARGET_DANCE_TIME_MS);

	/**Effects */

	useAsyncEffect(async () => {
		if (bodyMovementCount === 5) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_100);
		}
	}, []);

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

	React.useEffect(() => {
		const payload = {
			caloriesBurned: Math.ceil(bodyMovementCount / 10),
			bodyMoves: Math.floor(bodyMovementCount / 3),
		};
		dispatch(updateUserDailyActivity(payload));
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
							<MessageText>{TARGET_BODY_MOVEMENTS} steps</MessageText>
							<OneStarElement width={60} />
							<MessageText>
								{minutes} / {minutes} mins
							</MessageText>
						</StepMinuteContainer>
						<StatusContainer>
							<InstructionTextWhite>Your body movements</InstructionTextWhite>
							<NumberText>{bodyMovementCount}</NumberText>
						</StatusContainer>
						{/* <InstructionText>07:34 Minutes to go!</InstructionText> */}
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
