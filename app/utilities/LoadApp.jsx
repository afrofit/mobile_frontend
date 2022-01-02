import * as React from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

const LoadApp = ({ fonts, children }) => {
	const [loaded] = useFonts({ ...fonts });

	if (!loaded) {
		return null;
	}
	return <NavigationContainer>{children}</NavigationContainer>;
};

export default LoadApp;
