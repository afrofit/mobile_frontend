import * as React from "react";
import styled from "styled-components/native";

import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import BackButton from "../../../components/buttons/BackButton";
import ChapterCard from "../../../components/cards/ChapterCard";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import StoryScreenHeader from "../../../components/headers/StoryScreenHeader";

import { COLORS } from "../../../theme/colors";
import { DEVICE_WIDTH } from "../../../theme/globals";
import {
	getCurrentStory,
	getCurrentStoryChapters,
	setCurrentChapter,
} from "../../../store/reducers/contentReducer";
import { storyChaptersFetch } from "../../../store/thunks/contentThunks";
import LoaderInView from "../../../components/LoaderInView";
import {
	getContentUpdated,
	setContentUpdated,
} from "../../../store/reducers/activityReducer";

const Container = styled.View`
	padding: 20px;
	padding-top: 0;
	width: ${DEVICE_WIDTH};
	flex: 1;
	align-items: center;
`;

const Scroller = styled.ScrollView`
	width: 100%;
`;

const StoryScreen = ({ navigation, route }) => {
	const { contentStoryId } = route.params;

	const dispatch = useDispatch();

	const currentStory = useSelector(getCurrentStory);
	const currentChapters = useSelector(getCurrentStoryChapters);
	const contentUpdated = useSelector(getContentUpdated);

	const getStoryChapters = React.useCallback(
		async (contentStoryId) => {
			dispatch(storyChaptersFetch(contentStoryId));
		},
		[contentStoryId]
	);

	/** Effects */

	useFocusEffect(
		React.useCallback(() => {
			getStoryChapters(contentStoryId);

			return () => {
				dispatch(setContentUpdated(false));
			};
		}, [])
	);

	React.useEffect(() => {
		console.log("-------x------$-----x-------");
		console.log(
			"Current Chapters",
			currentChapters
				? currentChapters.map((chapter) => {
						return {
							bodyMoves: chapter.bodyMoves,
							chapterOrderNumber: chapter.chapterOrder,
							completed: chapter.completed,
							started: chapter.started,
						};
				  })
				: "Nothing here"
		);
	}, [dispatch]);

	const handleGoToRoot = () => {
		navigation.navigate(routes.ROOT);
	};

	const handleGoToChapter = async (chapterId) => {
		dispatch(setCurrentChapter(chapterId));
		navigation.push(routes.home.CHAPTER, { contentStoryId, chapterId });
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
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
						{currentChapters ? (
							currentChapters.map((chapter) => {
								return (
									<ChapterCard
										key={chapter.contentChapterId}
										number={chapter.chapterOrder}
										onPress={() => handleGoToChapter(chapter.contentChapterId)}
										bodyMoves={chapter.bodyMoves}
										targetBodyMoves={chapter.targetBodyMoves}
										started={chapter.started}
										completed={chapter.completed}
										disabled={chapter.completed}
									/>
								);
							})
						) : (
							<LoaderInView messsage="Fetching story chapters." />
						)}
					</Scroller>
				</Container>
			)}
		</ScreenContainer>
	);
};

export default StoryScreen;
