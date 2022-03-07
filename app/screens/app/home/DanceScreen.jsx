import * as React from "react";
import parseMillis from "parse-ms";
import styled from "styled-components/native";
import useAsyncEffect from "use-async-effect";

import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Video } from "expo-av";

import ConfirmModal from "../../../components/modals/ConfirmModal";
import Loader from "../../../components/Loader";
import OneStarElement from "../../../elements/OneStarElement";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import QuitButton from "../../../components/buttons/QuitButton";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import useAudioAnnouncer from "../../../hooks/useAudioAnnouncer";
import useBodyMovements from "../../../hooks/useBodyMovements";
import useDisableHardwareBack from "../../../hooks/useDisableHardwareBack";
import useInterval from "../../../hooks/useInteval";
import useVideo from "../../../hooks/useVideo";
import VideoContainer from "../../../utilities/VideoContainer";

import { ANNOUNCEMENT_TYPE_DATA } from "../../../data/announcement-data";
import { COLORS } from "../../../theme/colors";
import { BORDER_RADIUS_BIG } from "../../../theme/globals";
import {
	getCurrentStory,
	getCurrentStoryChapter,
	getCurrentStoryChapters,
} from "../../../store/reducers/contentReducer";
import {
	calculateActualSteps,
	calculateCaloriesBurned,
	calculateTargetTime,
} from "../../../utilities/calculators";
import {
	storeUserContentActivityData,
	storeUserDailyActivityData,
	storeUserPerformanceData,
} from "../../../store/thunks/activityThunks";
import { saveUserMarathonData } from "../../../store/thunks/marathonThunks";
import { getUserMarathonScore } from "../../../store/reducers/marathonReducer";

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
	const currentChapters = useSelector(getCurrentStoryChapters);
	const currentStory = useSelector(getCurrentStory);
	const userMarathonScore = useSelector(getUserMarathonScore);

	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [videoStatus, setVideoStatus] = React.useState();
	const [videoLoading, setVideoLoading] = React.useState(true);
	const [existingCount, setExistentCount] = React.useState(null);
	const [sessionCount, setSessionCount] = React.useState(null);
	const [delay, setDelay] = React.useState(1000);
	const [existingTimeDanced, setExistentTimeDanced] = React.useState(
		timeSpentInMillis || 0
	);
	const [sessionTimeDanced, setSessionTimeDanced] = React.useState(0);

	const [sessionOn, setSessionOn] = React.useState(true);

	const videoRef = React.useRef(null);

	const { handleUnloadVideo, handlePlayVideoPlayback } = useVideo(
		videoRef,
		videoStatus
	);

	const {
		timeSpentInMillis,
		targetTimeInMillis,
		targetBodyMoves,
		videoUrl,
		chapterOrder,
		contentStoryId,
		contentChapterId,
	} = currentChapter;

	const { bodyMovementCount, setBodyMovementCount, startMoving, stopMoving } =
		useBodyMovements();

	const { handleAnnouncement } = useAudioAnnouncer();

	// const REAL_STEP_COUNT = calculateActualSteps(existingCount);
	const REAL_STEP_COUNT = existingCount + sessionCount;
	const REAL_TIME_DANCED = existingTimeDanced + sessionTimeDanced;

	const {
		hours: targetHours,
		minutes: targetMinutes,
		seconds: targetSeconds,
	} = parseMillis(calculateTargetTime(targetBodyMoves));

	const {
		hours: dancedHours,
		minutes: dancedMinutes,
		seconds: dancedSeconds,
	} = parseMillis(REAL_TIME_DANCED);

	useInterval(() => {
		setSessionCount(sessionCount + 1);
	}, delay);

	useInterval(() => {
		setSessionTimeDanced(sessionTimeDanced + 1000);
	}, delay);

	/**  Disable Back Button */
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/** Effects */

	React.useEffect(() => {
		setExistentCount(currentChapter.bodyMoves);
		// setExistentTimeDanced(timeSpentInMillis);
		if (currentChapter.bodyMoves === targetBodyMoves * 0.75) {
			setExistentTimeDanced(targetTimeInMillis * 0.75);
		}
		if (currentChapter.bodyMoves === targetBodyMoves * 0.5) {
			setExistentTimeDanced(targetTimeInMillis * 0.5);
		}
	}, [dispatch]);

	React.useEffect(() => {
		if (REAL_TIME_DANCED < targetTimeInMillis) return setSessionOn(true);
		else if (REAL_TIME_DANCED === targetTimeInMillis) {
			setSessionOn(false);
			return handleSaveActivity(false, false, chapterOrder, true);
		}
	}, [REAL_TIME_DANCED]);

	useAsyncEffect(async () => {
		if (sessionOn) {
			if (REAL_STEP_COUNT < targetBodyMoves) {
				//Session is still on
			} else if (REAL_STEP_COUNT === targetBodyMoves) {
				console.log("You've successfully finished");
				setSessionOn(false);
				setDelay(null);

				if (chapterOrder < currentChapters.length) {
					await handleSaveActivity(true);
					return handleUserResults("success");
				} else if (chapterOrder === currentChapters.length) {
					await handleSaveActivity(true, true);
					return handleUserResults("story_complete");
				}
			}
		}
	}, [REAL_STEP_COUNT, sessionOn]);

	useAsyncEffect(async () => {
		if (REAL_STEP_COUNT === 50) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_50);
		}
		if (REAL_STEP_COUNT === 100) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_100);
		}
		if (REAL_STEP_COUNT === 200) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_200);
		}
		if (REAL_STEP_COUNT === targetBodyMoves - 200) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_200);
		}
		if (REAL_STEP_COUNT === targetBodyMoves - 100) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_100);
		}
		if (REAL_STEP_COUNT === targetBodyMoves - 50) {
			await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.TOGO_50);
		}

		if (targetBodyMoves > 1200 && targetBodyMoves < 1500) {
			if (REAL_STEP_COUNT === 500) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_200);
			}
		}
		if (targetBodyMoves > 1501 && targetBodyMoves < 2300) {
			if (REAL_STEP_COUNT === 500) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_500);
			}
			if (REAL_STEP_COUNT === 1000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_1000);
			}
		}
		if (targetBodyMoves > 2301 && targetBodyMoves < 2500) {
			if (REAL_STEP_COUNT === 1000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_1000);
			}
			if (REAL_STEP_COUNT === 2000) {
				await handleAnnouncement(ANNOUNCEMENT_TYPE_DATA.DONE_2000);
			}
		}
	}, [REAL_STEP_COUNT]);

	React.useEffect(() => {
		startMoving();
		return () => {
			stopMoving();
		};
	}, []);

	const handleSaveActivity = async (
		chapterCompleted = false,
		storyCompleted = false,
		chapterOrderNumber = chapterOrder,
		premature = false
	) => {
		const CALORIES_BURNED = calculateCaloriesBurned(sessionCount);

		let ADJUSTED_SESSION_COUNT = sessionCount;
		let ADJUSTED_TIME_DANCED = sessionTimeDanced;

		if (premature) {
			const totalCount = sessionCount + existingCount;
			if (
				totalCount >= targetBodyMoves * 0.5 &&
				totalCount < targetBodyMoves * 0.75
			) {
				if (existingCount < targetBodyMoves * 0.5) {
					ADJUSTED_SESSION_COUNT = targetBodyMoves * 0.5 - existingCount;
					ADJUSTED_TIME_DANCED = targetTimeInMillis * 0.5 - existingTimeDanced;
				}
				if (existingCount >= targetBodyMoves * 0.5) {
					ADJUSTED_SESSION_COUNT = existingCount - targetBodyMoves * 0.5;
					ADJUSTED_TIME_DANCED = existingTimeDanced - targetTimeInMillis * 0.5;
				}
			} else if (
				totalCount >= targetBodyMoves * 0.75 &&
				totalCount < targetBodyMoves
			) {
				if (existingCount < targetBodyMoves * 0.75) {
					ADJUSTED_SESSION_COUNT = targetBodyMoves * 0.75 - existingCount;
					ADJUSTED_TIME_DANCED = targetTimeInMillis * 0.75 - existingTimeDanced;
				}
				if (existingCount >= targetBodyMoves * 0.75) {
					ADJUSTED_SESSION_COUNT = existingCount - targetBodyMoves * 0.75;
					ADJUSTED_TIME_DANCED = existingTimeDanced - targetTimeInMillis * 0.75;
				}
			} else if (totalCount >= 0 && totalCount < targetBodyMoves * 0.5) {
				ADJUSTED_SESSION_COUNT = sessionCount;
				ADJUSTED_TIME_DANCED = sessionTimeDanced;
			}
		}

		const payload = {
			bodyMoves: premature ? ADJUSTED_SESSION_COUNT : sessionCount,
			timeDancedSession: premature ? ADJUSTED_TIME_DANCED : sessionTimeDanced,
			caloriesBurned: CALORIES_BURNED,
			contentStoryId: currentChapter.contentStoryId,
			contentChapterId: currentChapter.contentChapterId,
			storyStarted: true,
			storyCompleted,
			chapterStarted: true,
			chapterCompleted,
			chapterOrderNumber,
		};

		dispatch(
			storeUserDailyActivityData({
				caloriesBurned: payload.caloriesBurned,
				bodyMoves: payload.bodyMoves,
			})
		);
		dispatch(
			storeUserPerformanceData({
				caloriesBurned: payload.caloriesBurned,
				bodyMoves: payload.bodyMoves,
				totalTimeDancedInMilliseconds: payload.timeDancedSession,
			})
		);
		dispatch(
			storeUserContentActivityData({
				caloriesBurned: payload.caloriesBurned,
				bodyMoves: payload.bodyMoves,
				totalTimeDancedInMilliseconds: payload.timeDancedSession,
				chapterStarted: payload.chapterStarted,
				chapterCompleted: payload.chapterCompleted,
				storyCompleted: payload.storyCompleted,
				storyStarted: payload.storyStarted,
				contentChapterId: payload.contentChapterId,
				contentStoryId: payload.contentStoryId,
				chapterOrderNumber: payload.chapterOrderNumber,
			})
		);
		dispatch(
			saveUserMarathonData({
				userMarathonScoreId: userMarathonScore.id,
				bodyMoves: payload.bodyMoves,
			})
		);

		return;
	};

	const _onPlaybackStatusUpdate = async (status) => {
		// If status.didJustFinish, do something...
		setVideoStatus(status);
	};

	const handleLoadVideo = () => {
		setVideoLoading(false);
		setSessionOn(true);
	};

	/** Handlers for Confirm Modal */
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

	/** Actual Action Handlers */
	const handleQuitDance = async () => {
		await handleUnloadVideo();
		setShowConfirmModal(false);
		await handleSaveActivity(false, false, chapterOrder, true);
		return navigation.navigate(routes.home.STORY, { contentStoryId });
	};

	const handleUserResults = async (status) => {
		await handleUnloadVideo();
		setDelay(null);
		switch (status) {
			case "success":
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: {
						success: true,
						message:
							"You've successfully finished this chapter! Let's do another!",
						videoUrl: currentStory.successVideo,
						contentStoryId,
					},
				});
				break;
			case "failed":
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: {
						success: false,
						message: "Awwww... you didn't get it this time. try again?",
						videoUrl: currentStory.failVideo,
						contentStoryId,
					},
				});
				break;
			case "story_complete":
				navigation.navigate(routes.home.STORY_FINISHED_SCREEN, {
					data: {
						message: currentStory.storySuccessText,
						videoUrl: currentStory.storyFinishVideo,
						contentStoryId,
					},
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
								{dancedMinutes} / {targetMinutes} mins
							</MessageText>
						</StepMinuteContainer>
						<StatusContainer>
							<InstructionTextWhite>Your body movements</InstructionTextWhite>
							{/* <NumberText>{calculateActualSteps(existingCount)}</NumberText> */}
							<NumberText>{REAL_STEP_COUNT}</NumberText>
						</StatusContainer>
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
							rate={1}
							onLoadStart={handleLoadVideo}
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
