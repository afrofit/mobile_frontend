import jwtDecode from "jwt-decode";
import authStorage from "../api/storage";

import { useDispatch } from "react-redux";
import {
	setCurrentUser,
	unsetCurrentUser,
} from "../store/reducers/userReducer";

const useAuth = () => {
	const dispatch = useDispatch();
	const createAccount = (authToken) => {
		const newUser = jwtDecode(authToken);
		try {
			dispatch(setCurrentUser(newUser));
			authStorage.storeToken(authToken);
		} catch (error) {
			console.error(error);
		}
	};

	const verifyUser = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			authStorage.storeToken(authToken);
			dispatch(setCurrentUser(user));
		} catch (error) {
			console.error(error);
		}
	};

	const logUserIn = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			dispatch(setCurrentUser(user));
			authStorage.storeToken(authToken);
		} catch (error) {
			console.error(error);
		}
	};

	const saveNewUsername = (authToken) => {
		const user = jwtDecode(authToken);
		try {
			authStorage.storeToken(authToken);
			dispatch(setCurrentUser(user));
		} catch (error) {
			console.error(error);
		}
	};

	const logOut = () => {
		authStorage.removeToken();
		authStorage.removeResetToken();
		dispatch(unsetCurrentUser());
	};

	const reactivateUser = (authResetToken) => {
		try {
			authStorage.storeResetToken(authResetToken);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		saveNewUsername,
		createAccount,
		logOut,
		logUserIn,
		reactivateUser,
		verifyUser,
	};
};

export default useAuth;
