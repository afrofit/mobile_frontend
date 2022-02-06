import * as React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import ProfileNameCard from "../../../components/cards/ProfileNameCard";
import ProfileStatsCard from "../../../components/cards/ProfileStatsCard";
import ProfileSubscriptionCard from "../../../components/cards/ProfileSubscriptionCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderLarge from "../../../components/headers/PageHeaderLarge";

import { COLORS } from "../../../theme/colors";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import Button from "../../../components/buttons/Button";
import useAuth from "../../../hooks/useAuth";
import { BORDER_RADIUS_MID } from "../../../theme/globals";
import SingleInputModal from "../../../components/modals/SingleInputModal";
import { getCurrentUser } from "../../../store/reducers/userReducer";
import { useSelector } from "react-redux";
import { getPerformanceData } from "../../../store/reducers/activityReducer";
import { formatStatsNumbers } from "../../../utilities/formatters";
import { getCurrentUserSubscription } from "../../../store/reducers/subscriptionReducer";
import useSubscription from "../../../hooks/useSubscription";
import subscriptionApi from "../../../api/subscription/subscriptionApi";
import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import ConfirmModal from "../../../components/modals/ConfirmModal";

const Scroller = styled.ScrollView`
	max-height: 100%;
	width: 100%;
	border-radius: ${BORDER_RADIUS_MID};
`;

const UserIdText = styled.Text`
	font-size: 10px;
	color: ${COLORS.grayDarker};
	letter-spacing: 0;
	font-family: "Regular";
	text-transform: uppercase;
`;

const ProfileScreen = ({}) => {
	/*
	 *useState for errors, modals etc
	 */

	const [error, setError] = React.useState();

	const currentUser = useSelector(getCurrentUser);
	const totalUserStats = useSelector(getPerformanceData);
	const subscription = useSelector(getCurrentUserSubscription);

	React.useEffect(() => {
		// console.log("Subscription from ProfileScreen", subscription);
		// console.log("CurrentUser from ProfileScreen", currentUser);
		// console.log("============  XoXoX  ===========");
	}, [subscription, currentUser]);

	const {
		id: userId,
		username,
		email,
		joinDate,
		rankId,
		hasTrial,
		isTrial,
		isPremium,
		isTrialUntil,
		isPremiumUntil,
	} = currentUser;
	const {
		totalCaloriesBurned,
		totalBodyMoves,
		totalTimeDancedInMilliseconds,
		totalDaysActive,
	} = totalUserStats;

	const { logOut } = useAuth();

	const [editingUsername, setEditingUsername] = React.useState(false);

	/*
	 *Create Subscription API flow here
	 */

	const { createSubscription, updateSubscribedUser } = useSubscription();
	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);

	const [showChooseSubscriptionModal, setShowChooseSubscriptionModal] =
		React.useState(false);

	const [showConfirmModal, setShowConfirmModal] = React.useState({
		show: false,
		message: "",
		confirmText: "Yes, Subscribe Me",
		cancelText: "Maybe later",
		value: "",
	});

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
			{editingUsername && (
				<SingleInputModal
					onCancelChange={() => setEditingUsername(false)}
					message="Change Your Username"
				/>
			)}
			<ScreenContainer backgroundColor={COLORS.dark} noTouch={true}>
				<ContentContainer>
					<PageHeaderLarge title="Profile" />
					<Scroller
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.contentContainer}
					>
						<ProfileNameCard
							username={username}
							email={email}
							joinDateInMillis={joinDate}
							onTapUsername={() => setEditingUsername(true)}
							rankId={rankId}
						/>
						<ProfileStatsCard
							calBurned={formatStatsNumbers(totalCaloriesBurned)}
							bodyMoves={formatStatsNumbers(totalBodyMoves)}
							hoursDanced={formatStatsNumbers(totalTimeDancedInMilliseconds)}
							daysActive={formatStatsNumbers(totalDaysActive)}
						/>
						<ProfileSubscriptionCard
							subscription={subscription}
							isTrial={isTrial}
							isPremium={isPremium}
							onTapSubscribe={() =>
								setShowChooseSubscriptionModal(!showChooseSubscriptionModal)
							}
						/>
						{/* <Spacer /> */}
						<Button text="Logout" variant="red" onPress={() => logOut()} />
					</Scroller>
					<Spacer h="10px" />
					<UserIdText>USER ID: {userId}</UserIdText>
				</ContentContainer>
			</ScreenContainer>
		</>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileScreen;
