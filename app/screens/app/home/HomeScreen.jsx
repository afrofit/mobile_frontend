import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import contentApi from "../../../api/content/contentApi";
import subscriptionApi from "../../../api/subscription/subscriptionApi";
import HomeStatsCard from "../../../components/cards/HomeStatsCard";
import { ContentContainer } from "../../../components/ContentContainer";
import FormErrorMessage from "../../../components/form/fields/FormErrorMessage";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import Loader from "../../../components/Loader";
import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import TrialStartModal from "../../../components/modals/TrialStartModal";
import StoryListSection from "../../../components/sections/home/StoryListSection";
import { getDailyActivity } from "../../../store/reducers/activityReducer";
import {
	getCurrentUserSubscription,
	setSubscription,
} from "../../../store/reducers/subscriptionReducer";
import { getCurrentUser } from "../../../store/reducers/userReducer";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import { formatStatsNumbers } from "../../../utilities/formatters";
import ScreenContainer from "../../../utilities/ScreenContainer";

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	/*
	 * use Selectors to grab data from Redux Store
	 */

	const currentUser = useSelector(getCurrentUser);
	const currentSubscription = useSelector(getCurrentUserSubscription);
	const todaysActivity = useSelector(getDailyActivity);

	/*
	 * Fetch relevant data from selectors
	 */

	const { username, hasTrial } = currentUser;
	const { caloriesBurned, bodyMoves } = todaysActivity;
	/*
	 *useState for errors, modals etc
	 */

	const [error, setError] = React.useState();
	const [stories, setStories] = React.useState([]);

	const [showTrialModal, setShowTrialModal] = React.useState(false);

	/*
	 *Create Subscription API flow here
	 */

	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);
	const fetchStoriesApi = useApi(contentApi.getStories);

	const [showChooseSubscriptionModal, setShowChooseSubscriptionModal] =
		React.useState(false);

	const [showConfirmModal, setShowConfirmModal] = React.useState({
		show: false,
		message: "",
		confirmText: "Yes, Subscribe Me",
		cancelText: "Maybe later",
		value: "",
	});

	/**Effects */
	React.useEffect(() => {
		fetchStoriesSanity();
	}, []);

	/*
	 * General functions
	 */

	// Might have to do away with this logic fetch subscription from server direct
	const checkSubscriptionStatus = (contentStoryId) => {
		// Check for subscription
		if (currentSubscription.isExpired)
			return setShowChooseSubscriptionModal(!showChooseSubscriptionModal);
		return triggerNavigate(contentStoryId);
	};

	/*
	 * Navigation logic
	 */

	const triggerNavigate = (contentStoryId) => {
		// console.log("Story Id, Homescreen", storyId);
		navigation.navigate(routes.home.STORY_INTRO, { contentStoryId });
		// navigation.navigate(routes.home.PERFORMANCE_RESULTS_SCREEN, {
		// 	data: { success: true },
		// });
	};

	/*
	 *Create Subscription Flow
	 */

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

	const fetchStoriesSanity = async () => {
		const result = await fetchStoriesApi.request();

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		// console.log("Stories", result.data);
		setStories(result.data);
	};

	const triggerCreateSubscription = async (value) => {
		// console.log("Value", value);
		const result = await createSubscriptionApi.request(value);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		dispatch(setSubscription(result.data));
		setShowConfirmModal(!showConfirmModal);
		return setShowChooseSubscriptionModal(false);
	};

	return (
		<>
			<Loader
				// visible={true}
				visible={createSubscriptionApi.loading || fetchStoriesApi.loading}
				message="Loading your content"
			/>
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
				<FormErrorMessage error={error} />
				<ContentContainer>
					{/* <Spacer h="10px" /> */}
					<PageHeaderSmall title={`WELCOME ${"   "}//${"   "} ${username}`} />
					<HomeStatsCard
						calBurned={formatStatsNumbers(caloriesBurned)}
						bodyMovements={formatStatsNumbers(bodyMoves)}
					/>
					<StoryListSection
						stories={stories}
						triggerNavigate={checkSubscriptionStatus}
					/>
				</ContentContainer>
			</ScreenContainer>
		</>
	);
};

export default HomeScreen;
