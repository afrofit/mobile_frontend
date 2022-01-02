import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import Button from "../buttons/Button";
import Card from "./Card";

const LabelText = styled.Text`
	font-family: "Medium";
	font-size: 12px;
	letter-spacing: 1px;
	color: ${COLORS.grayDark};
	/* width: 40%; */
	text-transform: lowercase;
`;

const NumberText = styled.Text`
	font-family: "NumberThin";
	font-size: 35px;
	letter-spacing: 3px;
	color: ${COLORS.white};
	/* margin-right: 5px; */
`;

const Container = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const ProfileSubscriptionCard = ({
	subEndDate = "20, Jun 2022",
	subType = "half-year",
}) => {
	return (
		<Card>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Subscription
			</Font>
			<Spacer />
			<Container>
				<LabelText>Your {subType} subscription ends on</LabelText>
				<Spacer h="10px" />
				<NumberText>{subEndDate}</NumberText>
				<Spacer />
				<Button text="Cancel Subscription" />
			</Container>
		</Card>
	);
};

export default ProfileSubscriptionCard;
