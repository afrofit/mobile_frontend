import * as React from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import { MARGIN_VERTICAL, MARGIN_VERTICAL_SMALL } from "../../theme/globals";
import Spacer from "../../utilities/Spacer";

const ICON_SIZE = 15;

const CardContainer = styled.View`
	width: 100%;
	/* background-color: red; */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px;
	margin-top: ${MARGIN_VERTICAL_SMALL};
	margin-bottom: ${MARGIN_VERTICAL_SMALL};
`;

const TextFont = styled.Text`
	font-family: "Bold";
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 3px;
	color: ${COLORS.grayDarker};
`;

const IconContainer = styled.View`
	margin-right: ${MARGIN_VERTICAL};
	margin-left: ${MARGIN_VERTICAL};
`;

const PromotionNotifyCard = () => {
	return (
		<CardContainer>
			<IconContainer>
				<FontAwesome5
					name="arrow-circle-up"
					color={COLORS.grayDarker}
					size={ICON_SIZE}
				/>
			</IconContainer>
			<TextFont>Core Trainer League</TextFont>
			<IconContainer>
				<FontAwesome5
					name="arrow-circle-up"
					color={COLORS.grayDarker}
					size={ICON_SIZE}
				/>
			</IconContainer>
		</CardContainer>
	);
};

export default PromotionNotifyCard;
