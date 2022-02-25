import authStorage from "../../api/storage";
import jwtDecode from "jwt-decode";
import { setCurrentUser, unsetCurrentUser } from "../reducers/userReducer";

const updateUserInStore = (dispatch, authToken) => {
	const user = jwtDecode(authToken);
	try {
		authStorage.storeToken(authToken);
		return dispatch(setCurrentUser(user));
	} catch (error) {
		console.error(error);
	}
};

const logOut = (dispatch) => {
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

export default {
	updateUserInStore,
	logOut,
	reactivateUser,
};
