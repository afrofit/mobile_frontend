import * as React from "react";
import parseMillis from "parse-ms";
import styled from "styled-components/native";

import { Platform, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import authFuncs from "../../../store/thunks/auth_functions";
import Button from "../../../components/buttons/Button";
import ChooseSubscriptionTypeModal from "../../../components/modals/ChooseSubscriptionTypeModal";
import PageHeaderLarge from "../../../components/headers/PageHeaderLarge";
import ProfileNameCard from "../../../components/cards/ProfileNameCard";
import ProfileStatsCard from "../../../components/cards/ProfileStatsCard";
import ProfileSubscriptionCard from "../../../components/cards/ProfileSubscriptionCard";
import ScreenContainer from "../../../utilities/ScreenContainer";
import SingleInputModal from "../../../components/modals/SingleInputModal";
import Spacer from "../../../utilities/Spacer";

import { BORDER_RADIUS_MID } from "../../../theme/globals";
import {
	cancelSubscription,
	createSubscription,
} from "../../../store/thunks/subscriptionThunks";
import { COLORS } from "../../../theme/colors";
import { ContentContainer } from "../../../components/ContentContainer";
import { fetchUserPerformanceData } from "../../../store/thunks/activityThunks";
import { formatStatsNumbers } from "../../../utilities/formatters";
import { getCurrentUser } from "../../../store/reducers/userReducer";
import { getCurrentUserSubscription } from "../../../store/reducers/subscriptionReducer";
import { getPerformanceData } from "../../../store/reducers/activityReducer";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
	selectShowSubscribeDialog,
	setShowSubscribeDialog,
} from "../../../store/reducers/uiReducer";
import Purchases from "react-native-purchases";
import AlertModal from "../../../components/modals/AlertModal";
import routes from "../../../theme/routes";

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

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const [purchaseInfo, setPurchaseInfo] = React.useState(null);

	const currentUser = useSelector(getCurrentUser);
	const totalUserStats = useSelector(getPerformanceData);
	const subscription = useSelector(getCurrentUserSubscription);
	const showSubscribeDialog = useSelector(selectShowSubscribeDialog);

	const { id: userId, username, email, joinDate, rankId } = currentUser;
	const {
		totalCaloriesBurned,
		totalBodyMoves,
		totalTimeDancedInMilliseconds,
		totalDaysActive,
	} = totalUserStats;

	const [editingUsername, setEditingUsername] = React.useState(false);
	const [showCancelModal, setShowCancelMSucessModal] = React.useState(false);

	useFocusEffect(
		React.useCallback(() => {
			dispatch(fetchUserPerformanceData());
		}, [])
	);

	React.useEffect(() => {
		getPurchaserInfo();

		Purchases.addPurchaserInfoUpdateListener((info) => getPurchaserInfo());
	}, []);

	const getPurchaserInfo = async () => {
		try {
			const purchaserInfo = await Purchases.getPurchaserInfo();

			if (typeof purchaserInfo.entitlements.active.premium !== "undefined") {
				setPurchaseInfo(purchaserInfo);
			}
		} catch (error) {
			console.error(error);
		}
	};

	/** Create Subscription Flow */
	const { hours } = parseMillis(+totalTimeDancedInMilliseconds);

	const triggerCreateSubscription = async (pack) => {
		dispatch(createSubscription(pack));
		return dispatch(setShowSubscribeDialog(false));
	};

	const handleCancelSubscription = async (subscriptionId) => {
		if (Platform.OS === "ios") {
			navigation.navigate(routes.home.WEBVIEW, {
				URL: purchaseInfo.managementUrl,
			});
		} else if (Platform.OS === "android") {
			// dispatch(cancelSubscription(subscriptionId));
		}
		// cancel subscription here
	};

	const handleRestoreSubscription = async () => {
		try {
			const restore = await Purchases.restoreTransactions();
			setPurchaseInfo(restore);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogout = () => {
		authFuncs.logOut(dispatch);
	};

	return (
		<>
			{showCancelModal && (
				<AlertModal onAnimationDone={() => setShowCancelMSucessModal(false)} />
			)}
			{showSubscribeDialog && (
				<ChooseSubscriptionTypeModal
					onCancel={() => dispatch(setShowSubscribeDialog(false))}
					handleCreateSubscription={triggerCreateSubscription}
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
							bodyMoves={formatStatsNumbers(totalBodyMoves, true)}
							hoursDanced={hours}
							daysActive={totalDaysActive}
						/>
						<ProfileSubscriptionCard
							subscription={subscription}
							info={purchaseInfo}
							onCancelSubscription={handleCancelSubscription}
							onRestoreSubscription={handleRestoreSubscription}
							onTapSubscribe={() => dispatch(setShowSubscribeDialog(true))}
						/>
						<Button text="Logout" variant="red" onPress={handleLogout} />
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
