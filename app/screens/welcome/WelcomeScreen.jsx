import * as React from "react";
import styled from "styled-components/native";

import Button from "../../components/buttons/Button";
import { ImageBackground } from "../../components/ImageBackground";
import Squigly from "../../components/Squigly";
import { COLORS } from "../../theme/colors";
import routes from "../../theme/routes";
import ScreenContainer from "../../utilities/ScreenContainer";
import Spacer from "../../utilities/Spacer";

const WelcomeScreen = ({ navigation }) => {
	const TaglineFont = styled.Text`
		color: ${COLORS.white};
		font-size: 25px;
		letter-spacing: 5px;
		text-transform: uppercase;
		font-family: ${(props) => (props.bold ? "SemiBold" : "ExtraBold")};
	`;

	const Logo = styled.Image`
		width: 100px;
		height: 50px;
		resize-mode: contain;
	`;

	const Container = styled.View`
		justify-content: center;
		align-items: center;
	`;

	const ButtonContainer = styled.View`
		justify-content: center;
		align-items: center;
		margin-bottom: 50px;
	`;

	const MainContainer = styled.View`
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		opacity: 1;
	`;

	return (
		<ScreenContainer backgroundColor={COLORS.black}>
			<MainContainer>
				<Container>
					<Logo
						source={require("../../assets/images/elements/logo_white.png")}
					/>
				</Container>
				<Container>
					<Squigly width="200" />
					<TaglineFont bold={true}>Find Rhythm</TaglineFont>
					<Spacer h="10px" />
					<TaglineFont>Build Fitness</TaglineFont>
					<Squigly width="200" deg="180" />
				</Container>
				<ButtonContainer>
					<Button
						text="Get Started"
						onPress={() => navigation.navigate(routes.auth.SIGNUP)}
						variant="white"
					/>
					<Button
						text="Sign In"
						onPress={() => navigation.navigate(routes.auth.LOGIN)}
						variant="red"
					/>
				</ButtonContainer>
				<ImageBackground height="120" opacity={0.6} imageType="maleModel" />
			</MainContainer>
		</ScreenContainer>
	);
};

export default WelcomeScreen;
