import styled from "styled-components/native";

const imageSources = {
	maleModel: require("../assets/images/art/frontpage_male_model_blurred.jpg"),
};

const Background = styled.ImageBackground`
	resize-mode: contain;
	height: ${(props) => (props.height ? `${props.height}%` : "100%")};
	width: 100%;
	position: absolute;
	z-index: -2;
	opacity: ${(props) => (props.opacity ? props.opacity : 1)};
`;

export const ImageBackground = ({
	imageType = "maleModel",
	opacity = 0.6,
	height = "100%",
}) => {
	return (
		<Background
			opacity={opacity}
			height={height}
			source={imageSources[imageType]}
		/>
	);
};

// opacity: 0.8;
