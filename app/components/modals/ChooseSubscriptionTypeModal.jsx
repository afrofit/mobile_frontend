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
import Purchases from "react-native-purchases";

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
	onCancel,
	handleCreateSubscription,
}) => {
	const [offer, setOffer] = React.useState(null);

	const fetchSubscriptionOfferings = async () => {
		try {
			const offerings = await Purchases.getOfferings();
			if (offerings.current !== null) {
				//Display current offering with offerings.current
			}
			setOffer(offerings.current);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		fetchSubscriptionOfferings();
	}, []);

	const handleCancel = () => {
		onCancel();
	};

	const getPackageTypeString = (type) => {
		if (type === "MONTHLY") return "monthly";
		else if (type === "SIX_MONTH") return "half-yearly";
		else if (type === "ANNUAL") return "yearly";
	};

	return (
		<BackgroundOverlay>
			<ModalBG>
				<PageHeaderSmall title={"You need to be subscribed!"} />
				<Element
					size={220}
					source={require("../../assets/images/art/model_male_01.png")}
				/>
				<Font variant="paragraph" color={COLORS.grayDark}>
					Start with a 7-day free trial and continue with any option below
				</Font>
				<Spacer />
				{offer &&
					offer.availablePackages.map((pack) => {
						const packageType = getPackageTypeString(pack.packageType);
						return (
							<Button
								key={pack.identifier}
								text={`${pack.product.price_string} / ${packageType}`}
								onPress={() => handleCreateSubscription(pack)}
							/>
						);
					})}

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
