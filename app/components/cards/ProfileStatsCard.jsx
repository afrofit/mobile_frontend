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
	font-size: 40px;
	letter-spacing: 3px;
	color: ${COLORS.white};
	margin-right: 5px;
	text-align: left;
`;

const StatsBox = styled.View`
	width: 48%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const StatsLine = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

const ProfileStatsCard = ({
	calBurned,
	bodyMoves,
	hoursDanced,
	daysActive,
}) => {
	return (
		<Card>
			<Font variant="small-caps" color={COLORS.yellow}>
				Your Statistics
			</Font>
			<Spacer />
			<StatsLine>
				<StatsBox>
					<NumberText>{calBurned}</NumberText>
					<LabelText>Calories Burned</LabelText>
				</StatsBox>
				<StatsBox>
					<NumberText>{bodyMoves}</NumberText>
					<LabelText>Body Moves</LabelText>
				</StatsBox>
			</StatsLine>
			<Spacer />
			<StatsLine>
				<StatsBox>
					<NumberText>{hoursDanced}</NumberText>
					<LabelText>Hours Danced</LabelText>
				</StatsBox>
				<StatsBox>
					<NumberText>{daysActive}</NumberText>
					<LabelText>Days Active</LabelText>
				</StatsBox>
			</StatsLine>
		</Card>
	);
};

export default ProfileStatsCard;
