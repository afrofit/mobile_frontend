import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import BackButton from "../../../components/buttons/BackButton";
import Button from "../../../components/buttons/Button";
import CancelButton from "../../../components/buttons/CancelButton";
import ChapterCard from "../../../components/cards/ChapterCard";
import StoryScreenHeader from "../../../components/headers/StoryScreenHeader";
import { ImageBackground } from "../../../components/ImageBackground";
import Font from "../../../elements/Font";
import {
	getCurrentStory,
	getCurrentStoryChapters,
	setCurrentChapter,
} from "../../../store/reducers/contentReducer";

import { COLORS } from "../../../theme/colors";
import { DEVICE_WIDTH } from "../../../theme/globals";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";

const Container = styled.View`
	/* height: 100%; */
	padding: 20px;
	padding-top: 0;
	width: ${DEVICE_WIDTH};
	flex: 1;
	align-items: center;
`;

const Scroller = styled.ScrollView`
	width: 100%;
`;

const StoryScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const currentStory = useSelector(getCurrentStory);
	const currentChapters = useSelector(getCurrentStoryChapters);

	React.useEffect(() => {
		console.log("Current Chapters", currentChapters);
	}, []);

	const handleGoToRoot = () => {
		navigation.navigate(routes.ROOT);
	};

	const handleGoToChapter = (chapterId) => {
		dispatch(setCurrentChapter(chapterId));
		navigation.navigate(routes.home.CHAPTER);
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			{/* <CancelButton onPress={() => console.log("Cancel Pressed!")} /> */}
			{currentStory && (
				<Container>
					<StoryScreenHeader
						imageUrl={currentStory.thumb}
						title={currentStory.title}
						completion={0}
					>
						<BackButton left={20} top={20} onPress={handleGoToRoot} />
					</StoryScreenHeader>
					<Scroller showsVerticalScrollIndicator={false}>
						{currentChapters &&
							currentChapters.map((chapter) => {
								const status =
									chapter.timeSpentInMills <= 0 ? "fresh" : "dirty";
								return (
									<ChapterCard
										key={chapter.contentChapterId}
										status={status}
										number={chapter.chapterOrder}
										onPress={() => handleGoToChapter(chapter.contentChapterId)}
										completed={chapter.completed}
										bodyMoves={chapter.bodyMoves}
										timeSpentInMillis={chapter.timeSpentInMillis}
										targetBodyMoves={chapter.targetBodyMoves}
									/>
								);
							})}
					</Scroller>
				</Container>
			)}
		</ScreenContainer>
	);
};

export default StoryScreen;
