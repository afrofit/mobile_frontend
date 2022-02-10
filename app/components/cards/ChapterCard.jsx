import * as React from "react";
import styled from "styled-components/native";

import { BORDER_RADIUS_MID, MARGIN_VERTICAL } from "../../theme/globals";
import { COLORS } from "../../theme/colors";

const Container = styled.Pressable`
	width: 100%;
	margin-bottom: ${MARGIN_VERTICAL};
`;

const Top = styled.View`
	height: 50px;
	background-color: ${COLORS.darker};
	overflow: hidden;
	border-top-right-radius: ${BORDER_RADIUS_MID};
	border-top-left-radius: ${BORDER_RADIUS_MID};
	align-items: center;
	justify-content: center;
`;

const Bottom = styled(Top)`
	background-color: ${(props) => props.color};
	height: 30px;
	border-top-right-radius: 0;
	border-top-left-radius: 0;
	border-bottom-right-radius: ${BORDER_RADIUS_MID};
	border-bottom-left-radius: ${BORDER_RADIUS_MID};
	align-items: flex-end;
	padding-right: 20px;
`;

const StatusFont = styled.Text`
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 11px;
	font-family: "Bold";
	color: ${COLORS.darker};
`;
const ChapterFont = styled(StatusFont)`
	/* font-family: "Medium"; */
	font-size: 15px;
	color: ${COLORS.white};
	margin-top: 5px;
	margin-bottom: 5px;
`;

const ChapterCard = ({ status = "fresh", onPress, number = 0 }) => {
	const color =
		status === "fresh"
			? COLORS.red
			: status === "dirty"
			? COLORS.yellow
			: COLORS.grayDarker;
	return (
		<Container onPress={onPress}>
			<Top>
				<ChapterFont>Play Chapter {number}</ChapterFont>
			</Top>
			<Bottom color={color}>
				<StatusFont>30% Complete</StatusFont>
			</Bottom>
		</Container>
	);
};

export default ChapterCard;
