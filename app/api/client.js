import { create } from "apisauce";
import authStorage from "./storage";
import settings from "../config/settings";

const apiClient = create({
	baseURL: settings.apiUrl,
	timeout: 10000,
	timeoutErrorMessage: "Network Error",
});

apiClient.addAsyncRequestTransform(async (request) => {
	const authToken = await authStorage.getToken();
	if (!authToken) return;
	request.headers["x-auth-token"] = authToken;
});

apiClient.addAsyncRequestTransform(async (request) => {
	const authResetToken = await authStorage.getResetToken();
	if (!authResetToken) return;
	request.headers["x-auth-reset-token"] = authResetToken;
});

export default apiClient;
