import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../theme/colors";
import { BORDER_RADIUS_MID, BORDER_RADIUS_SMALL } from "../../theme/globals";

const CardContainer = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px;
	border-radius: ${BORDER_RADIUS_SMALL};
	border-width: 1px;
	border-color: ${(props) => (props.currentUser ? COLORS.yellow : COLORS.dark)};
`;

const NameFont = styled.Text`
	font-family: "Regular";
	font-size: 16px;
	letter-spacing: 0.1px;
	color: ${(props) => (props.currentUser ? COLORS.yellow : COLORS.white)};
`;
const NumberFont = styled(NameFont)`
	font-family: "NumberBold";
	font-size: 15px;
	letter-spacing: 3px;
	color: ${(props) => (props.currentUser ? COLORS.yellow : COLORS.grayDarker)};
`;
const RankNumberFont = styled(NameFont)`
	font-family: "Bold";
	font-size: 14px;
	letter-spacing: 3px;
	color: ${(props) => (props.fontColor < 4 ? COLORS.black : COLORS.grayDark)};
	margin-left: 3px;
`;

const RankNumberBackground = styled.View`
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.color};
	border-radius: ${BORDER_RADIUS_MID};
	margin-right: 20px;
`;

const IdentifierGrouping = styled.View`
	flex-direction: row;
`;

const RankingCard = ({
	username = "Lee Rayner Mitch",
	currentUser = false,
	rankPosition = 4,
	userXP = 567,
}) => {
	const rankingNumberColor = () => {
		return rankPosition == 1
			? COLORS.yellow
			: rankPosition == 2
			? COLORS.grayDark
			: rankPosition == 3
			? COLORS.bronze
			: COLORS.dark;
	};

	return (
		<CardContainer currentUser={currentUser}>
			<IdentifierGrouping>
				<RankNumberBackground color={rankingNumberColor()}>
					<RankNumberFont fontColor={rankPosition}>
						{rankPosition}
					</RankNumberFont>
				</RankNumberBackground>
				<NameFont currentUser={currentUser}>{username}</NameFont>
			</IdentifierGrouping>
			<NumberFont currentUser={currentUser}>{userXP} XP</NumberFont>
		</CardContainer>
	);
};

export default RankingCard;
