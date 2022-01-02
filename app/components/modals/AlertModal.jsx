import * as React from "react";
import AnimatedLottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import { BackgroundOverlay } from "../BackgroundOverlay";
import { BORDER_RADIUS_MID } from "../../theme/globals";
import { COLORS } from "../../theme/colors";
import Font from "../../elements/Font";

const AnimationVariants = {
	success: {
		url: require("../../assets/animations/success.json"),
	},
};

const AnimationContainer = styled.View`
	margin-bottom: 10px;
`;

const ModalBG = styled.ImageBackground`
	resize-mode: contain;
	justify-content: center;
	align-items: center;
	min-height: 20px;
	width: 70%;
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 30px;
	background-color: ${COLORS.black};
`;

const AlertModal = ({
	onAnimationDone,
	message = "Success!",
	animationType = "success",
}) => {
	let animationRef;

	React.useEffect(() => {
		animationRef && animationRef.play();
	}, []);

	return (
		<BackgroundOverlay>
			<ModalBG>
				<AnimationContainer>
					<AnimatedLottieView
						ref={(animation) => (animationRef = animation)}
						loop={false}
						onAnimationFinish={onAnimationDone}
						style={styles.animation}
						source={AnimationVariants[animationType].url}
					/>
				</AnimationContainer>
				<Font variant="paragraph" color={COLORS.white}>
					{message}
				</Font>
			</ModalBG>
		</BackgroundOverlay>
	);
};

const styles = StyleSheet.create({
	animation: {
		width: 60,
	},
});

export default AlertModal;
