import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	currentUserToken: null,
	currentUserResetToken: null,
	signupSuccess: false,
	verifySuccess: false,
	loginSuccess: false,
	changePasswordSuccess: false,
	changeUsernameSuccess: false,
	resetEmailSuccess: false,
	confirmPasswordResetCodeSuccess: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser(state, { payload }) {
			state.currentUser = payload;
		},
		setSignUpSuccess(state, { payload }) {
			state.signupSuccess = payload;
		},
		setVerifySuccess(state, { payload }) {
			state.verifySuccess = payload;
		},
		setloginSuccess(state, { payload }) {
			state.loginSuccess = payload;
		},
		setResetEmailSuccess(state, { payload }) {
			state.resetEmailSuccess = payload;
		},
		setConfirmPasswordResetCodeSuccess(state, { payload }) {
			state.confirmPasswordResetCodeSuccess = payload;
		},
		setChangePasswordSuccess(state, { payload }) {
			state.changePasswordSuccess = payload;
		},
		setChangeUsernameSuccess(state, { payload }) {
			state.changeUsernameSuccess = payload;
		},
		setCurrentUserToken(state, { payload }) {
			state.currentUserToken = payload;
		},
		setCurrentUserResetToken(state, { payload }) {
			state.currentUserResetToken = payload;
		},

		unsetCurrentUser(state, { payload }) {
			state.currentUser = payload;
		},
	},
});

export const {
	setCurrentUser,
	setCurrentUserToken,
	setCurrentUserResetToken,
	unsetCurrentUser,
	setSignUpSuccess,
	setloginSuccess,
	setChangePasswordSuccess,
	setChangeUsernameSuccess,
	setVerifySuccess,
	setResetEmailSuccess,
	setConfirmPasswordResetCodeSuccess,
} = userSlice.actions;

/** Selectors */
export const getCurrentUser = (state) => state.user.currentUser;
export const getCurrentUserToken = (state) => state.user.currentUserToken;
export const getCurrentUserResetToken = (state) =>
	state.user.currentUserResetToken;
export const getSignupSuccess = (state) => state.user.signupSuccess;
export const getVerifySuccess = (state) => state.user.verifySuccess;
export const getLoginSuccess = (state) => state.user.loginSuccess;
export const getChangePasswordSuccess = (state) =>
	state.user.changePasswordSuccess;
export const getConfirmPasswordResetCodeSuccess = (state) =>
	state.user.confirmPasswordResetCodeSuccess;
export const getChangeUsernameSuccess = (state) =>
	state.user.changeUsernameSuccess;
export const getEmailResetSuccess = (state) => state.user.resetEmailSuccess;

/** Reducers */
export default userSlice.reducer;
