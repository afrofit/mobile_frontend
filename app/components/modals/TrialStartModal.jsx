import * as React from "react";
import AnimatedLottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import { BackgroundOverlay } from "../BackgroundOverlay";
import { BORDER_RADIUS_MID } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import Font from "../../elements/Font";
import PageHeaderSmall from "../headers/PageHeaderSmall";
import Button from "../buttons/Button";
import ClearButton from "../buttons/ClearButton";
import Spacer from "../../utilities/Spacer";
import subscriptionApi from "../../api/subscription/subscriptionApi";
import useApi from "../../hooks/useApi";
import useSubscription from "../../hooks/useSubscription";

const Element = styled.Image`
	width: ${(props) => (props.size ? `${props.size}px` : `60px`)};
	height: ${(props) => (props.size ? `${props.size}px` : `60px`)};
	resize-mode: contain;
	margin-bottom: -40px;
`;

const ParagraphText = styled.Text`
	font-family: "Regular";
	font-size: 15px;
	letter-spacing: 0.1px;
	color: ${COLORS.grayDarkest};
	/* width: 40%; */
	/* text-transform: lowercase; */
	text-align: center;
	margin-bottom: 20px;
`;

const ModalBG = styled.ImageBackground`
	resize-mode: contain;
	justify-content: center;
	align-items: center;
	min-height: 20px;
	width: 90%;
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 30px;
	background-color: ${COLORS.black};
`;

const TrialStartModal = ({ onCancelClicked }) => {
	// All useState Stuff setup here
	const [error, setError] = React.useState();
	//Create Subscription API flow here
	const { createSubscription, updateSubscribedUser } = useSubscription();
	const createSubscriptionApi = useApi(subscriptionApi.createSubscription);

	const handleStartTrial = async () => {
		console.log("Start Trial");
		const result = await createSubscriptionApi.request("trial");

		if (!result.ok) {
			if (result.data) {
				setError(result.data);
			} else {
				setError("An unexpected error occurred.");
			}
			return;
		}
		updateSubscribedUser(result.data.token);
		createSubscription(result.data.response);
		return onCancelClicked();
	};

	const handleCancel = () => {
		onCancelClicked();
	};
	return (
		<BackgroundOverlay>
			<ModalBG>
				<Element
					size={350}
					source={require("../../assets/images/art/model_female_01.png")}
				/>
				<PageHeaderSmall title={"Start Your Free Trial"} />
				<ParagraphText>
					Access all parts of the app for a 7-day period for free. After that,
					pay £12.99 every month. Cancel 24 hours before trial period ends.
				</ParagraphText>
				<Button
					text="Start Trial"
					variant="red"
					onPress={() => handleStartTrial()}
				/>
				<Spacer h="10px" />
				<ClearButton
					text="Maybe Later"
					variant="gray"
					onPress={() => handleCancel()}
				/>
			</ModalBG>
		</BackgroundOverlay>
	);
};

export default TrialStartModal;
