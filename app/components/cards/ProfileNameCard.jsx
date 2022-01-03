import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import RankBadge from "../RankBadge";
import Card from "./Card";

const Touchable = styled.Pressable``;

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const Content = styled.View`
	align-items: flex-end;
`;

const UsernameText = styled.Text`
	font-family: "Regular";
	color: ${COLORS.yellow};
	font-size: 16px;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const EmailText = styled(UsernameText)`
	font-size: 13px;
	color: ${COLORS.grayDark};
	text-transform: lowercase;
	letter-spacing: 0;
`;

const JoinDateText = styled(UsernameText)`
	font-size: 10px;
	color: ${COLORS.grayDarker};
	letter-spacing: 0;
`;

const Marginer = styled.View`
	flex: 1;
`;

const ProfileNameCard = ({
	email,
	username,
	joinDateInMillis,
	onTapUsername,
	rankId,
}) => {
	const formatDate = () => {
		return new Date(joinDateInMillis);
	};

	return (
		<Card color={COLORS.darker} outline={true}>
			<Container>
				<RankBadge size="60" rankCode={rankId} />
				<Content>
					<Touchable onPress={onTapUsername}>
						<UsernameText>{username}</UsernameText>
					</Touchable>
					<Spacer h="5px" />
					<EmailText>{email}</EmailText>
					<Spacer h="20px" />
					<JoinDateText>Joined {formatDate().toDateString()}</JoinDateText>
				</Content>
			</Container>
		</Card>
	);
};

export default ProfileNameCard;
