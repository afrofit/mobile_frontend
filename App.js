import * as React from "react";
import { LogBox, Platform } from "react-native";
import { Provider } from "react-redux";
import Purchases from "react-native-purchases";
import "expo-asset";

import Index from "./app/Index";

import store from "./app/store/store";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function App() {
	const IOS_REVCAT_KEY = "appl_ZiNvlbcpXlvmTYbwVOWIakgtNhL";
	const ANDROID_REVCAT_KEY = "goog_ZiROEgsxGMkwrtswdyCJsGEsCFv";

	React.useEffect(() => {
		Purchases.setDebugLogsEnabled(true);
		Purchases.setup();
		if (Platform.OS === "ios") {
			Purchases.setup(IOS_REVCAT_KEY);
		} else if (Platform.OS === "android") {
			Purchases.setup(ANDROID_REVCAT_KEY);
		}
	}, []);

	return (
		<Provider store={store}>
			<Index />
		</Provider>
	);
}
