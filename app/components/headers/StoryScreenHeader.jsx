import * as React from "react";
import styled from "styled-components/native";
import ThreeStarsElement from "../../elements/ThreeStarsElement";
import { COLORS } from "../../theme/colors";
import {
	BORDER_RADIUS_MID,
	BORDER_RADIUS_SMALL,
	MARGIN_VERTICAL,
} from "../../theme/globals";

//ImageBG
const Background = styled.ImageBackground`
	resize-mode: contain;
	height: 33%;
	width: 100%;
	margin-bottom: ${MARGIN_VERTICAL};
	border-radius: ${BORDER_RADIUS_MID};
	overflow: hidden;
	padding: 15px;
	align-items: flex-end;
	justify-content: space-between;
`;

const TitleTag = styled.View`
	padding: 10px;
	width: 100%;
	/* background-color: ${COLORS.grayMid}; */
	opacity: 0.95;
	border-radius: ${BORDER_RADIUS_MID};
	justify-content: center;
	align-items: flex-end;
`;

const Font = styled.Text`
	font-family: "Regular";
	font-size: 25px;
	color: ${COLORS.white};
	/* margin-bottom: 5px; */
	background-color: ${COLORS.black};
	padding: 10px;
	border-radius: ${BORDER_RADIUS_SMALL};
	overflow: hidden;
`;

const SmallCapsFont = styled(Font)`
	margin-top: 5px;
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 11px;
	font-family: "ExtraBold";
	color: ${COLORS.white};
`;

const StoryScreenHeader = ({ children, title, imageUrl, completion }) => {
	return (
		<Background source={{ uri: imageUrl }}>
			<ThreeStarsElement />
			{children}
			<TitleTag>
				<Font>{title}</Font>
				<SmallCapsFont>{completion}% Complete</SmallCapsFont>
			</TitleTag>
		</Background>
	);
};

export default StoryScreenHeader;
