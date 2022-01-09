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

const ChooseSubscriptionTypeModal = ({
	onCancelClicked,
	handleCreateSubscription,
}) => {
	const handleCancel = () => {
		onCancelClicked();
	};

	return (
		<BackgroundOverlay>
			<ModalBG>
				<PageHeaderSmall title={"You're not subscribed!"} />
				<Element
					size={220}
					source={require("../../assets/images/art/model_male_01.png")}
				/>
				<Button
					text="£2.99 / MONTHLY"
					variant="white"
					onPress={() => handleCreateSubscription("monthly")}
				/>
				<Button
					text="£7.99 / HALF YEARLY"
					variant="white"
					onPress={() => handleCreateSubscription("half-yearly")}
				/>
				<Button
					text="£14.99 / YEARLY"
					variant="white"
					onPress={() => handleCreateSubscription("yearly")}
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

export default ChooseSubscriptionTypeModal;
