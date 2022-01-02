import * as React from "react";
import styled from "styled-components/native";
import { stories } from "../../../data/story-data";
import Font from "../../../elements/Font";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import Spacer from "../../../utilities/Spacer";
import StoryCard from "../../cards/StoryCard";

const Scroller = styled.ScrollView`
	max-height: 100%;
`;

const Container = styled.View`
	/* background-color: red; */
	width: 95%;
	flex: 1;
`;

const StoryListSection = ({ triggerNavigate }) => {
	return (
		<>
			<Font variant="small-caps" color={COLORS.grayDarker}>
				Stories You can play
			</Font>
			<Spacer />
			<Container>
				<Scroller showsVerticalScrollIndicator={false}>
					{stories.map((story) => {
						return (
							<StoryCard
								key={story.id}
								source={story.image}
								storyTitle={story.title}
								storyStatus="30"
								onPress={() => triggerNavigate(story)}
							/>
						);
					})}
				</Scroller>
			</Container>
		</>
	);
};

export default StoryListSection;
