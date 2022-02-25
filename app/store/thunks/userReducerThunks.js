import {
	accountCreate,
	logInUser,
	resendApiSignupVerificationCode,
	resendResetPasswordVerifyCode,
	sendPasswordResetCode,
	setNewPassword,
	verifyPasswordResetCode,
	verifySignupCode,
} from "../../api/auth/auth_thunks";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	showGenericErrorDialog,
} from "../reducers/uiReducer";
import {
	setChangePasswordSuccess,
	setConfirmPasswordResetCodeSuccess,
	setCurrentUserResetToken,
	setCurrentUserToken,
	setResendPasswordResetCodeSuccess,
	setResetEmailSuccess,
	setSignUpSuccess,
	setVerifySuccess,
} from "../reducers/userReducer";
import authFuncs from "./auth_functions";

/** Log User In Thunks */
export function logUserIn(email, password) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		logInUser(email, password)
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					authFuncs.updateUserInStore(dispatch, data);
					return dispatch(setCurrentUserToken(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't log you in. Retry?"));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Email Reset Code */
export function emailResetCode(email) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setResetEmailSuccess(false));

		sendPasswordResetCode(email)
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					dispatch(setResetEmailSuccess(true));
					authFuncs.reactivateUser(data);
					dispatch(setCurrentUserResetToken(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't log you in. Retry?"));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error.message);
			});
	};
}

/** Verify Emailed Reset Code */
export function passwordResetCodeVerify(code) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setConfirmPasswordResetCodeSuccess(false));

		verifyPasswordResetCode(code)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				if (response) {
					dispatch(setConfirmPasswordResetCodeSuccess(true));
					authFuncs.reactivateUser(response);
					dispatch(setCurrentUserResetToken(response));
				} else {
					dispatch(showGenericErrorDialog("Can't create account. Retry?"));
					throw new Error("Cannot create account");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Change User Password */
export function changeUserPassword(password) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setChangePasswordSuccess(false));

		setNewPassword(password)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				if (response && response.data) {
					dispatch(setChangePasswordSuccess(true));
				} else {
					dispatch(
						showGenericErrorDialog("Can't change account password. Retry?")
					);
					throw new Error("Cannot change account password");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Resend Email Verify Reset Code */
export function resendEmailVerifyResetCode(email) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setResendPasswordResetCodeSuccess(false));

		resendResetPasswordVerifyCode(email)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				console.log("Resend Reset Code Response", response);
				const { data, ok } = response;
				if (data && ok) {
					dispatch(setResendPasswordResetCodeSuccess(true));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't create account. Retry?"));
					throw new Error("Cannot create account");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Create Account Thunks */
export function createAccount(email, password, username) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setSignUpSuccess(false));

		accountCreate(email, password, username)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					dispatch(setSignUpSuccess(true));
					dispatch(setCurrentUserToken(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't create account. Retry?"));
					throw new Error("Cannot create account");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Verification Code Thunks */
export function verifyUserCode(payload) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		dispatch(setVerifySuccess(false));

		verifySignupCode(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					dispatch(setVerifySuccess(true));
					return dispatch(setCurrentUserToken(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(
						showGenericErrorDialog("There is a problem with you code. Retry?")
					);
					throw new Error("Cannot create account");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Resend Verification Code */
export function resendUserVerificationCode() {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		resendApiSignupVerificationCode()
			.then((response) => {
				const { success } = response;
				dispatch(finishedRequest());
				if (!success) {
					return dispatch(
						showGenericErrorDialog("There was an error resending code.")
					);
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog("Sorry. An unexpected error occured."));
				console.error(error);
			});
	};
}

/** Change Password Thunks */
export function verifyUserPasswordResetCode(payload) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		verifyPasswordResetCode(payload)
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					return dispatch(setCurrentUserToken(data));
				} else if (!ok && data) {
					dispatch(showGenericErrorDialog(data));
				} else {
					dispatch(showGenericErrorDialog("An unexpected error occured."));
				}
			})
			.catch((error) => console.error(error));
	};
}
