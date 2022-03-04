import * as React from "react";
import styled from "styled-components/native";
// import { stories } from "../../../data/story-data";
import Font from "../../../elements/Font";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import Spacer from "../../../utilities/Spacer";
import StoryCard from "../../cards/StoryCard";

const Scroller = styled.ScrollView`
	max-height: 100%;
`;

const Container = styled.View`
	width: 95%;
	flex: 1;
`;

const StoryListSection = ({ triggerNavigate, stories }) => {
	const renderStories = () => {
		if (stories && stories.length) {
			return stories.map((story) => {
				return (
					<StoryCard
						key={story.contentStoryId}
						source={story.thumb}
						storyTitle={story.title}
						onPress={() => triggerNavigate(story.contentStoryId)}
						completed={story.completed}
						started={story.started}
						totalTargetBodyMoves={story.totalTargetBodyMoves}
						totalBodyMoves={story.totalBodyMoves}
					/>
				);
			});
		} else {
			return (
				<Font variant="paragraph" color={COLORS.grayDark}>
					There are no stories available to play.
				</Font>
			);
		}
	};

	return (
		<>
			{stories.length ? (
				<Font variant="small-caps" color={COLORS.grayDarker}>
					Stories You can play
				</Font>
			) : null}
			<Spacer />
			<Container>
				<Scroller showsVerticalScrollIndicator={false}>
					{renderStories()}
				</Scroller>
			</Container>
		</>
	);
};

export default StoryListSection;
