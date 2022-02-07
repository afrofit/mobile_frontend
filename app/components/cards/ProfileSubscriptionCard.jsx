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
	color: ${(props) => (props.unsubscribed ? COLORS.white : COLORS.grayDark)};
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
	subscription,
	onTapSubscribe,
	onCancelSubscription,
}) => {
	/**State */
	console.log("Subscription from ProfileSubCard: ", subscription);
	const { endDate, isExpired, name, id } = subscription;

	return (
		<Card color={isExpired ? COLORS.red : COLORS.darker}>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Subscription
			</Font>
			<Spacer />
			<Container>
				{!isExpired && (
					<>
						<LabelText>Your {name} subscription ends on</LabelText>
						<Spacer h="10px" />
						<NumberText>{new Date(endDate).toDateString()}</NumberText>
						<Spacer />
						<Button
							text="Cancel Subscription"
							onPress={() => onCancelSubscription(id)}
						/>
					</>
				)}

				{isExpired && (
					<>
						<LabelText unsubscribed={isExpired}>
							You're not subscribed.
						</LabelText>
						<Spacer />
						<Button text="Subscribe Now" onPress={onTapSubscribe} />
					</>
				)}
			</Container>
		</Card>
	);
};

export default ProfileSubscriptionCard;
