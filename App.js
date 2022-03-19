import * as React from "react";
import { LogBox, Platform } from "react-native";
import { Provider } from "react-redux";
import Purchases from "react-native-purchases";
import "expo-asset";
import { IOS_REVCAT_KEY, ANDROID_REVCAT_KEY } from "@env";

import Index from "./app/Index";

import store from "./app/store/store";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function App() {
	React.useEffect(() => {
		Purchases.setDebugLogsEnabled(true);

		if (Platform.OS === "ios") {
			Purchases.setup(IOS_REVCAT_KEY);
		} else if (Platform.OS === "android") {
			Purchases.setup(ANDROID_REVCAT_KEY);
		}
		// restoreSubscription();
	}, []);

	return (
		<Provider store={store}>
			<Index />
		</Provider>
	);
}
