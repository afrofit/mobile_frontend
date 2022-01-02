import * as React from "react";
import styled from "styled-components/native";
import BackButton from "../../../components/buttons/BackButton";
import Button from "../../../components/buttons/Button";
import CancelButton from "../../../components/buttons/CancelButton";
import ChapterCard from "../../../components/cards/ChapterCard";
import StoryScreenHeader from "../../../components/headers/StoryScreenHeader";
import { ImageBackground } from "../../../components/ImageBackground";
import Font from "../../../elements/Font";

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
	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			{/* <CancelButton onPress={() => console.log("Cancel Pressed!")} /> */}
			<Container>
				<StoryScreenHeader>
					<BackButton
						left={20}
						top={20}
						onPress={() => navigation.navigate(routes.ROOT)}
					/>
				</StoryScreenHeader>
				<Scroller showsVerticalScrollIndicator={false}>
					<ChapterCard
						status="fresh"
						onPress={() => navigation.navigate(routes.home.CHAPTER)}
					/>
					<ChapterCard status="dirty" />
					<ChapterCard status="finished" />
				</Scroller>
			</Container>
		</ScreenContainer>
	);
};

export default StoryScreen;
