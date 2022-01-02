import jwtDecode from "jwt-decode";
import authStorage from "../../api/storage";

// CONSTANTS
const LOGGED_USER_IN = "user/LogUserIn";
const SET_CURRENT_USER = "user/setCurrentUser";
const SET_CURRENT_USER_ASYNC = "user/setCurrentUserAsync";
const UNSET_CURRENT_USER = "user/setCurrentUser";
const RESTORE_USER = "user/restoreUser";

const initialState = {
	currentUser: null,
};

export function userReducer(state = initialState, action) {
	if (action.type === UNSET_CURRENT_USER) {
		return { ...state, currentUser: action.payload };
	} else if (action.type === SET_CURRENT_USER) {
		return { ...state, currentUser: action.payload };
	} else if (action.type === SET_CURRENT_USER_ASYNC) {
		return setTimeout(() => {
			return { ...state, currentUser: action.payload };
		}, 2000);
	}
	return state;
}

// ACTION CREATORS
export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	payload: user,
});

export const setCurrentUserAsync = (user) => ({
	type: SET_CURRENT_USER_ASYNC,
	payload: user,
});

export const unsetCurrentUser = () => ({
	type: UNSET_CURRENT_USER,
	payload: null,
});

// SELECTORS
export const getCurrentUser = (state) => state.user.currentUser;
