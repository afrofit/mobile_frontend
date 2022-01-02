import * as React from "react";
import styled from "styled-components/native";
import { ranks } from "../data/rank-data";
import Font from "../elements/Font";
import { COLORS } from "../theme/colors";
import Spacer from "../utilities/Spacer";

const Element = styled.Image`
	width: ${(props) => (props.size ? `${props.size}px` : `60px`)};
	height: ${(props) => (props.size ? `${props.size}px` : `60px`)};
	resize-mode: contain;
`;

const Container = styled.View`
	align-items: center;
	justify-content: center;
	margin: ${(props) => (props.margin ? `${props.margin}px` : 0)};
`;

const RankBadge = ({
	size = "40",
	rankCode = 1,
	showLabel = true,
	margin = 10,
	currentUser = false,
}) => {
	return (
		<Container margin={margin}>
			<Element
				size={currentUser ? +size + 15 : size}
				source={ranks[rankCode].src}
			/>
			{showLabel && (
				<>
					<Spacer h="10px" />
					<Font variant="small-text" color={COLORS.white}>
						{ranks[rankCode].name}
					</Font>
				</>
			)}
		</Container>
	);
};

export default RankBadge;
