import * as React from "react";
import jwtDecode from "jwt-decode";
import authStorage from "../api/storage";

import { AuthContext } from "../context/AuthContext";

// import { useDispatch } from "react-redux";
// import {
// 	setCurrentUser,
// 	setCurrentUserAsync,
// 	unsetCurrentUser,
// } from "../store/reducers/userReducer";

const useAuth = () => {
	const { currentUser, unsetUser, setCurrentUser, setCurrentUserAsync } =
		React.useContext(AuthContext);
	// const dispatch = useDispatch();
	const createAccount = (authToken) => {
		const newUser = jwtDecode(authToken);
		try {
			setCurrentUser(newUser);
			authStorage.storeToken(authToken);
			// dispatch(setCurrentUser(newUser));
		} catch (error) {
			console.error(error);
		}
	};

	const verifyUser = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			// dispatch(setCurrentUser(user));
			authStorage.storeToken(authToken);
			setCurrentUser(user);
		} catch (error) {
			console.error(error);
		}
	};

	const logUserIn = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			// dispatch(setCurrentUserAsync(user));
			authStorage.storeToken(authToken);
			setCurrentUser(user);
		} catch (error) {
			console.error(error);
		}
	};

	const saveNewUsername = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			// dispatch(setCurrentUserAsync(user));
			authStorage.storeToken(authToken);
			setCurrentUser(user);
		} catch (error) {
			console.error(error);
		}
	};

	const logOut = () => {
		// dispatch(unsetCurrentUser());
		authStorage.removeToken();
		authStorage.removeResetToken();
		unsetUser();
	};

	const reactivateUser = (authResetToken) => {
		try {
			authStorage.storeResetToken(authResetToken);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		currentUser,
		saveNewUsername,
		createAccount,
		logOut,
		logUserIn,
		reactivateUser,
		verifyUser,
	};
};

export default useAuth;