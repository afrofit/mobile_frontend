import jwtDecode from "jwt-decode";
import * as React from "react";
import { LogBox } from "react-native";
import { Provider, useDispatch } from "react-redux";

import authStorage from "./app/api/storage";
import AuthContextProvider from "./app/context/AuthContext";
import useAuth from "./app/hooks/useAuth";
import Index from "./app/Index";
import { requestSubscription } from "./app/store/reducers/subscriptionReducer";
import { store } from "./app/store/store";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function App() {
	// store.dispatch(requestSubscription());

	return (
		<Provider store={store}>
			<Index />
		</Provider>
	);
}
