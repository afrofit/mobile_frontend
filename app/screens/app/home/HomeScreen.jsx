import * as React from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import StoryListSection from "../../../components/sections/home/StoryListSection";

import { ContentContainer } from "../../../components/ContentContainer";
import { COLORS } from "../../../theme/colors";
import { formatStatsNumbers } from "../../../utilities/formatters";
import {
	getContentUpdated,
	getDailyActivity,
	setContentUpdated,
} from "../../../store/reducers/activityReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";
import { storiesFetchAll } from "../../../store/thunks/contentThunks";
import { getAllStories } from "../../../store/reducers/contentReducer";
import {
	createSubscription,
	requestCurrentUserSubscription,
} from "../../../store/thunks/subscriptionThunks";
import { fetchUserDailyActivity } from "../../../store/thunks/activityThunks";
import { initializeUserMarathonScore } from "../../../store/thunks/marathonThunks";
import {
	selectShowSubscribeDialog,
	setShowSubscribeDialog,
} from "../../../store/reducers/uiReducer";
import Purchases from "react-native-purchases";

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	/** Selectors */

	const currentUser = useSelector(getCurrentUser);
	const todaysActivity = useSelector(getDailyActivity);
	const allStories = useSelector(getAllStories);
	const contentUpdated = useSelector(getContentUpdated);
	const showSubscribeDialog = useSelector(selectShowSubscribeDialog);

	/** Fetch relevant data from selectors */

	const { username } = currentUser;
	const { caloriesBurned, bodyMoves } = todaysActivity;

	/** Effects */

	const getData = () => {
		dispatch(fetchUserDailyActivity());
		dispatch(storiesFetchAll());
		dispatch(initializeUserMarathonScore());
	};

	const restoreSubscription = async () => {
		const result = await Purchases.restoreTransactions();
		console.log(result);
	};

	useFocusEffect(
		React.useCallback(() => {
			getData();
			restoreSubscription();

			return () => {
				dispatch(setContentUpdated(false));
			};
		}, [])
	);

	/** General functions */

	// Might have to do away with this logic fetch subscription from server direct
	const checkSubscriptionStatus = async (contentStoryId) => {
		try {
			const purchaserInfo = await Purchases.getPurchaserInfo();
			console.log("PurchaseInfo", purchaserInfo);
			if (typeof purchaserInfo.entitlements.active.premium !== "undefined") {
				return triggerNavigate(contentStoryId);
			} else {
				dispatch(setShowSubscribeDialog(true));
			}
		} catch (error) {
			console.error(error);
		}
	};

	/** Navigation logic */

	const triggerNavigate = (contentStoryId) => {
		navigation.navigate(routes.home.STORY_INTRO, { contentStoryId });
	};

	/** Create Subscription Flow */

	const triggerCreateSubscription = async (pack) => {
		dispatch(createSubscription(pack));
		return dispatch(setShowSubscribeDialog(false));
	};

	return (
		<>
			{showSubscribeDialog && (
				<ChooseSubscriptionTypeModal
					onCancel={() => dispatch(setShowSubscribeDialog(false))}
					handleCreateSubscription={triggerCreateSubscription}
				/>
			)}

			<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
				<ContentContainer>
					<PageHeaderSmall title={`WELCOME ${"   "}//${"   "} ${username}`} />
					<HomeStatsCard
						calBurned={formatStatsNumbers(caloriesBurned)}
						bodyMovements={formatStatsNumbers(bodyMoves, true)}
					/>
					{allStories && allStories.length && (
						<StoryListSection
							stories={allStories}
							triggerNavigate={checkSubscriptionStatus}
						/>
					)}
				</ContentContainer>
			</ScreenContainer>
		</>
	);
};

export default HomeScreen;
