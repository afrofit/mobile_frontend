import React from "react";
import styled from "styled-components/native";
import AnimatedLottieView from "lottie-react-native";

import { COLORS } from "../theme/colors";
import Font from "../elements/Font";
import Spacer from "../utilities/Spacer";

const BOX_SIZE = "60px";

const LottieWrapper = styled.View`
	height: 100%;
	width: 100%;
	/* background-color: ${COLORS.black}; */
	opacity: 0.95;
	flex: 1;
	/* position: absolute; */
	/* z-index: 100; */
	justify-content: center;
	align-items: center;
`;

const LoaderContainer = styled.View`
	height: ${BOX_SIZE};
	width: ${BOX_SIZE};
	justify-content: center;
	align-items: center;
	/* padding: 50px; */
`;

const LoaderInView = ({ message = "Loading Content ...", visible = true }) => {
	let animationRef;

	React.useEffect(() => {
		animationRef && animationRef.play();
	}, []);

	if (!visible) return null;
	return (
		<LottieWrapper>
			<LoaderContainer>
				<AnimatedLottieView
					ref={(animation) => (animationRef = animation)}
					// autoPlay
					loop={true}
					source={require("../assets/animations/musicloader.json")}
				/>
			</LoaderContainer>
			<Spacer h="20px" />
			<Font variant="paragraph" color={COLORS.white}>
				{message}
			</Font>
			<Spacer h="20px" />
		</LottieWrapper>
	);
};

export default LoaderInView;
