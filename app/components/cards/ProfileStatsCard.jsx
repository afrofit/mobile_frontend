import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import Card from "./Card";

const LabelText = styled.Text`
	font-family: "Medium";
	font-size: 12px;
	letter-spacing: 1px;
	color: ${COLORS.grayDark};
	width: 40%;
	text-transform: lowercase;
`;

const NumberText = styled.Text`
	font-family: "NumberThin";
	font-size: 55px;
	letter-spacing: 3px;
	color: ${COLORS.white};
	margin-right: 5px;
`;

const Stats = styled.View`
	width: 140px;
	flex-direction: row;
	align-items: center;
`;

const StatsContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const StatContainer = ({ children }) => {
	return <Stats>{children}</Stats>;
};

const ProfileStatsCard = ({
	calBurned = 200,
	bodyMoves = "170k",
	hoursDanced = "2k",
	daysActive = 30,
}) => {
	return (
		<Card>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Statistics
			</Font>
			<Spacer />
			<StatsContainer>
				<StatContainer>
					<NumberText>{calBurned}</NumberText>
					<LabelText>Calories Burned</LabelText>
				</StatContainer>
				<StatContainer>
					<NumberText>{bodyMoves}</NumberText>
					<LabelText>Body Moves</LabelText>
				</StatContainer>
			</StatsContainer>
			<Spacer />
			<StatsContainer>
				<StatContainer>
					<NumberText>{hoursDanced}</NumberText>
					<LabelText>Hours Danced</LabelText>
				</StatContainer>
				<StatContainer>
					<NumberText>{daysActive}</NumberText>
					<LabelText>Days Active</LabelText>
				</StatContainer>
			</StatsContainer>
		</Card>
	);
};

export default ProfileStatsCard;
