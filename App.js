import jwtDecode from "jwt-decode";
import React from "react";
import { LogBox } from "react-native";
import { Provider, useDispatch } from "react-redux";

import authStorage from "./app/api/storage";
import AuthContextProvider from "./app/context/AuthContext";
import useAuth from "./app/hooks/useAuth";
import Index from "./app/Index";
import { setCurrentUser } from "./app/store/reducers/userReducer";
import { store } from "./app/store/store";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function App() {
	// React.useEffect(() => {
	// 	(async function restoreUser() {
	// 		const user = await authStorage.getUser();
	// 		console.log("User from App.js", user);
	// 		store.dispatch(setCurrentUser(user));
	// 	})();
	// }, []);

	return (
		<Provider store={store}>
			<AuthContextProvider>
				<Index />
			</AuthContextProvider>
		</Provider>
	);
}
