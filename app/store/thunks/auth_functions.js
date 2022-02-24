import authStorage from "../../api/storage";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "../reducers/userReducer";

const updateUserInStore = (dispatch, authToken) => {
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

export default {
	updateUserInStore,
	logOut,
	reactivateUser,
};
