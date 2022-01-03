import * as React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import ProfileNameCard from "../../../components/cards/ProfileNameCard";
import ProfileStatsCard from "../../../components/cards/ProfileStatsCard";
import ProfileSubscriptionCard from "../../../components/cards/ProfileSubscriptionCard";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderLarge from "../../../components/headers/PageHeaderLarge";
import RankBadge from "../../../components/RankBadge";
import Font from "../../../elements/Font";

import { COLORS } from "../../../theme/colors";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";
import Button from "../../../components/buttons/Button";
import useAuth from "../../../hooks/useAuth";
import { BORDER_RADIUS_MID } from "../../../theme/globals";
import SingleInputModal from "../../../components/modals/SingleInputModal";
import { getCurrentUser } from "../../../store/reducers/userReducer";
import { useSelector } from "react-redux";
import { getTotalUserActivity } from "../../../store/reducers/activityReducer";
import { formatStatsNumbers } from "../../../utilities/formatters";
import { getSubscription } from "../../../store/reducers/subscriptionReducer";

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
	const currentUser = useSelector(getCurrentUser);
	const totalUserStats = useSelector(getTotalUserActivity);
	const subscription = useSelector(getSubscription);

	const { id: userId, username, email, joinDate, rankId } = currentUser;
	const {
		totalCaloriesBurned,
		totalBodyMovements,
		totalHoursDanced,
		totalDaysActive,
	} = totalUserStats;

	const { logOut } = useAuth();

	const [editingUsername, setEditingUsername] = React.useState(false);
	console.log("Subscription type", subscription);
	return (
		<>
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
							bodyMoves={formatStatsNumbers(totalBodyMovements)}
							hoursDanced={formatStatsNumbers(totalHoursDanced)}
							daysActive={formatStatsNumbers(totalDaysActive)}
						/>
						<ProfileSubscriptionCard subscription={subscription} />
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
