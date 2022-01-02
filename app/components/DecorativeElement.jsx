import styled from "styled-components/native";

export const DecorativeElement = styled.Image`
	width: ${(props) => (props.width ? `${props.width}px` : `100px`)};
	height: 30px;
	resize-mode: contain;
	transform: ${(props) => (props.deg ? `rotate(${props.deg}deg)` : "")};
`;
