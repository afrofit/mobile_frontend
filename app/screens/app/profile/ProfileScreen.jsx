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

const Scroller = styled.ScrollView`
	max-height: 100%;
	width: 100%;
	border-radius: ${BORDER_RADIUS_MID};
`;

const ProfileScreen = ({}) => {
	const { logOut } = useAuth();

	const [editingUsername, setEditingUsername] = React.useState(false);

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
						<ProfileNameCard onTapUsername={() => setEditingUsername(true)} />
						<ProfileStatsCard />
						<ProfileSubscriptionCard />
						{/* <Spacer /> */}
						<Button text="Logout" variant="red" onPress={() => logOut()} />
					</Scroller>
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
