import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import StoryListSection from "../../../components/sections/home/StoryListSection";
import TrialStartModal from "../../../components/modals/TrialStartModal";
import { useFocusEffect } from "@react-navigation/native";

import { ContentContainer } from "../../../components/ContentContainer";
import { COLORS } from "../../../theme/colors";
import { formatStatsNumbers } from "../../../utilities/formatters";
import {
	getContentUpdated,
	getDailyActivity,
	setContentUpdated,
} from "../../../store/reducers/activityReducer";
import { getCurrentUserSubscription } from "../../../store/reducers/subscriptionReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";
import { storiesFetchAll } from "../../../store/thunks/contentThunks";
import { getAllStories } from "../../../store/reducers/contentReducer";
import {
	createSubscription,
	requestCurrentUserSubscription,
} from "../../../store/thunks/subscriptionThunks";
import { fetchUserDailyActivity } from "../../../store/thunks/activityThunks";
import useCreateDialog from "../../../hooks/useCreateDialog";
import ConfirmDialog from "../../../components/modals/ConfirmDialog";
import Button from "../../../components/buttons/Button";
import { initializeUserMarathonScore } from "../../../store/thunks/marathonThunks";

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	/** Selectors */

	const currentUser = useSelector(getCurrentUser);
	const currentSubscription = useSelector(getCurrentUserSubscription);
	const todaysActivity = useSelector(getDailyActivity);
	const allStories = useSelector(getAllStories);
	const contentUpdated = useSelector(getContentUpdated);

	/** Fetch relevant data from selectors */

	const { username, hasTrial } = currentUser;
	const { caloriesBurned, bodyMoves } = todaysActivity;

	const [showTrialModal, setShowTrialModal] = React.useState(false);

	const [showChooseSubscriptionModal, setShowChooseSubscriptionModal] =
		React.useState(false);

	const [showConfirmModal, setShowConfirmModal] = React.useState({
		show: false,
		message: "",
		confirmText: "Yes, Subscribe Me",
		cancelText: "Maybe later",
		value: "",
	});

	/** Effects */

	const getData = () => {
		dispatch(fetchUserDailyActivity());
		dispatch(requestCurrentUserSubscription());
		dispatch(storiesFetchAll());
		dispatch(initializeUserMarathonScore());
	};

	useFocusEffect(
		React.useCallback(() => {
			getData();

			return () => {
				dispatch(setContentUpdated(false));
			};
		}, [])
	);

	React.useEffect(() => {
		// console.log("Stories", allStories);
	}, [dispatch]);

	/** General functions */

	// Might have to do away with this logic fetch subscription from server direct
	const checkSubscriptionStatus = (contentStoryId) => {
		if (currentSubscription.isExpired)
			return setShowChooseSubscriptionModal(!showChooseSubscriptionModal);
		return triggerNavigate(contentStoryId);
	};

	/** Navigation logic */

	const triggerNavigate = (contentStoryId) => {
		navigation.navigate(routes.home.STORY_INTRO, { contentStoryId });
	};

	/** Create Subscription Flow */

	const handleCreateSubscription = async (value) => {
		switch (value) {
			case "trial":
				setShowConfirmModal({
					...showConfirmModal,
					show: true,
					value,
					message:
						"Start with a 7-day free trial. If you don't cancel you carry on a monthly subscription.",
				});
				break;
			case "monthly":
				setShowConfirmModal({
					...showConfirmModal,
					show: true,
					value,
					message:
						"This will subscribe you for £2.99 every monthly, paid yearly",
				});
				break;
			case "half-yearly":
				setShowConfirmModal({
					...showConfirmModal,
					show: true,
					value,
					message:
						"This will subscribe you for £7.99 for (6) six months. This saves you £15",
				});
				break;
			case "yearly":
				setShowConfirmModal({
					...showConfirmModal,
					show: true,
					value,
					message:
						"This will subscribe you for £14.99 for twelve (12) months. Saving you £15.",
				});
				break;
			default:
				return;
		}
		return setShowChooseSubscriptionModal(!showChooseSubscriptionModal);
	};

	const triggerCreateSubscription = async (value) => {
		dispatch(createSubscription(value));
		setShowConfirmModal(!showConfirmModal);
		return setShowChooseSubscriptionModal(false);
	};

	return (
		<>
			{showConfirmModal.show && (
				<ConfirmModal
					onCancelClicked={() => {
						setShowChooseSubscriptionModal(!showChooseSubscriptionModal);
						return setShowConfirmModal(!showConfirmModal);
					}}
					onConfirmClicked={() =>
						triggerCreateSubscription(showConfirmModal.value)
					}
					confirmText="Yes, Susbcribe me"
					cancelText="Maybe Later"
					message={showConfirmModal.message}
				/>
			)}
			{showChooseSubscriptionModal && (
				<ChooseSubscriptionTypeModal
					onCancelClicked={() =>
						setShowChooseSubscriptionModal(!showChooseSubscriptionModal)
					}
					handleCreateSubscription={handleCreateSubscription}
				/>
			)}
			{showTrialModal && (
				<TrialStartModal
					onCancelClicked={() => setShowTrialModal(!showTrialModal)}
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
