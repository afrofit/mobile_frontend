import * as React from "react";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS } from "../../theme/colors";
import ScreenContainer from "../../utilities/ScreenContainer";
import Button from "../../components/buttons/Button";
import { DecorativeElement } from "../../components/DecorativeElement";
import { DEVICE_WIDTH } from "../../theme/globals";
import useDisableHardwareBack from "../../hooks/useDisableHardwareBack";
import SquiglyFloater from "../../components/SquiglyFloater";
import PageHeaderSmall from "../../components/headers/PageHeaderSmall";

const NotifierContainer = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const PageSection = styled.View`
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const TopSection = styled(PageSection)`
	height: 7%;
	width: ${DEVICE_WIDTH};
	margin-bottom: 30%;
`;

const MidSection = styled(PageSection)`
	flex: 1;
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
`;

const BottomSection = styled(PageSection)`
	padding-top: 20px;
	padding-bottom: 20px;
	margin-top: 20%;
`;

const TitleText = styled.Text`
	font-family: "Bold";
	font-size: 12px;
	letter-spacing: 3px;
	text-transform: uppercase;
	color: ${COLORS.white};
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

const FullNotifyScreen = ({ navigation, route }) => {
	const { data, func, onwardRoute, message, succeed, instruction } =
		route.params;

	// Disable Back Button
	const { backDisabled } = useDisableHardwareBack();
	useFocusEffect(backDisabled());

	const dismissScreen = () => {
		func(data);
		if (onwardRoute) return navigation.navigate(onwardRoute);
	};

	return (
		<ScreenContainer backgroundColor={COLORS.black}>
			<NotifierContainer>
				<PageHeaderSmall title={succeed ? "SUCCESS" : "OH NO!"} />
				{/* <TopSection>
					<TitleText>{succeed ? "SUCCESS" : "OH NO!"}</TitleText>
					<SquiglyFloater />
				</TopSection> */}
				<MidSection>
					<DecorativeElement
						width="120"
						source={require("../../assets/images/elements/three_stars_gray.png")}
					/>
					<MessageText>{message}</MessageText>
					<InstructionText>{instruction}</InstructionText>
					<DecorativeElement
						width="120"
						source={require("../../assets/images/elements/three_stars_gray.png")}
					/>
				</MidSection>
				<BottomSection>
					<Button
						text="Continue"
						onPress={dismissScreen}
						disabled={false}
						variant="white"
					/>
				</BottomSection>
			</NotifierContainer>
		</ScreenContainer>
	);
};

export default FullNotifyScreen;
