import * as React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";

import Index from "./app/Index";

import store from "./app/store/store";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function App() {
	return (
		<Provider store={store}>
			<Index />
		</Provider>
	);
}
