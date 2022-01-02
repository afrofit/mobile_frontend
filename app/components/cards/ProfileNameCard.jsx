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
	color: ${COLORS.white};
	font-size: 18px;
	text-transform: uppercase;
`;

const EmailText = styled(UsernameText)`
	font-size: 13px;
	color: ${COLORS.grayDark};
	text-transform: lowercase;
`;

const JoinDateText = styled(UsernameText)`
	font-size: 10px;
	color: ${COLORS.grayDarker};
`;

const Marginer = styled.View`
	flex: 1;
`;

const ProfileNameCard = ({ onTapUsername }) => {
	return (
		<Card color={COLORS.darker}>
			<Container>
				<RankBadge size="60" />
				{/* <Spacer h="5px" /> */}
				<Content>
					<Touchable onPress={onTapUsername}>
						<UsernameText>Olasupoodebiyi</UsernameText>
					</Touchable>
					<Spacer h="5px" />
					<EmailText>olasupoodebiyi@yahoo.com</EmailText>
					<Spacer h="20px" />
					{/* <Marginer /> */}
					<JoinDateText>Joined June 2021</JoinDateText>
				</Content>
			</Container>
		</Card>
	);
};

export default ProfileNameCard;
