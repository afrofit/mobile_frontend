import * as React from "react";
import { StatusBar } from "expo-status-bar";

import LoadApp from "../app/utilities/LoadApp";
import { fonts } from "./theme/fonts";
import AuthNavigator from "./navigator/AuthNavigator";
import AppNavigator from "./navigator/AppNavigator";
import useAuth from "./hooks/useAuth";
import { getCurrentUser, setCurrentUser } from "./store/reducers/userReducer";
import { useDispatch } from "react-redux";
import { store } from "./store/store";
import VerifyEmailNavigator from "./navigator/VerifyCodeNavigator";
import { useSelector } from "react-redux";
import authStorage from "./api/storage";
import { AuthContext } from "./context/AuthContext";

const Index = () => {
	const authContext = React.useContext(AuthContext);
	// const { setCurrentUser, currentUser } = authContext;
	const dispatch = useDispatch();

	const { logOut } = useAuth();

	const currentUser = useSelector(getCurrentUser);

	React.useEffect(() => {
		console.log("User from User Context", currentUser);
		(async function restoreUser() {
			const user = await authStorage.getUser();
			setCurrentUser(user);
			dispatch(setCurrentUser(user));
			// logOut();
		})();
	}, []);

	return (
		<LoadApp {...{ fonts }}>
			<StatusBar style="auto" />
			{currentUser && currentUser.isVerified && <AppNavigator />}
			{currentUser && currentUser.isRegistered && !currentUser.isVerified && (
				<VerifyEmailNavigator />
			)}
			{!currentUser && <AuthNavigator />}
		</LoadApp>
	);
};

export default Index;
