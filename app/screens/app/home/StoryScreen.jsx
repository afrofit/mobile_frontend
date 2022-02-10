import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import BackButton from "../../../components/buttons/BackButton";
import Button from "../../../components/buttons/Button";
import CancelButton from "../../../components/buttons/CancelButton";
import ChapterCard from "../../../components/cards/ChapterCard";
import StoryScreenHeader from "../../../components/headers/StoryScreenHeader";
import { ImageBackground } from "../../../components/ImageBackground";
import Font from "../../../elements/Font";
import { getCurrentStory } from "../../../store/reducers/contentReducer";

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
	const currentStory = useSelector(getCurrentStory);

	const handleGoToRoot = () => {
		navigation.navigate(routes.ROOT);
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
						{currentStory.chapters &&
							currentStory.chapters.map((chapter, index) => (
								<ChapterCard
									key={chapter._key}
									status="fresh"
									number={index + 1}
									onPress={() => navigation.navigate(routes.home.CHAPTER)}
								/>
							))}
						{/* <ChapterCard status="dirty" />
						<ChapterCard status="finished" /> */}
					</Scroller>
				</Container>
			)}
		</ScreenContainer>
	);
};

export default StoryScreen;
