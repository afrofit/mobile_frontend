import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import Button from "../buttons/Button";
import ClearButton from "../buttons/ClearButton";
import Card from "./Card";

const LabelText = styled.Text`
	font-family: "Medium";
	font-size: 12px;
	letter-spacing: 1px;
	color: ${(props) => (props.unsubscribed ? COLORS.white : COLORS.white)};
	text-transform: lowercase;
`;

const NumberText = styled.Text`
	font-family: "NumberThin";
	font-size: 35px;
	letter-spacing: 3px;
	color: ${COLORS.white};
`;

const Container = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const ProfileSubscriptionCard = ({
	onTapSubscribe,
	onCancelSubscription,
	onRestoreSubscription,
	info,
}) => {
	React.useState(() => {}, []);

	return (
		<Card color={!info ? COLORS.red : COLORS.darker}>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Subscription
			</Font>
			<Spacer />
			<Container>
				{info && info.entitlements.active.premium.isActive && (
					<>
						<LabelText>
							Your{" "}
							{info.entitlements.active.premium.ownershipType === "PURCHASED"
								? "Premium"
								: "Trial"}{" "}
							subscription ends on
						</LabelText>
						<Spacer h="10px" />
						<NumberText>
							{new Date(
								info.entitlements.active.premium.expirationDate
							).toDateString()}
						</NumberText>
						<Spacer />
						<Button
							text="Cancel Subscription"
							onPress={() => onCancelSubscription()}
						/>
					</>
				)}

				{!info && (
					<>
						<LabelText unsubscribed={!info}>You're not subscribed.</LabelText>
						<Spacer />
						<Button text="Subscribe Now" onPress={onTapSubscribe} />
						<Spacer />
						<ClearButton
							text="Restore my existing subscription"
							onPress={() => onRestoreSubscription()}
						/>
					</>
				)}
			</Container>
		</Card>
	);
};

export default ProfileSubscriptionCard;
