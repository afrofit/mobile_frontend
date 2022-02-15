import * as React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import parseMillis from "parse-ms";
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
import { useDispatch, useSelector } from "react-redux";
import { updateUserDailyActivity } from "../../../store/reducers/activityReducer";
import useAudioAnnouncer from "../../../hooks/useAudioAnnouncer";
import useInterval from "../../../hooks/useInteval";
import Loader from "../../../components/Loader";
import { getCurrentStoryChapter } from "../../../store/reducers/contentReducer";
import {
	calculateActualSteps,
	calculateTargetSteps,
	calculateTargetTime,
} from "../../../utilities/calculators";

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

const DanceScreen = ({ navigation, route }) => {
	const { storyTitle } = route.params;
	const dispatch = useDispatch();

	const currentChapter = useSelector(getCurrentStoryChapter);

	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [videoStatus, setVideoStatus] = React.useState();
	const [videoLoading, setVideoLoading] = React.useState(true);
	const [count, setCount] = React.useState(0);
	const [delay, setDelay] = React.useState(1000);
	const [timeDanced, setTimeDanced] = React.useState(timeSpentInMillis || 0);

	const videoRef = React.useRef(null);

	const { handleUnloadVideo, handlePlayVideoPlayback } = useVideo(
		videoRef,
		videoStatus
	);

	const { timeSpentInMillis, targetTimeInMillis, targetBodyMoves, videoUrl } =
		currentChapter;

	const { bodyMovementCount, setBodyMovementCount, startMoving, stopMoving } =
		useBodyMovements();

	const { handleAnnouncement } = useAudioAnnouncer();

	// This should be passed in as props
	const TARGET_BODY_MOVEMENTS = 50;
	const CAL_BURN_RATE_PER_MOVE = 0.00175;
	const TARGET_DANCE_TIME_MS = 1000 * 60 * 50; // 50 minutes
	const TIME_DANCED = 1000 * 60 * 10; // 10 Minutes
	const ONE_SECOND = 60000;

	// console.log(parseMillis(TARGET_DANCE_TIME_MS));
	const {
		hours: targetHours,
		minutes: targetMinutes,
		seconds: targetSeconds,
	} = parseMillis(calculateTargetTime(targetBodyMoves));
	const { hours, minutes, seconds } = parseMillis(timeDanced);

	/**Effects */
	useInterval(() => {
		setCount(count + 1);
	}, delay);

	useInterval(() => {
		setTimeDanced(timeDanced + 1000);
	}, delay);

	const realStepsCount = calculateActualSteps(count);

	useAsyncEffect(async () => {
		if (realStepsCount === 50) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_50);
		}
		if (realStepsCount === 100) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_100);
		}
		if (realStepsCount === 200) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_200);
		}
		if (realStepsCount === targetBodyMoves - 200) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_200);
		}
		if (realStepsCount === targetBodyMoves - 100) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_100);
		}
		if (realStepsCount === targetBodyMoves - 50) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_50);
		}

		if (targetBodyMoves > 1200 && targetBodyMoves < 1500) {
			if (realStepsCount === 500) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_200);
			}
		}
		if (targetBodyMoves > 1501 && targetBodyMoves < 2300) {
			if (realStepsCount === 500) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_500);
			}
			if (realStepsCount === 1000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_1000);
			}
		}
		if (targetBodyMoves > 2301 && targetBodyMoves < 2500) {
			if (realStepsCount === 1000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_1000);
			}
			if (realStepsCount === 2000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_2000);
			}
		}
	}, [realStepsCount]);

	React.useEffect(() => {
		startMoving();
		return () => {
			return stopMoving();
		};
	}, []);

	React.useEffect(() => {
		return TARGET_BODY_MOVEMENTS <= bodyMovementCount
			? handleUserResults("story_complete")
			: "null";
	}, [bodyMovementCount]);

	React.useEffect(() => {
		const realBodyMovementCount = bodyMovementCount / 3;
		const payload = {
			bodyMoves: Math.floor(realBodyMovementCount),
			caloriesBurned: CAL_BURN_RATE_PER_MOVE * realBodyMovementCount,
			totalTimeDancedInMilliseconds: TIME_DANCED,
		};
		console.log("Payload", payload.bodyMoves);
		console.log("Body Movement Count", bodyMovementCount);
		if (bodyMovementCount === 50) {
			return dispatch(updateUserDailyActivity(payload));
		}
	}, [bodyMovementCount]);

	// Disable Back Button
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/*
	 *Video monitoring functions
	 */

	const _onPlaybackStatusUpdate = async (status) => {
		// If status.didJustFinish, do something...
		setVideoStatus(status);
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
		setDelay(null);
		setShowConfirmModal(true);
	};

	const handleCancelPressed = () => {
		handlePlayVideoPlayback("play");
		setDelay(1000);
		setShowConfirmModal(false);
	};

	const handleQuitDance = () => {
		handleUnloadVideo().then(() => setShowConfirmModal(false));
		return navigation.navigate(routes.home.STORY);
	};

	const handleUserResults = async (status) => {
		switch (status) {
			case "success":
				await handleUnloadVideo();
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: { success: true },
				});
				break;
			case "failed":
				await handleUnloadVideo();
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: { success: false },
				});
				break;
			case "story_complete":
				await handleUnloadVideo();
				navigation.navigate(routes.home.STORY_FINISHED_SCREEN);
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
			<Loader visible={videoLoading} message="Setting up your dance session" />
			<ScreenContainer backgroundColor={COLORS.dark}>
				<Container>
					<PageHeaderSmall title={`${storyTitle} // CHAPTER 1`} />
					<FlexSpacer />
					<BottomSection>
						<StepMinuteContainer>
							<MessageText>{targetBodyMoves} MVTs</MessageText>
							<OneStarElement width={60} />
							<MessageText>
								{minutes} / {targetMinutes} mins
							</MessageText>
						</StepMinuteContainer>
						<StatusContainer>
							<InstructionTextWhite>Your body movements</InstructionTextWhite>
							<NumberText>{calculateActualSteps(count)}</NumberText>
						</StatusContainer>
						{/* <InstructionText>07:34 Minutes to go!</InstructionText> */}
						<Spacer />
						<QuitButton onPress={handleQuitPressed} />
						<Spacer />
					</BottomSection>
					<VideoContainer>
						<Video
							ref={videoRef}
							source={{ uri: videoUrl }}
							style={styles.video}
							resizeMode={Video.RESIZE_MODE_COVER}
							onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
							shouldPlay={true}
							isLooping={true}
							rate={2}
							onLoadStart={() => setVideoLoading(false)}
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
