import * as React from "react";
import styled from "styled-components/native";
import subscriptionApi from "../../api/subscription/subscriptionApi";
import Font from "../../elements/Font";
import useApi from "../../hooks/useApi";
import useSubscription from "../../hooks/useSubscription";
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

const ProfileSubscriptionCard = ({ subscription }) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState();

	const { amountInGBP, durationInDays, endDate, isExpired, name, startDate } =
		subscription;

	//Create Subscription API flow here
	const { createSubscription } = useSubscription();
	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);

	const handleCreateSubscription = async () => {
		//Hardcode the subscription type here
		const result = await createSubscriptionApi.request("trial");

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		console.log("Subscription from Profile Sub Card", result.data);
		return createSubscription(result.data);
	};

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
						<NumberText>{endDate}</NumberText>
						<Spacer />
						<Button text="Cancel Subscription" />
					</>
				)}
				{isExpired && (
					<>
						<LabelText unsubscribed={isExpired}>
							You're don't have a current subscription.
						</LabelText>
						<Spacer />
						<Button text="Subscribe Now" onPress={handleCreateSubscription} />
					</>
				)}
			</Container>
		</Card>
	);
};

export default ProfileSubscriptionCard;
