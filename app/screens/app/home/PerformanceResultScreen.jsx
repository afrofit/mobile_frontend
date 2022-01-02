import * as React from "react";
import styled from "styled-components/native";
import Button from "../../../components/buttons/Button";
import PageHeaderHuge from "../../../components/headers/PageHeaderHuge";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";
import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

//This screen is where video intro of storyline is played. Very important!
const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const PageSection = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const TopSection = styled.View`
	flex: 1;
`;

const MidSection = styled(PageSection)`
	/* flex: 0.9; */
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
	/* background-color: blue; */
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
`;

const MessageText = styled(Font)`
	font-family: "SemiBold";
	font-size: 17px;
	letter-spacing: 1.5px;
	color: ${COLORS.white};
`;

const InstructionText = styled(Font)`
	font-family: "Regular";
	font-size: 13px;
	color: ${COLORS.yellow};
`;

const InstructionTextWhite = styled(InstructionText)`
	color: ${COLORS.white};
	width: 300px;
`;

const PerformanceResultScreen = ({ navigation, route }) => {
	const { success } = route.params.data;
	const failMessage = "You couldn't do it this time. But don't accept defeat!";
	const successMessage =
		"You did it! Let's kill the next chapter, you are the champ!";
	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			<Container>
				<Spacer />
				<PageHeaderHuge title={success ? "Success" : "Fail"} />
				<TopSection />
				<MidSection>
					{/* <ThreeStarsElement /> */}
					<Spacer />
					<InstructionTextWhite>
						{success ? successMessage : failMessage}
					</InstructionTextWhite>
					<Spacer />
					{/* <ThreeStarsElement /> */}
				</MidSection>
				<Button
					variant="white"
					text={success ? "Next Chapter" : "Quit Chapter"}
					onPress={() => navigation.navigate(routes.home.STORY)}
				/>
				<Button
					variant="red"
					text={success ? "Exit Story" : "Retry Chapter"}
					onPress={() => navigation.goBack()}
				/>
				<Spacer />
			</Container>
		</ScreenContainer>
	);
};

export default PerformanceResultScreen;
