import * as React from "react";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import StoryListSection from "../../../components/sections/home/StoryListSection";
import Font from "../../../elements/Font";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";

const HomeScreen = ({ navigation }) => {
	const triggerNavigate = (story) => {
		// navigation.navigate(routes.home.STORY_INTRO, { data: story });
		navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
			data: { success: true },
		});
	};
	return (
		<>
			{/* <ConfirmModal
				onCancelClicked={() => console.log("cancel clicked!")}
				onConfirmClicked={() => console.log("confirm clicked")}
			/> */}
			<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
				<ContentContainer>
					<PageHeaderSmall />
					<HomeStatsCard />
					<StoryListSection triggerNavigate={triggerNavigate} />
				</ContentContainer>
			</ScreenContainer>
		</>
	);
};

export default HomeScreen;
