import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../theme/colors";
import { BORDER_RADIUS_MID, BORDER_RADIUS_SMALL } from "../../theme/globals";

const CardContainer = styled.View`
	width: 100%;
	background-color: ${(props) =>
		props.currentUser ? COLORS.red : COLORS.dark};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px;
	border-radius: ${BORDER_RADIUS_SMALL};
`;

const NameFont = styled.Text`
	font-family: "SemiBold";
	font-size: 16px;
	letter-spacing: 0.1px;
	color: ${(props) => (props.currentUser ? COLORS.black : COLORS.white)};
`;
const NumberFont = styled(NameFont)`
	font-family: "NumberBold";
	font-size: 15px;
	letter-spacing: 3px;
	color: ${(props) => (props.currentUser ? COLORS.black : COLORS.grayDarker)};
`;
const RankNumberFont = styled(NameFont)`
	font-family: "Bold";
	font-size: 12px;
	letter-spacing: 3px;
	color: ${COLORS.black};
	margin-left: 3px;
`;

const RankNumberBackground = styled.View`
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	background-color: ${COLORS.yellow};
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
	return (
		<CardContainer currentUser={currentUser}>
			<IdentifierGrouping>
				<RankNumberBackground>
					<RankNumberFont>{rankPosition}</RankNumberFont>
				</RankNumberBackground>
				<NameFont currentUser={currentUser}>{username}</NameFont>
			</IdentifierGrouping>
			<NumberFont currentUser={currentUser}>{userXP} XP</NumberFont>
		</CardContainer>
	);
};

export default RankingCard;
