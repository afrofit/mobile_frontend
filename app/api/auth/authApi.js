import apiClient from "../client";
import authStorage from "../storage";

// Original Login/Create Account Flow
const createAccount = (email, password, username) =>
	apiClient.post("/users/create-account", { email, password, username });

const logUserIn = (email, password) =>
	apiClient.post("/users/login", { email, password });

//Reset Password Flow
const sendPasswordResetCode = (email) =>
	apiClient.post("/users/send-reset-code", { email });

const verifyPasswordResetCode = async (code) => {
	const authResetToken = await authStorage.getResetToken();

	return apiClient.put(
		"/users/verify-password-reset-code",
		{ code },
		{ headers: { "x-auth-reset-token": authResetToken } }
	);
};

const resendResetPasswordVerifyCode = async (email) => {
	// const { email } = await authStorage.getUser();

	return apiClient.post("/users/resend-reset-password-verify-code", { email });
};

const setNewPassword = async (password) =>
	apiClient.post("/users/set-new-password", { password });

//Verify that User Email Exists
const verifySignupCode = (code) =>
	apiClient.put("/users/verify-signup-code", { code });

const resendSignupVerificationCode = async () => {
	const { email } = await authStorage.getUser();

	return apiClient.post("/users/resend-verify-code", { email });
};

const changeUsername = async (username) =>
	apiClient.post("/users/change-username", { username });

export default {
	changeUsername,
	createAccount,
	logUserIn,
	sendPasswordResetCode,
	verifySignupCode,
	resendSignupVerificationCode,
	verifyPasswordResetCode,
	resendResetPasswordVerifyCode,
	setNewPassword,
};
