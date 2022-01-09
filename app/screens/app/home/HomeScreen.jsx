import * as React from "react";
import { useSelector } from "react-redux";
import subscriptionApi from "../../../api/subscription/subscriptionApi";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import TrialStartModal from "../../../components/modals/TrialStartModal";
import StoryListSection from "../../../components/sections/home/StoryListSection";
import Font from "../../../elements/Font";
import useSubscription from "../../../hooks/useSubscription";
import { getTodaysActivity } from "../../../store/reducers/activityReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import { formatStatsNumbers } from "../../../utilities/formatters";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

const HomeScreen = ({ navigation }) => {
	/*
	 * use Selectors to grab data from Redux Store
	 */

	const currentUser = useSelector(getCurrentUser);
	const todaysActivity = useSelector(getTodaysActivity);

	/*
	 * Fetch relevant data from selectors
	 */

	const { username, isTrial, isPremium, hasTrial } = currentUser;
	const { caloriesBurned, bodyMovements } = todaysActivity;

	/*
	 *useState for errors, modals etc
	 */

	const [error, setError] = React.useState();

	const [showTrialModal, setShowTrialModal] = React.useState(
		!isTrial && !isPremium && hasTrial
	);

	/*
	 *Create Subscription API flow here
	 */

	const { createSubscription, updateSubscribedUser } = useSubscription();
	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);

	const [showChooseSubscriptionModal, setShowChooseSubscriptionModal] =
		React.useState(!hasTrial && !isTrial && !isPremium);

	const [showConfirmModal, setShowConfirmModal] = React.useState({
		show: false,
		message: "",
		confirmText: "Yes, Subscribe Me",
		cancelText: "Maybe later",
		value: "",
	});

	/*
	 *  Navigation logic
	 */

	const triggerNavigate = (story) => {
		// navigation.navigate(routes.home.STORY_INTRO, { data: story });
		navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
			data: { success: true },
		});
	};

	/*
	 *Create Subscription Flow
	 */

	const handleCreateSubscription = async (value) => {
		switch (value) {
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
		console.log("Value", value);
		const result = await createSubscriptionApi.request(value);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		updateSubscribedUser(result.data.token);
		createSubscription(result.data.response);

		setShowConfirmModal(!showConfirmModal);
		return setShowChooseSubscriptionModal(!showChooseSubscriptionModal);
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
