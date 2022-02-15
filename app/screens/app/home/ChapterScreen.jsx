import * as React from "react";
import * as Linking from "expo-linking";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import useAsyncEffect from "use-async-effect";

import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import { MIXCLOUD_URL } from "../../../config/config";
import {
	getCurrentStory,
	getCurrentStoryChapter,
} from "../../../store/reducers/contentReducer";
import { calculateDanceDuration } from "../../../utilities/calculators";
import useAudio from "../../../hooks/useAudio";

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
	/* margin-top: 20%; */
	/* background-color: red; */
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

const ChapterScreen = ({ navigation }) => {
	const currentStory = useSelector(getCurrentStory);
	const currentChapter = useSelector(getCurrentStoryChapter);

	const { handleUnloadSound, handlePlayback } = useAudio(
		currentChapter.audioUrl
	);

	useAsyncEffect(async () => {
		console.log("CurrentChapter", currentChapter);
		console.log("Current Story", currentStory);

		if (currentChapter) {
			await handlePlayback();
		}
	}, []);

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
		});
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			<Container>
				<PageHeaderSmall
					title={`${currentStory.title} // CHAPTER ${currentChapter.chapterOrder}`}
				/>
				<MidSection>
					<ThreeStarsElement variant="gray" />
					<MessageText>{currentChapter.instruction}</MessageText>
					<MessageText>
						You've got{" "}
						{calculateDanceDuration(currentChapter.targetBodyMoves, "minutes")}{" "}
						Minutes to finish!
					</MessageText>
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
		</ScreenContainer>
	);
};

export default ChapterScreen;
