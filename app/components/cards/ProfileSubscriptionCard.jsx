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

const ProfileSubscriptionCard = ({
	subscription,
	isTrial,
	isPremium,
	onTapSubscribe,
}) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState();
	console.log("Subscription from ProfileSubCard: ", subscription);
	const { endDate, isExpired, name, startDate, id } = subscription;

	//Create Subscription API flow here
	const { createSubscription, resetCurrentSubscription, updateSubscribedUser } =
		useSubscription();
	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);
	const cancelSubscriptionApi = useApi(subscriptionApi.cancelSubscription);

	const handleCreateSubscription = async () => {
		// //Hardcode the subscription type here
		// const result = await createSubscriptionApi.request("yearly");
		// if (!result.ok) {
		// 	if (result.data) {
		// 		setError(result.data);
		// 	} else {
		// 		setError("An unexpected error occurred.");
		// 	}
		// 	return;
		// }
		// // console.log("Subscription from Profile Sub Card", result.data);
		// updateSubscribedUser(result.data.token);
		// return createSubscription(result.data.response);
	};

	const handleCancelSubscription = async () => {
		const result = await cancelSubscriptionApi.request(id);

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		console.log("Subscription cancelled? ", result.data);
		return resetCurrentSubscription();
	};

	const subscribed =
		(!isTrial && isPremium && !isExpired) ||
		(isTrial && !isPremium && !isExpired);

	const expired = (isExpired && !id) || (isExpired && name === "unsubscribed");

	return (
		<Card color={isExpired ? COLORS.red : COLORS.darker}>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Subscription
			</Font>
			<Spacer />
			<Container>
				{subscribed && (
					<>
						<LabelText>Your {name} subscription ends on</LabelText>
						<Spacer h="10px" />
						<NumberText>{new Date(endDate).toDateString()}</NumberText>
						<Spacer />
						<Button
							text="Cancel Subscription"
							onPress={() => handleCancelSubscription(id)}
						/>
					</>
				)}

				{expired && (
					<>
						<LabelText unsubscribed={isExpired}>
							no current subscription
						</LabelText>
						<Spacer />
						{/* <Button text="Subscribe Now" onPress={handleCreateSubscription} /> */}
						<Button text="Subscribe Now" onPress={onTapSubscribe} />
					</>
				)}
			</Container>
		</Card>
	);
};

export default ProfileSubscriptionCard;
