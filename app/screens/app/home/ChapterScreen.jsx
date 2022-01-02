import * as React from "react";
import styled from "styled-components/native";
import Button from "../../../components/buttons/Button";
import ClearButton from "../../../components/buttons/ClearButton";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ThreeStarsElement from "../../../elements/ThreeStarsElement";

import { COLORS } from "../../../theme/colors";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

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

const MidSection = styled(PageSection)`
	flex: 0.9;
	width: 90%;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
	/* background-color: blue; */
`;

const BottomSection = styled(PageSection)`
	padding-top: 20px;
	padding-bottom: 20px;
	/* margin-top: 20%; */
	/* background-color: red; */
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

const Touchable = styled.Pressable``;

const ChapterScreen = ({ navigation }) => {
	const selectMusicMix = () => {
		console.log(
			"This should launch the mobile web browser with a link to Afrofit's MixCloud"
		);
	};

	return (
		<ScreenContainer backgroundColor={COLORS.dark}>
			<Container>
				<PageHeaderSmall title="AJ's Big FIGHT // CHAPTER 1" />
				<MidSection>
					<ThreeStarsElement variant="gray" />
					<MessageText>
						you must complete 15000 dance steps to help aj lose 2.5kg
					</MessageText>
					<MessageText>YOu've got 30 Minutes to finish!</MessageText>
					<MessageText>Ready?</MessageText>
					<ThreeStarsElement variant="gray" />
				</MidSection>
				<BottomSection>
					<Touchable onPress={selectMusicMix}>
						<InstructionText>Tap here to select music Mix</InstructionText>
					</Touchable>
					<Spacer />
					<InstructionTextWhite>
						Or minimize this app and select your music from your device's music
						player
					</InstructionTextWhite>
				</BottomSection>
				<Spacer />
				<Button
					text="Dance now"
					onPress={() => navigation.navigate(routes.home.DANCE)}
				/>
				<Spacer />
				<ClearButton text="Quit Activity" onPress={() => navigation.goBack()} />
			</Container>
		</ScreenContainer>
	);
};

export default ChapterScreen;
