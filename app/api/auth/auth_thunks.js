import { checkAPIErrors } from "../../utilities/apifuncs";
import apiClient from "../client";
import authStorage from "../storage";

/** Log In and Create Account Flow */

export const accountCreate = (email, password, username) =>
	apiClient.post("/users/create-account", { email, password, username });

export const logInUser = (email, password) =>
	apiClient.post("/users/login", { email, password });

/** Password Reset Flow */

export const verifyPasswordResetCode = async (code) => {
	const authResetToken = await authStorage.getResetToken();

	const result = await apiClient.put(
		"/users/verify-password-reset-code",
		{ code },
		{ headers: { "x-auth-reset-token": authResetToken } }
	);

	return checkAPIErrors(result);
};

export const resendResetPasswordVerifyCode = async (email) => {
	return apiClient.post("/users/resend-reset-password-verify-code", { email });
};

export const sendPasswordResetCode = (email) =>
	apiClient.post("/users/send-reset-code", { email });

export const setNewPassword = async (password) =>
	apiClient.post("/users/set-new-password", { password });

/** User Signup Verification */

export const verifySignupCode = (code) =>
	apiClient.put("/users/verify-signup-code", { code });

export const resendApiSignupVerificationCode = async () => {
	const { email } = await authStorage.getUser();

	const result = await apiClient.post("/users/resend-verify-code", { email });
	return checkAPIErrors(result);
};

/** Change Username */

export const changeUsername = async (username) => {
	const result = await apiClient.post("/users/change-username", { username });
	return checkAPIErrors(result);
};
