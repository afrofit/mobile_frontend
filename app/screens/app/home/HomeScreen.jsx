import * as React from "react";
import { useSelector } from "react-redux";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import TrialStartModal from "../../../components/modals/TrialStartModal";
import StoryListSection from "../../../components/sections/home/StoryListSection";
import Font from "../../../elements/Font";
import { getTodaysActivity } from "../../../store/reducers/activityReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import { formatStatsNumbers } from "../../../utilities/formatters";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

const HomeScreen = ({ navigation }) => {
	// use Selectors to grab data from Redux Store
	const currentUser = useSelector(getCurrentUser);
	const todaysActivity = useSelector(getTodaysActivity);

	// Fetch relevant data from selectors
	const { username, isTrial, isPremium } = currentUser;
	const { caloriesBurned, bodyMovements } = todaysActivity;

	//useState for modals etc
	const [showTrialModal, setShowTrialModal] = React.useState(
		!isTrial && !isPremium
	);

	// Navigation logic
	const triggerNavigate = (story) => {
		// navigation.navigate(routes.home.STORY_INTRO, { data: story });
		navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
			data: { success: true },
		});
	};
	// console.log("Current User", currentUser);
	return (
		<>
			{/* <ConfirmModal
				onCancelClicked={() => console.log("cancel clicked!")}
				onConfirmClicked={() => console.log("confirm clicked")}
			/> */}
			{showTrialModal && (
				<TrialStartModal
					onCancelClicked={() => setShowTrialModal(!showTrialModal)}
				/>
			)}
			<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
				<ContentContainer>
					{/* <Spacer h="10px" /> */}
					<PageHeaderSmall title={`WELCOME ${"   "}//${"   "} ${username}`} />
					<HomeStatsCard
						calBurned={formatStatsNumbers(caloriesBurned)}
						bodyMoves={formatStatsNumbers(bodyMovements)}
					/>
					<StoryListSection triggerNavigate={triggerNavigate} />
				</ContentContainer>
			</ScreenContainer>
		</>
	);
};

export default HomeScreen;
