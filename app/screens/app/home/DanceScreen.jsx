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
import { saveUserActivityData } from "../../../store/reducers/activityReducer";
import useAudioAnnouncer from "../../../hooks/useAudioAnnouncer";
import useInterval from "../../../hooks/useInteval";
import Loader from "../../../components/Loader";
import {
	getCurrentStory,
	getCurrentStoryChapter,
	getCurrentStoryChapters,
} from "../../../store/reducers/contentReducer";
import {
	calculateActualSteps,
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
	const currentChapters = useSelector(getCurrentStoryChapters);
	const currentStory = useSelector(getCurrentStory);

	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [videoStatus, setVideoStatus] = React.useState();
	const [videoLoading, setVideoLoading] = React.useState(true);
	const [count, setCount] = React.useState(currentChapter.bodyMoves);
	const [delay, setDelay] = React.useState(1000);
	const [timeDanced, setTimeDanced] = React.useState(timeSpentInMillis || 0);

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

	const CAL_BURN_RATE_PER_MOVE = 0.00175;
	const REAL_STEP_COUNT = calculateActualSteps(count);

	const {
		hours: targetHours,
		minutes: targetMinutes,
		seconds: targetSeconds,
	} = parseMillis(calculateTargetTime(targetBodyMoves));
	const { hours, minutes, seconds } = parseMillis(timeDanced);

	useInterval(() => {
		setCount(count + 3); // change back to 1
	}, delay);

	useInterval(() => {
		setTimeDanced(timeDanced + 1000);
	}, delay);

	/**  Disable Back Button */
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	/** Effects */

	React.useEffect(() => {
		// console.log("Current Story", currentStory);
		console.log("Current Chapter", currentChapter);
		if (timeDanced < targetTimeInMillis) return setSessionOn(true);
		else if (timeDanced === targetTimeInMillis) return setSessionOn(false);
	}, [timeDanced]);

	useAsyncEffect(async () => {
		if (sessionOn) {
			if (REAL_STEP_COUNT < targetBodyMoves) {
				//Session is still on
			} else if (REAL_STEP_COUNT === targetBodyMoves) {
				console.log("You've successfully finished");
				setSessionOn(false);
				setDelay(null);

				if (chapterOrder < currentChapters.length) {
					await handleSaveActivity();
					return handleUserResults("success");
				} else if (chapterOrder === currentChapters.length) {
					await handleSaveActivity();
					return handleUserResults("story_complete");
				}
			}
		}
	}, [timeDanced, sessionOn]);

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

	const checkUserPerformance = async () => {
		if (
			timeDanced >= targetTimeInMillis / 4 &&
			timeDanced <= targetTimeInMillis / 2
		) {
			//Has the user gone past 25%?
			const payload = {
				bodyMoves: count,
				chapterStarted: true,
				totalTimeDancedInMilliseconds: timeDanced,
				chapterCompleted: false,
				caloriesBurned: CAL_BURN_RATE_PER_MOVE * count,
				contentStoryId: contentStoryId,
				contentChapterId: contentChapterId,
			};
			return handleSaveActivity(payload);
		} else if (
			timeDanced > targetTimeInMillis / 2 &&
			timeDanced <= targetTimeInMillis * 0.75
		) {
			//Has the user gone past 50%?
			const payload = {};
			return handleSaveActivity(payload);
		} else if (
			timeDanced > targetTimeInMillis * 0.75 &&
			timeDanced <= targetTimeInMillis
		) {
			//Has the user gone past 75%
			const payload = {};
			return handleSaveActivity(payload);
		}
	};

	const handleSaveActivity = async (
		chapterCompleted = false,
		storyCompleted = false
	) => {
		const payload = {
			bodyMoves: REAL_STEP_COUNT,
			totalTimeDancedInMilliseconds: timeDanced,
			caloriesBurned: CAL_BURN_RATE_PER_MOVE * REAL_STEP_COUNT,
			contentStoryId: currentChapter.contentStoryId,
			contentChapterId: currentChapter.contentChapterId,
			storyStarted: true,
			storyCompleted,
			chapterStarted: true,
			chapterCompleted,
		};
		// we should update current chapter locally as well
		// dispatch(updateUserDailyActivity(activityPayload));
		dispatch(saveUserActivityData(payload));

		return;
	};

	/** End Save User Activity to Store && DB */

	/**Video monitoring functions */
	const _onPlaybackStatusUpdate = async (status) => {
		// If status.didJustFinish, do something...
		setVideoStatus(status);
	};

	const handleLoadVideo = () => {
		setVideoLoading(false);
		setSessionOn(true);
	};

	/**Handlers for Confirm Modal */
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

	/**Actual Action Handlers */
	const handleQuitDance = async () => {
		await handleUnloadVideo();
		setShowConfirmModal(false);
		await handleSaveActivity();
		return navigation.navigate(routes.home.STORY);
	};

	const handleUserResults = async (status) => {
		switch (status) {
			case "success":
				await handleUnloadVideo();
				setDelay(null);
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: {
						success: true,
						message:
							"You've successfully finished this chapter! Let's do another!",
						videoUrl: currentStory.failVideo,
					},
				});
				break;
			case "failed":
				await handleUnloadVideo();
				setDelay(null);
				navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
					data: {
						success: false,
						message: "Awwww... you didn't get it this time. try again?",
						videoUrl: currentStory.successVideo,
					},
				});
				break;
			case "story_complete":
				await handleUnloadVideo();
				setDelay(null);
				navigation.navigate(routes.home.STORY_FINISHED_SCREEN, {
					data: {
						message: "chapterSuccessTextGoesHereFromBE",
						videoUrl: currentStory.storyFinishVideo,
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
