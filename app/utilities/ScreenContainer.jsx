import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DEVICE_HEIGHT_NOPX, DEVICE_WIDTH_NOPX } from "../theme/globals";

const ScreenContainer = ({
	children,
	backgroundColor = "white",
	onPress = () => null,
	noTouch = true,
}) => {
	return (
		<SafeAreaView style={[styles.container, { backgroundColor }]}>
			<Pressable onPress={onPress} disabled={noTouch}>
				{children}
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		height: DEVICE_HEIGHT_NOPX,
		width: DEVICE_WIDTH_NOPX,
	},
	pressable: {
		height: "100%",
		width: "100%",
	},
});

export default ScreenContainer;
