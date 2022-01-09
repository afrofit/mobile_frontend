import * as React from "react";
import styled from "styled-components/native";
import Font from "../../elements/Font";
import { COLORS } from "../../theme/colors";
import Spacer from "../../utilities/Spacer";
import Card from "./Card";

const LabelText = styled.Text`
	font-family: "Medium";
	font-size: 12px;
	letter-spacing: 0.5px;
	color: ${COLORS.grayDarkest};
	width: 40%;
	text-transform: lowercase;
`;

const NumberText = styled.Text`
	font-family: "NumberThin";
	font-size: 50px;
	letter-spacing: 3px;
	color: ${COLORS.yellow};
	margin-right: 5px;
`;

const Stats = styled.View`
	/* width: 140px; */
	width: 45%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	/* background-color: red; */
`;

const StatsContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const StatContainer = ({ children }) => {
	return <Stats>{children}</Stats>;
};

const HomeStatsCard = ({ calBurned = 200, bodyMoves = "170k" }) => {
	return (
		<Card>
			<Font variant="small-caps" color={COLORS.grayDark}>
				Your Activity Today
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
		</Card>
	);
};

export default HomeStatsCard;
