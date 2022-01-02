import * as React from "react";
import styled from "styled-components/native";
import QuitButton from "../../../components/buttons/QuitButton";
import { ContentContainer } from "../../../components/ContentContainer";
import PageHeaderSmall from "../../../components/headers/PageHeaderSmall";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import OneStarElement from "../../../elements/OneStarElement";
import { COLORS } from "../../../theme/colors";
import { BORDER_RADIUS_BIG } from "../../../theme/globals";
import routes from "../../../theme/routes";
import ScreenContainer from "../../../utilities/ScreenContainer";
import Spacer from "../../../utilities/Spacer";

const Container = styled.View`
	height: 100%;
	width: 100%;
	align-items: center;
`;

const Font = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 25px;
	text-align: center;
`;

const NumberText = styled(Font)`
	font-family: "NumberThin";
	font-size: 65px;
	letter-spacing: 5px;
	color: ${COLORS.white};
	line-height: 65px;
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

const StepMinuteContainer = styled.View`
	flex-direction: row;
	width: 100%;
	min-height: 10px;
`;

const StatusContainer = styled.View`
	padding: 10px;
	background-color: ${COLORS.red};
	margin: 20px;
	border-radius: ${BORDER_RADIUS_BIG};
`;

const VideoContainer = styled.View`
	flex: 1;
`;

const BottomSection = styled.View`
	justify-content: center;
	align-items: center;
`;

const DanceScreen = ({ navigation }) => {
	const [showConfirmModal, setShowConfirmModal] = React.useState(false);

	const handleQuitDance = () => {
		setShowConfirmModal(false);
		return navigation.navigate(routes.home.STORY);
	};
	return (
		<>
			{showConfirmModal && (
				<ConfirmModal
					onCancelClicked={() => setShowConfirmModal(false)}
					onConfirmClicked={handleQuitDance}
				/>
			)}
			<ScreenContainer backgroundColor={COLORS.dark}>
				<Container>
					<PageHeaderSmall title="AJ's Big FIGHT // CHAPTER 1" />
					<VideoContainer />
					<BottomSection>
						<StepMinuteContainer>
							<MessageText>17000 steps</MessageText>
							<OneStarElement width={60} />
							<MessageText>30 Minutes</MessageText>
						</StepMinuteContainer>
						<StatusContainer>
							<InstructionTextWhite>Steps so far</InstructionTextWhite>
							<NumberText>7000</NumberText>
						</StatusContainer>
						<InstructionText>07:34 Minutes to go!</InstructionText>
						<Spacer />
						<QuitButton onPress={() => setShowConfirmModal(true)} />
						<Spacer />
					</BottomSection>
				</Container>
			</ScreenContainer>
		</>
	);
};

export default DanceScreen;
