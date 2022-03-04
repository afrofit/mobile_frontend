import * as React from "react";
import * as Linking from "expo-linking";
import parseMillis from "parse-ms";
import styled from "styled-components/native";
import useAsyncEffect from "use-async-effect";

import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";
import useAudio from "../../../hooks/useAudio";

import { chapterDetailsFetch } from "../../../store/thunks/contentThunks";
import { COLORS } from "../../../theme/colors";
import {
	getCurrentStory,
	getCurrentStoryChapter,
} from "../../../store/reducers/contentReducer";
import { MIXCLOUD_URL } from "../../../config/config";
import Loader from "../../../components/Loader";

const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const PageSection = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const MidSection = styled(PageSection)`
	flex: 0.9;
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
	/* background-color: blue; */
`;

const BottomSection = styled(PageSection)`
	padding-top: 20px;
	padding-bottom: 20px;
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
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

const Touchable = styled.Pressable``;

const ChapterScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const { contentStoryId, chapterId } = route.params;

	const currentStory = useSelector(getCurrentStory);
	const currentChapter = useSelector(getCurrentStoryChapter);

	/** Effects */
	React.useEffect(() => {
		// console.log("Done!!!!!", currentChapter);
	}, [currentChapter]);

	useAsyncEffect(async () => {
		// console.log("Current Chapter", currentChapter);
		if (currentChapter) {
			await handlePlayback();
		}
	}, [currentChapter]);

	const { handleUnloadSound, handlePlayback } = useAudio(
		currentChapter.audioUrl
	);

	const { minutes } = parseMillis(currentChapter.targetTimeInMillis);

	const selectMusicMix = () => {
		Linking.openURL(MIXCLOUD_URL);
	};

	const minimizeApp = () => {
		if (Platform.OS === "ios") return Linking.openURL("music://");
	};

	const handleGoBack = async () => {
		await handleUnloadSound();
		navigation.goBack();
	};

	const handleStartDance = async () => {
		await handleUnloadSound();
		navigation.navigate(routes.home.DANCE, {
			storyTitle: currentStory.title,
			contentStoryId,
		});
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			{currentChapter && (
				<Container>
					<PageHeaderSmall
						title={`${currentStory.title} // CHAPTER ${currentChapter.chapterOrder}`}
					/>
					<MidSection>
						<ThreeStarsElement variant="gray" />
						<MessageText>{currentChapter.instruction}</MessageText>
						<MessageText>You've got {minutes} Minutes to finish!</MessageText>
						<MessageText>Ready?</MessageText>
						<ThreeStarsElement variant="gray" />
					</MidSection>
					<BottomSection>
						<Touchable onPress={selectMusicMix}>
							<InstructionText>Tap here to select music Mix</InstructionText>
						</Touchable>
						<Spacer />
						<Touchable onPress={minimizeApp}>
							<InstructionTextWhite>
								Or minimize this app and select your music from your device's
								music player
							</InstructionTextWhite>
						</Touchable>
					</BottomSection>
					<Spacer />
					<Button text="Dance now" onPress={handleStartDance} />
					<Spacer />
					<ClearButton text="Quit Activity" onPress={handleGoBack} />
				</Container>
			)}
		</ScreenContainer>
	);
};

export default ChapterScreen;
