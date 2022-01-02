import * as React from "react";
import styled from "styled-components/native";
import { COLORS } from "../theme/colors";

const variants = {
	bold: {
		"font-size": "18px",
		"font-family": "Regular",
		"letter-spacing": "0px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},

	"big-caps": {
		"font-size": "16px",
		"font-family": "Medium",
		"letter-spacing": "4px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "uppercase",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"bold-caps": {
		"font-size": "15px",
		"font-family": "Bold",
		"letter-spacing": "1px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "uppercase",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	title: {
		"font-size": "25px",
		"font-family": "Bold",
		"letter-spacing": "-.5px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"auth-title": {
		"font-size": "22px",
		"font-family": "Medium",
		"letter-spacing": ".25px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	error: {
		"font-size": "12px",
		"font-family": "SemiBold",
		"letter-spacing": "0.5px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	light: {
		"font-size": "15px",
		"font-family": "ExtraBold",
		"letter-spacing": "0px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	number: {
		"font-size": "35px",
		"font-family": "NumberBold",
		"letter-spacing": "0px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"number-big-thin": {
		"font-size": "60px",
		"font-family": "NumberThin",
		"letter-spacing": "3px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"number-small": {
		"font-size": "30px",
		"font-family": "NumberBold",
		"letter-spacing": "4px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "1000%",
	},

	paragraph: {
		"font-size": "16px",
		"font-family": "Regular",
		"letter-spacing": "0.1px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"paragraph-bold": {
		"font-size": "18px",
		"font-family": "Bold",
		"letter-spacing": "0.1px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"small-caps": {
		"font-size": "12px",
		"font-family": "Bold",
		"letter-spacing": "3px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "uppercase",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
	"small-text": {
		"font-size": "12px",
		"font-family": "Medium",
		"letter-spacing": "0.1px",
		"margin-top": "0px",
		"margin-bottom": "0px",
		"text-transform": "none",
		"margin-right": "0px",
		"margin-left": "0px",
		"text-align": "center",
		width: "100%",
	},
};

const CustomText = styled.Text`
	font-size: ${(props) => variants[props.variant]["font-size"]};
	font-family: ${(props) => variants[props.variant]["font-family"]};
	color: ${(props) => props.color};
	margin-top: ${(props) => variants[props.variant]["margin-top"]};
	margin-bottom: ${(props) => variants[props.variant]["margin-bottom"]};
	margin-left: ${(props) => variants[props.variant]["margin-left"]};
	margin-right: ${(props) => variants[props.variant]["margin-right"]};
	text-transform: ${(props) => variants[props.variant]["text-transform"]};
	letter-spacing: ${(props) => variants[props.variant]["letter-spacing"]};
	text-align: ${(props) => variants[props.variant]["text-align"]};
	width: ${(props) => props.width};
`;

const Font = ({
	children,
	color = COLORS.black,
	variant = "paragraph",
	width = "100%",
}) => {
	return (
		<>
			<CustomText variant={variant} color={color} width={width}>
				{children}
			</CustomText>
		</>
	);
};

export default Font;
